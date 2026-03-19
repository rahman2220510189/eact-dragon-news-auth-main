// Uploads image to ImgBB and returns the URL
const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    { method: "POST", body: formData }
  );

  const data = await res.json();

  if (!data.success) {
    throw new Error("Image upload failed");
  }

  // Return the direct image URL
  return data.data.url;
};

export default uploadImage;