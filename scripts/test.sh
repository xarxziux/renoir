#!/bin/bash

script_version="0.3.0"

# Skip blank parameters
if test -z "$1"
then
    shift
fi

# Stop on error
set -e
#set -o pipefail

# Set basic options
check_only=0
show_help=0
show_version=0
force_compile=0

# The main source directories
src_in="./src/"
src_out="./tmp/"
bin_dir="./node_modules/.bin/"

# Build apps
linter="${bin_dir}eslint"
transpiler="${bin_dir}babel"
run_tests="node ./tests/test.js | tap-dot"

# Parse the command-line parameters
while [[ $# -gt 0 ]]
do
    key="$1"
    case "${key}" in
        -c|--check-syntax-only)
        check_only=1
        shift
        ;;
        -f|--force)
        force_compile=1
        shift
        ;;
        -h|--help)
        show_help=1
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
    echo "Usage: test.sh [OPTIONS]"
    echo "Test project by running the files through Babel."
    echo
    echo Options:
    echo "  -h, --help                display this help and exit"
    echo "  -v, --version             display version information and exit"
    echo "  -c, --check-syntax-only   check file syntax only (skip bundling steps)"
    exit 0
fi

for next_file in $( find ${src_in} -type f | grep .js )
do
    base_name=${next_file##*/}

    if test "${force_compile}" -eq 1 || \
        test "${next_file}" -nt "${src_out}${base_name}"
    then
        echo -e "\e[0;36mChecking syntax of ${next_file}...\e[0m"
        "${linter}" "${next_file}"
        echo -e "\e[0;32mPassed!  Compiling ${next_file}...\e[0m"
        "${transpiler}" "${next_file}" --out-file "${src_out}${base_name}"
        echo
      fi
done

# If we're only checking the syntax then go no further
if test "${check_only}" -eq 1
then
    exit 0
fi

echo -e "\e[0;36mRunning tests...\e[0m"
eval "${run_tests}"
echo
