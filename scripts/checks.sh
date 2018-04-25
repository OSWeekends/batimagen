#provision a clean ubuntu installation
[ `whoami` = root ] || exec su -c $0 root
ls /root

#update list first
apt-get update

#install boost dependencies
apt-get install --yes --force-yes build-essential
apt-get install --yes --force-yes libgtk2.0-dev