import multer from "multer";

// Configure multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadMiddleware = upload.single("file");
