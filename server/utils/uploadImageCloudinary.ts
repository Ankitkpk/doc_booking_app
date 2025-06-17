import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';
import path from 'path';
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

export interface CloudinaryUploadResponse {
  url: string;
  public_id: string;
  secure_url:string;
  [key: string]: any;
}

const uploadImageOnCloudinary = async (
  localFilePath: string
): Promise<CloudinaryUploadResponse | { success: false; error: string }> => {
  try {
    if (!localFilePath) {
      throw new Error("No file path provided");
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("✅ File uploaded to Cloudinary:", response.url);
    await fs.unlink(localFilePath);

    return response;
  } catch (error: any) {
    console.error("❌ Cloudinary upload failed:", error.message);

    try {
      await fs.unlink(localFilePath);
      console.log("🗑️ Local file deleted due to failure.");
    } catch (unlinkError: any) {
      console.error("⚠️ Failed to delete local file:", unlinkError.message);
    }

    return { success: false, error: error.message };
  }
};

export default uploadImageOnCloudinary;
