// const multer = require("multer")
// const path=require("path")

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/uploads/');
//     },
//     filename: (req, file, cb) => {
//         const ext = path.extname(file.originalname);
//         cb(null, `${Date.now()}${ext}`);
//     },
    
   
// });

// const uploads = multer({storage}).single('file')

// module.exports = uploads



const multer = require("multer")

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb(null, 'public/uploads/');

        cb(null, '../my-portfolio/public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null,Date.now()+file.originalname)
    },
    
   
});

let upload=multer({
    storage:Storage,
    limits:{fileSize:1024*1024*4}
})

module.exports = upload