#fetch boost 1.55.0 and compile
wget http://sourceforge.net/projects/boost/files/boost/1.55.0/boost_1_55_0.tar.bz2/download -O boost_1_55_0.tar.bz2
tar --bzip2 -xf boost_1_55_0.tar.bz2
cd boost_1_55_0
./bootstrap.sh --with-libraries=system,filesystem,program_options
./b2 install


# Back to /scripts
cd ..