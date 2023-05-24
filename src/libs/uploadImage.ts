import axios from "axios";
import FormData from "form-data";

const uploadImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    try {
      //   const response = await axios.post("/api/upload", formData);
      //   const response = await axios.post(
      //     "https://api.anonfiles.com/upload",
      //     formData
      //   );
      //   console.log(response.data);
      //   let data = new FormData();
      //   data.append("file", file);
      //   const response = await fetch(`https://api.anonfiles.com/upload`, {
      //     method: "POST",
      //     body: data,
      //   });

      let data = new FormData();
      data.append("file", file);

      const response = await fetch(`https://api.anonfiles.com/upload`, {
        method: "POST",
        body: data,
      });
      return await response.json();
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  }
};

export default uploadImage;
