#!/bin/bash

script_version="0.2.1"

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
test_only=0

lib_name="renoir"
main_file="index.js"

# The main source directories
src_in="./src/"
src_out="./dist/"
bin_dir="./node_modules/.bin/"

# Build apps
linter="${bin_dir}eslint"
prebuild_tests="node ./tests/prebuild_tests.js | tap-dot"
packer="${bin_dir}browserify ${src_in}${main_file} \
    --transform [ babelify ] \
    --outfile ${src_out}index.js \
    --standalone ${lib_name}"
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
        to_be_updated=1
        shift
        ;;
        -h|--help)
        show_help=1
        shift
        ;;
        -t|--test)
        test_only=1
        shift
        ;;
        -v|--version)
        show_version=1
        shift
        ;;
        *)
        echo -e "\e[0;31mbuild.sh: unknown option - ${key}\e[0m"
        echo
        exit 1
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
    echo "  -c, --check-syntax-only   check file syntax only (skip bundling steps)"
    exit 0
fi

for next_file in $( find ./src -type f | grep .js )
do
    
    if test "${to_be_updated}" -eq 0 && \
        test "${next_file}" -nt "${src_out}${main_file}"
    then
        echo -e "\e[0;36mChecking syntax of ${next_file}...\e[0m"
        "${linter}" "${next_file}"
        echo -e "\e[0;32mPassed!\e[0m"
        echo
        to_be_updated=1
    fi
done

# If we're only checking the syntax then go no further
if test "${check_only}" -eq 1
then
    exit 0
fi

# If no updates are detected then exit
if test "${to_be_updated}" -eq 0 && test "${test_only}" -eq 0
then
    echo -e "\e[0;32mEverything up-to-date.  Exiting.\e[0m"
    exit 0
fi

echo -e "\e[0;36mRunning pre-build tests...\e[0m"
eval "${prebuild_tests}"
echo

# If we're only running tests then go no further
if test "${test_only}" -eq 1
then
    echo -e "\e[0;32mTests completed.  Exiting.\e[0m"
    exit 0
fi

# If all OK so far, update the build number
echo -e "\e[0;36mIncrementing build number...\e[0m"
build_num="$(<build_number)"
build_num=$((build_num + 1))
echo -n "${build_num}" > build_number
echo

echo -e "\e[0;36mBundling ${main_file}...\e[0m"
eval "${packer}"
echo

echo -e "\e[0;36mRunning post-build tests...\e[0m"
eval "${postbuild_tests}"
echo

# Prompt for a commit message
echo -e "\e[0;36mCompilation successful, please enter a commit message.\e[0m"
echo -e "\e[0;36mAn empty string skips this step.\e[0m"
echo -e "\e[0;36mHave you updated the change log?\e[0m"
read -p "> " commit_msg

# If the commit message is not blank, update the patch number and commit
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

echo -e "\e[0;32mBuild script complete.\e[0m"
