import multer from "multer";
import path from "path";

// set storage engine
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

// init upload
const upload = multer({
    storage,
    limits: { fileSize: 10485760 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
});

function checkFileType(file, cb) {
    // allowed extensions
    const filetypes = /jpeg|jpg|png/;

    // check originalName
    const fileType = filetypes.test(path.extname(file.originalname).toLowerCase());

    // check mimetype
    const mimetype = filetypes.test(file.mimetype);

    if (fileType && mimetype) {
        return cb(null, true);
    }

    return cb('Error: Images Only!!', false);
}

export default upload;