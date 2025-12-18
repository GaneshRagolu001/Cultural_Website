export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploded" });
    }
    res.status(200).json({
      message: "Upload successful",
      url: req.file.path,
    });
  } catch (err) {
    res.status(500).json({ message: "Upload error ", error: err });
  }
};
