const encodeCertificateId = (userMongId, courseId, unitId) => {
  return userMongId + "-" + courseId + "-" + unitId;
};

const decodeCertificateId = (certId) => {
  const [userMongId, courseId, unitId] = certId.split("-");
  return { userMongId: userMongId, courseId: courseId, unitId: unitId };
};

module.exports = { encodeCertificateId, decodeCertificateId };
