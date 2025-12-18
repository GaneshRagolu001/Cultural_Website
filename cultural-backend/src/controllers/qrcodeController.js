import QRCode from "qrcode";
import cloudinary from "../config/cloudinary.js";
import Heritage from "../models/Heritage.js";

export const generateQrForHeritage = async (req, res) => {
  try {
    const heritageId = req.params.id;
    const heritage = await Heritage.findById(heritageId);
    if (!heritage)
      return res.status(404).json({ message: "Heritage item is not found" });

    const qrData = `${process.env.CLIENT_URL}/heritage/${heritageId}`;
    const qrImage = await QRCode.toDataURL(qrData);

    const cloudinaryRes = await cloudinary.uploader.upload(qrImage, {
      folder: "cultural_qr_codes",
      public_id: `qr_${heritageId}`,
      overwrite: true,
    });

    heritage.qrCodeUrl = cloudinaryRes.secure_url;
    await heritage.save();

    res.json({
      message: "Qr code generated successfully",
      qrUrl: cloudinaryRes.secure_url,
    });
  } catch (err) {
    res.status(500).json({ message: "Error generating OR url" });
  }
};
