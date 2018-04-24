#good to compile from this point

git clone https://github.com/ebemunk/phoenix.git
cd phoenix
#comment out the WIN variable in makefile
sed -i '38 s/^/#/' Makefile
make -j2
#make -j8

# Return to /scripts
cd ..