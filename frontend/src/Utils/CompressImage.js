import imageCompression from "browser-image-compression";

export async function compressImage(file, options = {}) {
  if (!file) throw new Error("No file provided");

  const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

  if (!allowedTypes.includes(file.type)) {
    throw new Error("Only PNG, JPG, and JPEG images are allowed");
  }

  const defaultOptions = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 600,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(file, defaultOptions);
    return compressedFile;
  } catch (error) {
    throw error;
  }
}