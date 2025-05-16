const express = require("express");
const multer = require("multer");
const AWS = require("aws-sdk");
const path = require("path");
const { convertDocxToPdf } = require("./utils/converter");

const s3 = new AWS.S3();
const app = express();
const upload = multer();

app.post("/convert", upload.single("file"), async (req, res) => {
  const inputBuffer = req.file.buffer;
  const originalName = path.parse(req.file.originalname).name;
  
  try {
    const pdfBuffer = await convertDocxToPdf(inputBuffer);

    const fileKey = `${originalName}-${Date.now()}.pdf`;

    // Upload the file to S3 (private, no ACL public-read)
    await s3.upload({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileKey,
      Body: pdfBuffer,
      ContentType: "application/pdf",
    }).promise();

    // Generate a signed URL (valid for 1 hour)
    const signedUrl = s3.getSignedUrl('getObject', {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileKey,
      Expires: 900, // 1 hour
    });

    res.json({
      message: "✅ Converted and uploaded",
      url: signedUrl,
    });

  } catch (err) {
    console.error("❌ Conversion error:", err.message || err);
    res.status(500).json({ error: `❌ Conversion failed: ${err.message || err}` });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`📡 Server running on port ${PORT}`);
});
