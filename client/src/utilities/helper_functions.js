function youtubeParser(vdoSrc) {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = vdoSrc.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}

function refreshScreen() {
  window.location.reload();
}

export { youtubeParser, refreshScreen };
