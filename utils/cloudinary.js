const cloudinary = require("cloudinary");

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});
const cloudinaryUploadImg = async (fileToUploads) => {
  try {
    const result = await cloudinary.v2.uploader.upload(fileToUploads, {
      resource_type: "auto",
    });
    return {
      url: result.secure_url,
      asset_id: result.asset_id,
      public_id: result.public_id,
    };
  } catch (error) {
    // Handle any errors
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
};
const cloudinaryDeleteImg = async (fileToDelete) => {
  try {
    const result = await cloudinary.v2.uploader.destroy(fileToDelete, {
      resource_type: "auto",
    });
    return {
      url: result.secure_url,
      asset_id: result.asset_id,
      public_id: result.public_id,
    };
  } catch (error) {
    // Handle any errors
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
};

module.exports = { cloudinaryUploadImg, cloudinaryDeleteImg };
