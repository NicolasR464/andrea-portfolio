import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

const imgHandler = async (
  req: any,
  folder: string,
  file: any, // buffer?
  tags: Array<string>,
  metadata: Object
) => {
  //
  let streamUpload = () => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream(
        {
          folder: `saf_portfolio/${folder}`,
          tags: tags,
          context: metadata,
        },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );

      streamifier.createReadStream(file).pipe(stream);
    });
  };

  async function upload() {
    let result = await streamUpload();
    return result;
  }

  return upload();
};

module.exports = imgHandler;
