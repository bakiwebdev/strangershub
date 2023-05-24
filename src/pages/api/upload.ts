import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { file } = req.body;
    // console.clear()
    // console.log("body: ", req.body);
    // const formData = new FormData();
    // formData.append("file", file);

    // const config = {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // };

    // const response = await axios.post(
    //   "https://api.anonfiles.com/upload",
    //   formData,
    //   config
    // );
    console.log("file: ", req.body);
    return res.status(200).json(req.body);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
