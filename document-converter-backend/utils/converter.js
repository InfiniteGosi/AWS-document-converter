const libre = require("libreoffice-convert");
const path = require("path");

const convertDocxToPdf = async (inputBuffer) => {
  return new Promise((resolve, reject) => {
    const ext = ".pdf";
    libre.convert(inputBuffer, ext, undefined, (err, done) => {
      if (err) {
        console.error("❌ LibreOffice conversion error:", err); // log full error
        return reject(`Conversion failed: ${err.message || err}`);
      }
      resolve(done);
    });
  });
};

module.exports = { convertDocxToPdf };
