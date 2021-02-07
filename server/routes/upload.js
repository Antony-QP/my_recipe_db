const express = require("express");
const router = express.Router();
const { cloudinary } = require("../backendUtils/cloudinary");

router.post("/", async (req, res) => {
  try {
    const fileString = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(
      fileString);
      return res.json(uploadedResponse)
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Something went wrong" });
  }
});

module.exports = router;
