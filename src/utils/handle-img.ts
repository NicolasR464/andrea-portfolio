import crypto from "crypto";

// const e: any = process.env;

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
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME!;
  const timestamp: any = new Date().getTime();
  const apiKey = process.env.CLOUDINARY_API_KEY!;
  const apiSecret = process.env.CLOUDINARY_API_SECRET!;
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
  cloudinaryForm.append("api_key", process.env.CLOUDINARY_API_KEY!);
  cloudinaryForm.append("api_secret", process.env.CLOUDINARY_API_SECRET!);
  cloudinaryForm.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET!);
  // cloudinaryForm.append("timestamp", Date.now().toString());
  cloudinaryForm.append(
    "folder",
    process.env.CLOUDINARY_UPLOAD_IMG_DRAWING_FOLDER!
  );

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: cloudinaryForm,
      }
    );

    //
    if (response.ok) {
      const cloudiRes = await response.json();

      return cloudiRes;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const publicImgUpload = async (img: any) => {
  const cloudinaryForm = new FormData();

  let folder = "andrea-drawing-portfolio";

  if (process.env.NODE_ENV === "development")
    folder = "andrea-drawing-portfolio-dev";
  cloudinaryForm.append("file", img);
  cloudinaryForm.append("folder", folder);
  cloudinaryForm.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
  );

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: cloudinaryForm,
      }
    );

    //
    if (response.ok) {
      const cloudiRes: any = await response.json();

      return {
        public_id: cloudiRes.public_id,
        url: cloudiRes.secure_url,
      };
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};
