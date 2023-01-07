function youtubeParser(vdoSrc) {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = vdoSrc.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}

function getVideoThumbnail(vdoSrc) {
  const vdoCode = youtubeParser(vdoSrc);
  const vdoThumbnail = `https://img.youtube.com/vi/${vdoCode}/hqdefault.jpg`;

  return vdoThumbnail;
}

function refreshScreen() {
  window.location.reload();
}

function roundOffDecimalPlaces(num, places) {
  let power = Math.pow(10, places);

  return Math.round(num * power) / power;
}

export {
  youtubeParser,
  refreshScreen,
  getVideoThumbnail,
  roundOffDecimalPlaces,
};
