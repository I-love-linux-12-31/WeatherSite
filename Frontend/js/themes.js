function change_theme() {
  console.log('Change theme!');
/*  for ( i=0; i<document.styleSheets.length; i++) {
    void(document.styleSheets.item(i).disabled=true);
}*/
/*var linkNode = document.getElementsByTagName('link')[2];
linkNode.parentNode.removeChild(linkNode);*/

  // var sheet = document.styleSheets[0];
  // sheet.disabled = !sheet.disabled;

  var sheet = document.styleSheets[1];
  sheet.disabled = !sheet.disabled;


}
