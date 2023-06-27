import multer from "multer";

const fileUpload = multer();

export default async function handleImage(imgInput: any) {
  return fileUpload.single(imgInput);
}
