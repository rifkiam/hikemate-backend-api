import * as fs from 'fs';
import path from 'path';

import { CustomException } from '../response/CustomException';

export default function saveFile(
    folderPath: string,
    file: Express.Multer.File,
    fileNamePrefix?: string,
) {
    try {
        const uploadDir = path.join(
            __dirname,
            '..',
            '..',
            '..',
            'storage',
            'uploads/' + folderPath,
        );

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const defaultName = Date.now().toString();
        const ext = path.extname(file.originalname);
        const finalFileName = fileNamePrefix
            ? fileNamePrefix + '_' + defaultName + ext
            : defaultName + ext;
        const filePath = path.join(uploadDir, finalFileName);

        fs.writeFileSync(filePath, file.buffer);

        return 'uploads/' + folderPath + finalFileName;
    } catch (e) {
        throw new CustomException('Error in saving file: ' + e, 500);
    }
}
