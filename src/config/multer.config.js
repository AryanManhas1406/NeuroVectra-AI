// const multer = require("multer");

// const path = require("path");

// const storage =
// multer.diskStorage({

//     destination:
//     (req, file, cb) => {

//         cb(
//             path.join(process.cwd(), "/uploads")
//         );
//     },

//     filename:
//     (req, file, cb) => {

//         const uniqueName =
//         Date.now() +
//         path.extname(file.originalname);

//         cb(
//             null,
//             uniqueName
//         );
//     }
// });

// const fileFilter =
// (req, file, cb) => {

//     if (
//         file.mimetype ===
//         "application/pdf"
//     ) {

//         cb(null, true);

//     } else {

//         cb(
//             new Error(
//                 "Only PDF files allowed"
//             ),
//             false
//         );
//     }
// };

// const upload =
// multer({

//     storage,
//     fileFilter
// });

// module.exports = upload;
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(process.cwd(), "/uploads");
        
        // ✅ Auto-create folder if it doesn't exist
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // ✅ Unique filename to avoid overwrites
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

// ✅ Only allow PDFs
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("Only PDF files are allowed"), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;