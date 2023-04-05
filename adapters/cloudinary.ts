import c from "cloudinary";

const cloudinary = c.v2;

cloudinary.config({
  secure: true,
});

export default cloudinary;
