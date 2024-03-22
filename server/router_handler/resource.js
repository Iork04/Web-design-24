const path = require("path");

exports.getImg = async (req, res) => {
  try {
    const number = req.query.number || 1;
    const imgname = req.query.imgname || 1;
    const imagePath = path.join(
      __dirname,
      "..",
      "src",
      `${number}`,
      `${imgname}.jpg`
    );
    // res.end(imagePath);
    res.sendFile(imagePath);
  } catch (error) {
    res.end(error.message);
  }
};
