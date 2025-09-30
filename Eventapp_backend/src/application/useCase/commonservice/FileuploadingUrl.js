import config from "../../../config/config.js";
import aws from 'aws-sdk'
import{S3Client,PutObjectCommand}from '@aws-sdk/client-s3';
import {getSignedUrl} from'@aws-sdk/s3-request-presigner';
import crypto,{randomBytes}from 'crypto'



const fileUpload= async()=>{
    const region='ap-south-1';
    const bucketName='discount-application';
    const accessKeyId=config.S3_ACESS_KEY;
    const secretAccessKey=config.S3_SECRET_KEY;

    const s3Client =new S3Client({
        region,
        credentials:{
            accessKeyId,
            secretAccessKey,
        }

    });
    const rowBytes= await randomBytes(16)
    const imageName=rowBytes.toString('hex')
    const command=new PutObjectCommand({
        Bucket:bucketName,
        Key:imageName,
    })
    const uploadURL=await getSignedUrl(s3Client,command)
    return uploadURL;
}
export default fileUpload