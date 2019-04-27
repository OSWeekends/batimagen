#!/bin/bash

#update list first
apt-get update

#install boost dependencies
apt-get install --yes --force-yes build-essential
apt-get install --yes --force-yes libgtk2.0-dev
apt-get install --yes --force-yes wget

# Create folders
mkdir ../temp
mkdir ../secrets