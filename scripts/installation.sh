#!/bin/bash

logo="
   ÛÛÛÛÛÛÛÛÛÛÛ    ÛÛÛÛÛÛÛÛÛ   ÛÛÛÛÛÛÛÛÛÛÛ ÛÛÛÛÛ ÛÛÛÛÛÛ   ÛÛÛÛÛÛ   ÛÛÛÛÛÛÛÛÛ     ÛÛÛÛÛÛÛÛÛ  ÛÛÛÛÛÛÛÛÛÛ ÛÛÛÛÛÛ   ÛÛÛÛÛ
  °°ÛÛÛ°°°°°ÛÛÛ  ÛÛÛ°°°°°ÛÛÛ °Û°°°ÛÛÛ°°°Û°°ÛÛÛ °°ÛÛÛÛÛÛ ÛÛÛÛÛÛ   ÛÛÛ°°°°°ÛÛÛ   ÛÛÛ°°°°°ÛÛÛ°°ÛÛÛ°°°°°Û°°ÛÛÛÛÛÛ °°ÛÛÛ 
   °ÛÛÛ    °ÛÛÛ °ÛÛÛ    °ÛÛÛ °   °ÛÛÛ  °  °ÛÛÛ  °ÛÛÛ°ÛÛÛÛÛ°ÛÛÛ  °ÛÛÛ    °ÛÛÛ  ÛÛÛ     °°°  °ÛÛÛ  Û °  °ÛÛÛ°ÛÛÛ °ÛÛÛ 
   °ÛÛÛÛÛÛÛÛÛÛ  °ÛÛÛÛÛÛÛÛÛÛÛ     °ÛÛÛ     °ÛÛÛ  °ÛÛÛ°°ÛÛÛ °ÛÛÛ  °ÛÛÛÛÛÛÛÛÛÛÛ °ÛÛÛ          °ÛÛÛÛÛÛ    °ÛÛÛ°°ÛÛÛ°ÛÛÛ 
   °ÛÛÛ°°°°°ÛÛÛ °ÛÛÛ°°°°°ÛÛÛ     °ÛÛÛ     °ÛÛÛ  °ÛÛÛ °°°  °ÛÛÛ  °ÛÛÛ°°°°°ÛÛÛ °ÛÛÛ    ÛÛÛÛÛ °ÛÛÛ°°Û    °ÛÛÛ °°ÛÛÛÛÛÛ 
   °ÛÛÛ    °ÛÛÛ °ÛÛÛ    °ÛÛÛ     °ÛÛÛ     °ÛÛÛ  °ÛÛÛ      °ÛÛÛ  °ÛÛÛ    °ÛÛÛ °°ÛÛÛ  °°ÛÛÛ  °ÛÛÛ °   Û °ÛÛÛ  °°ÛÛÛÛÛ 
   ÛÛÛÛÛÛÛÛÛÛÛ  ÛÛÛÛÛ   ÛÛÛÛÛ    ÛÛÛÛÛ    ÛÛÛÛÛ ÛÛÛÛÛ     ÛÛÛÛÛ ÛÛÛÛÛ   ÛÛÛÛÛ °°ÛÛÛÛÛÛÛÛÛ  ÛÛÛÛÛÛÛÛÛÛ ÛÛÛÛÛ  °°ÛÛÛÛÛ
  °°°°°°°°°°°  °°°°°   °°°°°    °°°°°    °°°°° °°°°°     °°°°° °°°°°   °°°°°   °°°°°°°°°  °°°°°°°°°° °°°°°    °°°°°"


echo "$logo"
echo "[BATIMAGEN][INFO] This process is valid only for Ubuntu or C9.io environment"

cd scripts

echo "[BATIMAGEN][INFO] 1. Let's update the machine and add some dependencies..."
./checks.sh

echo  "[BATIMAGEN][INFO] 2. Let's intall Nodejs..."
./install-nodejs.sh

echo  "[BATIMAGEN][INFO] 3. Let's intall Boots..."
./install-boots.sh

echo  "[BATIMAGEN][INFO] 4. Let's intall OpenCV & more stuff..."
./install-opencv.sh

echo  "[BATIMAGEN][INFO] 5. This will install Phoenix tool"
./install-phoenix.sh

echo "[BATIMAGEN][INFO] 6. This will install Exiftool in the system"
apt-get install --yes --force-yes libimage-exiftool-perl

echo "[BATIMAGEN][INFO] All installed sucessfully!"