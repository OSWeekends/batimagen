/**
  * @example
      const extension = ['.jpg', '.png','.tiff', '.gif', '.bmp'];

      let archive = "cucu.txt",
          newArchive = '',
          button = document.getElementsByTagName('button');

      for (var i = 0; i < button.length; i++) {
        let dataImage = button[i].getAttribute('data-image');
        button[i].addEventListener('click', function(){
          let archiveName = archive.split('.');
          newArchive = archiveName[0] + dataImage + '.' + archiveName[1];

          return newArchive
        });
      }
*/
const extension = ['.jpg', '.png','.tiff', '.gif', '.bmp'];
let archive = "cucu.txt",
    newArchive = '',
    button = document.getElementsByClassName('foresic-element_button');

for (var i = 0; i < button.length; i++) {
  let dataImage = button[i].getAttribute('data-image');
  button[i].addEventListener('click', function(){
    let archiveName = archive.split('.');
    newArchive = archiveName[0] + dataImage + '.' + archiveName[1];
    console.log(newArchive);
    return newArchive
  });
}
