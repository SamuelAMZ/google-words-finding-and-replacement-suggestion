const pdf = require("pdf-creator-node");
const fs = require("fs");

const createPdf = async (results, pdfName) => {
  // Read HTML Template
  let templatePath = "./server/createPdf/template.html";
  let outputPath = `./server/createPdf/${pdfName}.pdf`;
  const html = fs.readFileSync(templatePath, "utf8");

  const options = {
    format: "A4",
    orientation: "portrait",
    border: "10mm",
    height: "297mm",
    width: "210mm",
    header: {
      height: "15mm",
      contents: "",
    },
    footer: {
      height: "15mm",
    },
  };

  const document = {
    html: html,
    data: {
      results: results,
    },
    path: outputPath,
    type: "",
  };

  try {
    const res = await pdf.create(document, options);
    return res;
  } catch (error) {
    console.log(error);
  }
};

module.exports = createPdf;
