colorPrint () {
   echo "$(tput setaf 1) $(tput setab 7) BATIMAGEN Installer $(tput sgr 0) $(tput setaf 3) $(tput bold) $1 $(tput setaf 7)"
} 

logo="
   ÛÛÛÛÛÛÛÛÛÛÛ    ÛÛÛÛÛÛÛÛÛ   ÛÛÛÛÛÛÛÛÛÛÛ ÛÛÛÛÛ ÛÛÛÛÛÛ   ÛÛÛÛÛÛ   ÛÛÛÛÛÛÛÛÛ     ÛÛÛÛÛÛÛÛÛ  ÛÛÛÛÛÛÛÛÛÛ ÛÛÛÛÛÛ   ÛÛÛÛÛ
  °°ÛÛÛ°°°°°ÛÛÛ  ÛÛÛ°°°°°ÛÛÛ °Û°°°ÛÛÛ°°°Û°°ÛÛÛ °°ÛÛÛÛÛÛ ÛÛÛÛÛÛ   ÛÛÛ°°°°°ÛÛÛ   ÛÛÛ°°°°°ÛÛÛ°°ÛÛÛ°°°°°Û°°ÛÛÛÛÛÛ °°ÛÛÛ 
   °ÛÛÛ    °ÛÛÛ °ÛÛÛ    °ÛÛÛ °   °ÛÛÛ  °  °ÛÛÛ  °ÛÛÛ°ÛÛÛÛÛ°ÛÛÛ  °ÛÛÛ    °ÛÛÛ  ÛÛÛ     °°°  °ÛÛÛ  Û °  °ÛÛÛ°ÛÛÛ °ÛÛÛ 
   °ÛÛÛÛÛÛÛÛÛÛ  °ÛÛÛÛÛÛÛÛÛÛÛ     °ÛÛÛ     °ÛÛÛ  °ÛÛÛ°°ÛÛÛ °ÛÛÛ  °ÛÛÛÛÛÛÛÛÛÛÛ °ÛÛÛ          °ÛÛÛÛÛÛ    °ÛÛÛ°°ÛÛÛ°ÛÛÛ 
   °ÛÛÛ°°°°°ÛÛÛ °ÛÛÛ°°°°°ÛÛÛ     °ÛÛÛ     °ÛÛÛ  °ÛÛÛ °°°  °ÛÛÛ  °ÛÛÛ°°°°°ÛÛÛ °ÛÛÛ    ÛÛÛÛÛ °ÛÛÛ°°Û    °ÛÛÛ °°ÛÛÛÛÛÛ 
   °ÛÛÛ    °ÛÛÛ °ÛÛÛ    °ÛÛÛ     °ÛÛÛ     °ÛÛÛ  °ÛÛÛ      °ÛÛÛ  °ÛÛÛ    °ÛÛÛ °°ÛÛÛ  °°ÛÛÛ  °ÛÛÛ °   Û °ÛÛÛ  °°ÛÛÛÛÛ 
   ÛÛÛÛÛÛÛÛÛÛÛ  ÛÛÛÛÛ   ÛÛÛÛÛ    ÛÛÛÛÛ    ÛÛÛÛÛ ÛÛÛÛÛ     ÛÛÛÛÛ ÛÛÛÛÛ   ÛÛÛÛÛ °°ÛÛÛÛÛÛÛÛÛ  ÛÛÛÛÛÛÛÛÛÛ ÛÛÛÛÛ  °°ÛÛÛÛÛ
  °°°°°°°°°°°  °°°°°   °°°°°    °°°°°    °°°°° °°°°°     °°°°° °°°°°   °°°°°   °°°°°°°°°  °°°°°°°°°° °°°°°    °°°°°"
node_version=`node --version`
npm_version=`npm --version`

colorPrint "$logo"
colorPrint "This process is valid only for Ubuntu or C9.io environment"
if [[ -z "$node_version" ]]
    then echo "Node Version Error!"
    exit
fi

echo "1. Let's update the machine and add some dependencies..."

./checks.sh


colorPrint  "2. Let's intall Boots..."

./install-boots.sh

colorPrint  "3. Let's intall OpenCV & more stuff..."

./install-opencv.sh

colorPrint  "4. This will install Phoenix tool"

./install-phoenix.sh

colorPrint "All installed sucessfully!"
colorPrint "Please add your tokens and credentials as explained in the Readme.md before start the server..."
# ./phoenix/build/phoenix

