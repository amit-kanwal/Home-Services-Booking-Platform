import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../backend/uploads/");
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // .png / .jpg / .jpeg
    const uniqueName = Date.now() + ext;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

export default upload;