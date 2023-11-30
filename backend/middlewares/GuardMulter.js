const multer = require("multer");

const ALLOWED_IMAGE_TYPES = ["image/jpg", "image/jpeg", "image/png"];

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "Assets/Images/");
    },
    filename: (req, file, callback) => {
        const originalname = file.originalname.replace(/\s+/g, "_");
        const extension = file.mimetype.split("/")[1];
        const filename = `${originalname.replace(/\.[^/.]+$/, "")}_${Date.now()}.${extension}`;
        callback(null, filename);
    },
});

const fileFilter = (req, file, callback) => {
    if (ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(new Error("Seuls les fichiers image sont autorisés."), false);
    }
};

const limits = {
    fileSize: 5 * 1024 * 1024,
};

const upload = multer({ storage, fileFilter, limits }).single("image");

module.exports = upload;
