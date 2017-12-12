#!/bin/bash

dx_alias_name=$@

if [[ $dx_alias_name == '' ]]
then
	echo "//------------------------------------------//"
    echo "Usage: bash ./talent-setup.sh myalias"
    echo "//------------------------------------------//"
    exit 0
fi
echo $dx_alias_name

# Create sandbox
sfdx force:org:create -f config/project-scratch-def.json -s -a $dx_alias_name
# Push source to sandbox
sfdx force:source:push
# For assgining the enable status of permission sets
sfdx force:user:permset:assign -n TM
# Import sample data
sfdx force:apex:execute -f data/reset-data-script.txt
sfdx force:data:tree:import -p data/sample-data-plan.json
sfdx force:apex:test:run -r tap -c
sfdx force:org:list --verbose

exit