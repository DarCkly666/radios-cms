import path from 'node:path'
import multer from 'multer'

const destination = 'public/uploads/images/'
// const allowedExtensions = ['.svg', '.png', '.jpg', '.jpeg', '.webp']

const storage = multer.diskStorage({
  destination,
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const extension = path.extname(file.originalname)
    const filename = `${file.fieldname}-${uniqueSuffix}${extension}`
    req.filename = destination.substring(6) + filename
    cb(null, filename)
  }
})

/* const fileFilter = (req, file, cb) => {
  const extension = path.extname(file.originalname).toLowerCase()
  if (allowedExtensions.includes(extension)) {
    cb(null, true)
  } else {
    req.fileValidation = `Only image files are allowed ${allowedExtensions.join(',')}`
    return cb(MulterError(req.fileValidation), false)
  }
} */

export const upload = (filename) => multer({ storage }).single(filename)
