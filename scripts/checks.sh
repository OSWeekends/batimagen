#provision a clean ubuntu installation
[ `whoami` = root ] || exec su -c $0 root
ls /root

#update list first
apt-get update

#install boost dependencies
apt-get install --yes --force-yes build-essential
apt-get install --yes --force-yes libgtk2.0-dev

#fetch boost 1.55.0 and compile
wget http://sourceforge.net/projects/boost/files/boost/1.55.0/boost_1_55_0.tar.bz2/download -O boost_1_55_0.tar.bz2
tar --bzip2 -xf boost_1_55_0.tar.bz2
cd boost_1_55_0
./bootstrap.sh --with-libraries=system,filesystem,program_options
./b2 install

# Back to /scripts
cd ..