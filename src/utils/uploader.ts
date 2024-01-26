import { PutObjectCommand, S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";

interface S3Config {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
}

const s3Config: S3Config = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    region: process.env.AWS_REGION || '',
};

const s3Client = new S3Client(s3Config);

interface UploadFileParams {
    originalname: string;
    buffer: Buffer | Uint8Array | Blob | string | Readable;
}

export const uploadFile = async (file: UploadFileParams, folder: string = 'myfiles', name: string = ''): Promise<string | null> => {
    try {
        const fileName = name ? `${name}.${file.originalname.split('.').pop()}` : file.originalname;

        const params: any = {
            Bucket: process.env.AWS_BUCKET_NAME || '',
            Key: `live/${folder}/${fileName}`,
            Body: file.buffer,
            ACL: 'public-read',
        };

        const command = new PutObjectCommand(params);
        const response = await s3Client.send(command);

        // Check if there's an error in the response related to ACL
        if (response && response.$metadata && response.$metadata.httpStatusCode !== 200) {
            console.error(`Error setting ACL: ${response.$metadata.httpStatusCode}`);
            return null;
        }

        return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/live/${folder}/${fileName}`;
    } catch (e) {
        console.error(e);
        return null;
    }
};

export const deleteFile = async (fileUrl: string): Promise<boolean> => {
    try {
        // Parse the file URL to get the key
        const key = fileUrl.replace(`https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/`, '');

        const params: any = {
            Bucket: process.env.AWS_BUCKET_NAME || '',
            Key: key,
        };

        const command = new DeleteObjectCommand(params);
        await s3Client.send(command);

        console.log(`File deleted successfully: ${fileUrl}`);
        return true;
    } catch (e) {
        console.error(`Error deleting file ${fileUrl}:`, e);
        return false;
    }
};
