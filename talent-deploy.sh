#!/bin/bash

dx_alias_source=$1
dx_alias_destination=$2

if [[ $dx_alias_source == '' || $dx_alias_destination == '' ]]
then
	echo "//------------------------------------------//"
    echo "Usage: bash ./talent-deploy.sh alias_srouce alias_destination"
    echo "//------------------------------------------//"
    exit 0
fi
echo $dx_alias_source " -- " $dx_alias_destination

# Get authorized session
sfdx force:auth:web:login -a Origin
sfdx force:auth:web:login -d -a DevHub
sfdx force:org:list --verbose

# Retrieve source code from Original Org
sfdx force:mdapi:retrieve -s -r ./mdapioutput -u Origin -p talent_src_site
unzip ./mdapioutput/unpackaged.zip -d ./mdapioutput/unpackaged
sfdx force:mdapi:convert --rootdir mdapioutput

# Deploy source to Destination Org
sfdx force:source:convert -r talent-app -d deploy
sfdx force:mdapi:deploy -d deploy -u DevHub
sfdx force:mdapi:deploy:report

# For assgining the enable status of permission sets
sfdx force:user:permset:assign -u DevHub -n TM
# Be carefull to avoid import multiple duplicate data
# Import sample data
#sfdx force:apex:execute -f data/reset-data-script.txt
#sfdx force:data:tree:import -u DevHub -p data/sample-data-plan.json
sfdx force:apex:test:run -r tap -c
exit