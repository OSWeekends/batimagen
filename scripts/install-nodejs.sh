#!/bin/bash

#install node 11
curl -sL https://deb.nodesource.com/setup_11.x | bash -
apt-get install -y nodejs

node_version=`node --version`
npm_version=`npm --version`

if [[ -z "$node_version" ]]
    then echo "Node Version Error!"
    exit
fi