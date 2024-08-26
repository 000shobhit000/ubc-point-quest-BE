const formidable = require("formidable");
const AWS = require("aws-sdk");
const fs = require("fs");

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
});

const formidableMiddleware = (req, res, next) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const file = files.image[0];

    const s3Params = {
      Bucket: process.env.S3_BUCKET_NAME, // Your S3 bucket name
      Key: `${Date.now()}_${file.originalFilename}`, // File name in S3
      Body: fs.createReadStream(file.filepath),
      ContentType: file.mimetype, // Set appropriate content type
    };

    s3.upload(s3Params, (s3Err, data) => {
      if (s3Err) {
        console.error(s3Err);
        return res.status(500).json({ error: "Error uploading file to S3" });
      }

      // reducing fields keys
      for (let key in fields) {
        fields[key] = fields[key][0];
      }

      // Add the file URL to the request object
      req.fileUrl = data.Location;
      req.body = { ...fields, image: data.Location };
      console.log("fileUrl", data.Location);

      // Proceed to the next middleware or route handler
      next();
    });
  });
};

module.exports = {
  formidableMiddleware,
};
