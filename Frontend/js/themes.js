function change_theme() {
  console.log('Change theme!');

  var sheet = document.styleSheets[1];
  sheet.disabled = !sheet.disabled;

}
