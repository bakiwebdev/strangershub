import axios from "axios";
import FormData from "form-data";

const uploadImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload", formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  }
};

export default uploadImage;
