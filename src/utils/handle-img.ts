import crypto from "crypto";

const e = process.env;

const generateSHA1 = (data: any) => {
  const hash = crypto.createHash("sha1");
  hash.update(data);
  return hash.digest("hex");
};

const generateSignature = (publicId: string, apiSecret: string) => {
  const timestamp = new Date().getTime();
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

export const deleteImage = async (publicId: string) => {
  const cloudName = e.CLOUDINARY_CLOUD_NAME!;
  const timestamp: any = new Date().getTime();
  const apiKey = e.CLOUDINARY_API_KEY!;
  const apiSecret = e.CLOUDINARY_API_SECRET!;
  const signature = generateSHA1(generateSignature(publicId, apiSecret));
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

  const cloudinaryForm = new FormData();

  cloudinaryForm.append("public_id", publicId);
  cloudinaryForm.append("signature", signature);
  cloudinaryForm.append("api_key", apiKey);
  cloudinaryForm.append("timestamp", timestamp);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: cloudinaryForm,
    });

    const cloudinaryRes = await response.json();

    return cloudinaryRes;
  } catch (error) {
    return error;
  }
};

export const uploadImage = async (
  img: File,
  name: string,
  collection: string
) => {
  const cloudinaryForm = new FormData();

  const cloudiMeta = `name=${name}|collection=${collection}`;

  cloudinaryForm.append("file", img);
  cloudinaryForm.append("api_key", e.CLOUDINARY_API_KEY!);
  cloudinaryForm.append("api_secret", e.CLOUDINARY_API_SECRET!);
  cloudinaryForm.append("upload_preset", e.CLOUDINARY_UPLOAD_PRESET!);
  // cloudinaryForm.append("timestamp", Date.now().toString());
  cloudinaryForm.append("folder", e.CLOUDINARY_UPLOAD_IMG_DRAWING_FOLDER!);
  // cloudinaryForm.append("context", cloudiMeta);

  console.log("cloudinary form ↴");

  console.log(cloudinaryForm);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${e.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: cloudinaryForm,
      }
    );

    console.log(response);
    // TEST LOG

    console.log(response["headers"]);

    //
    if (response.ok) {
      const cloudiRes = await response.json();
      console.log(cloudiRes);

      return cloudiRes;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};
