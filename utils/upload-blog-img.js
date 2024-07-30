const ImageMimeTypes = ["image/jpeg", "image/png", "image/gif"];

module.exports = (imageEncoded) => {
  if (!imageEncoded) return;

  const image = JSON.parse(imageEncoded);
  if (image && ImageMimeTypes.includes(image.type)) {
    return Buffer.from(image.data, "base64");
  }
};
