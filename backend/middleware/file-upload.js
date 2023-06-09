const multer = require("multer")
const uuid = require("uuid")

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
}

const fileUpload = multer({
    limits: 10000000,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/images')
        },
        filename: (req, file, cb) => {
            const ext = MIME_TYPE_MAP[file.mimetype]
            cb(null, uuid.v4() + '.' + ext)
        }
    }),
    fileFilter: (req, file, cb) => {
        const isVaild = !!MIME_TYPE_MAP[file.mimetype]
        let error = isVaild ? null : new Error("Invalid mime type!")
        cb(error, isVaild)
    }
})

module.exports = fileUpload