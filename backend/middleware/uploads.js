import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../backend/uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + ".png";

    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

export default upload;