#!/bin/bash

linter="./node_modules/.bin/eslint"
total_count=0
fail_count=0

for next_file in $( find ./src -type f | grep .js )
do
    total_count=$((total_count + 1))
    
    echo -e "\e[0;36mChecking syntax of ${next_file}...\e[0m"
    "${linter}" "${next_file}"
    
    if test $? -eq 0
    then
        echo -e "\e[0;32mPassed!\e[0m"
    else
        fail_count=$((fail_count + 1))
    fi
    
    echo
    
done

echo -e "\e[0;36mSyntax check completed.\e[0m"
echo -e "\e[0;36m${total_count} files checked.\e[0m"

if test "${fail_count}" -eq 0
then
    echo -e "\e[0;32mNo failures detected!\e[0m"
elif test "${fail_count}" -eq 1
then
    echo -e "\e[0;31m1 file failed.\e[0m"
else
    echo -e "\e[0;31m${fail_count} files failed.\e[0m"
fi
