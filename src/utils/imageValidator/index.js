export const imageValidator = (file, size) => {
  const validMimeTypes = ["image/png", "image/jpg", "image/jpeg"];

  const maxSize = 1024 * 1024 * size;

  if (file) {
    if (!validMimeTypes.includes(file?.type)) {
      return { error: "Image type is wrong" };
    }

    if (file?.size > maxSize) {
      return { error: `Max size is ${size} MB` };
    }
  }

  return { file };
};
