#!/bin/bash

script_version="0.1.5"

# Skip blank parameters
if test -z "$1"
then
    shift
fi

# Stop on error
set -e

# Set basic options
check_only=0
show_help=0
show_version=0
to_be_updated=0
run_tests=0

# The main source directories
src_dir="./src/"
tmp_dir="./tmp/"
bin_dir="./dist/"
module_dir="./node_modules/.bin/"
src_dir_length="${#src_dir}"

# Build apps
linter="${module_dir}eslint"
transpiler="${module_dir}babel"
prebuild_tests="node ./tests/prebuild_tests.js | tap-dot"
# packer="${module_dir}browserify ${tmp_dir}index.js \
#        --outfile ${bin_dir}index.js \
#        --standalone renoir"
packer="${module_dir}webpack --config webpack.config.js"
postbuild_tests="node ./tests/postbuild_tests.js | tap-dot"

# Parse the command-line parameters
while [[ $# -gt 0 ]]
do
    key="$1"
    case "${key}" in
        -c|--check-syntax-only)
        check_only=1
        shift
        ;;
        -u|--update)
        echo "to_be_updated set to 1"
        to_be_updated=1
        shift
        ;;
        -h|--help)
        show_help=1
        shift
        ;;
        -t|--test)
        run_tests=1
        shift
        ;;
        -v|--version)
        show_version=1
        shift
        ;;
        *)
        echo Unknown option - "${key}"
        exit 0
    esac
done

if test "${show_version}" -eq 1
then
    echo Build script version "${script_version}"
    echo Copyright "(C)" 2017-8 xarxziux.
    echo Licence MIT
    exit 0
fi

if test "${show_help}" -eq 1
then
    echo Usage: build.sh [OPTIONS]
    echo Build the current JavaScript package using a basic \
            "ESLINT -> BABEL -> BROWERSIFY pipeline."
    echo
    echo Options:
    echo "  -h, --help                display this help and exit"
    echo "  -v, --version             display version information and exit"
    echo "  -u, --update              force the script to complete the build process"
    echo "                                even if no file updates are detected"
    echo "  -c, --check-syntax-only   check file syntax only (skip Babel and Browserify steps)"
    exit 0
fi

# Rebuild the directory tree in src/ under tmp/
find "${src_dir}" -type d > "${tmp_dir}dirs.txt"

while read -r new_dir || [[ -n "${new_dir}" ]]
do
    trim_dir="${new_dir:src_dir_length}"
    if test -n "${trim_dir}"
    then
        mkdir -p "${tmp_dir}${trim_dir}"
    fi
done < "${tmp_dir}dirs.txt"

rm "${tmp_dir}dirs.txt"

# Check if any of the source files have been updated
for script_file in $(find "${src_dir}" -type f | grep ".js$")
do
    base_name="${script_file:src_dir_length}"
    source_file="${src_dir}${base_name}"
    target_file="${tmp_dir}${base_name}"
    
    # If the transpiled version of the module is older than
    # the source version, re-transpile it.
    if test "${source_file}" -nt "${target_file}"
    then
        to_be_updated=1
        echo Checking syntax of "${base_name}"...
        "${linter}" "${source_file}"
        
        if test "${check_only}" -eq 0
        then
            echo Transpiling "${base_name}"...
            "${transpiler}" "${source_file}" \
                    --out-file "${target_file}"
            echo
        fi
    fi
done

# If we're only checking the syntax then go no further
if test "${check_only}" -eq 1
then
    echo Syntax check complete.
    exit 0
fi

# If no updates are detected then exit
if test "${to_be_updated}" -eq 0 && test "${run_tests}" -eq 0
then
    echo Everything up-to-date.  Exiting.
    exit 0
fi

echo Running pre-build tests...
eval "${prebuild_tests}"
echo

# If we're only running tests then go no further
if test "${run_tests}" -eq 1
then
    echo Tests completed.  Exiting.
    exit 0
fi

# If all OK so far, update the build number
echo Incrementing build number...
build_num="$(<build_number)"
build_num=$((build_num + 1))
echo -n "${build_num}" > build_number
echo

echo Bundling "${main_file}"...
eval "${packer}"
echo

echo Running post-build tests...
eval "${postbuild_tests}"
echo

# Prompt for a commit message
echo Compilation successful, please enter a commit message.
echo An empty string skips this step.
echo Have you updated the change log?
read -p "> " commit_msg

# If the commit message is not blank,
# update the patch number and commit
if test -n "${commit_msg}"
then
    version_num="$(grep \"version\": package.json \
            | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+')"
    commit_str="${version_num}.${build_num}: ${commit_msg}"
    npm --no-git-tag-version version patch
    git add -A
    git commit -m "${commit_str}"
else
    # Otherwise just stage any unstaged files
    git add -A
fi

echo Build script complete.
