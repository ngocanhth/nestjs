import { HttpException, HttpStatus } from "@nestjs/common"
import { extname } from "path"
import { v4 as uuidv4 } from 'uuid';

const imageFileFilter = (req: any, file: any, callback: Function) => {
    if (!extname(file.originalname).match(/\.(jpg|jpeg|png|gif)$/)) {
        callback(
            new HttpException(
                'Only image files are allowed',
                HttpStatus.BAD_REQUEST
            ),
            false
        )
    } else {
        callback(null, true)
    }
}

const editFileName = (req: any, file: any, callback: Function) => {
    const fileExtName = extname(file.originalname)
    callback(null, `${uuidv4()}${fileExtName}`);
}

module.exports = {
    imageFileFilter,
    editFileName
}