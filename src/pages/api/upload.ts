import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb", // Set desired value here
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const file = req.body.file; // Assuming the field name is 'file'

    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      "https://api.anonfiles.com/upload",
      formData
    );

    res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ err: "Something went wrong", error });
  }
}
