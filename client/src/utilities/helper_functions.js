import { jsPDF } from "jspdf";

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

function downloadCertificate() {
  const opt = {
    //   orientation: "landscape",
    unit: "px",
    format: [4, 2],
  };

  const certElement = document.querySelector("#cert");
  const certElementWidth = certElement.offsetWidth;
  const certElementHeight = certElement.offsetHeight;

  // const doc = new jsPDF("l", "px", [404.1, 504]); // h,w (for h<w use landscape)

  const doc = new jsPDF("l", "px", [certElementHeight + 2, certElementWidth]); // h,w (for h<w use landscape)

  doc.html(document.querySelector("#cert"), {
    callback: function (pdf) {
      pdf.save("my.pdf");
    },
  });
}

export {
  youtubeParser,
  refreshScreen,
  getVideoThumbnail,
  roundOffDecimalPlaces,
  downloadCertificate,
};
