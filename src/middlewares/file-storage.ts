import multer from "multer";
import path from "path";
import ValidationError from "../errors/validation-error";
import FieldError from "../errors/field-error";

const storage = multer.diskStorage({
    destination: function(req, fie, cb) {
        cb(null, 'public/imgs')
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 1000);
        const filename = `${uniqueSuffix}${path.extname(file.originalname)}`;
        cb(null, filename);
    }
});

const imageUpload = multer({
    storage,
    fileFilter(req, file, callback) {
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return callback(new ValidationError([
                new FieldError('photos', 'Favor enviar somente arquivos de imagens')
            ]));
        }
        callback(null, true);
    },
});

export default imageUpload;