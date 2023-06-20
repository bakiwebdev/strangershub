import { NextApiRequest, NextApiResponse } from "next";
import dbConnect, { dbDisconnect } from "@/utils/dbConnect";
import { createPost, getPosts } from "@/helper/post-helper";
import moment from "moment";

const colorList = [
  "ffffff",
  "2BAE66",
  "EDFF00",
  "00A4CC",
  "FFA177",
  "A2A2A1",
  "F9A12E",
  "FE4773",
  "933DC9",
  "61b59f",
  "F63CCA",
  "00ED00",
  "EC2A1C",
  "FF7C00",
  "8FBC8F",
  "FF6347",
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const { limit = 10, page = 1 } = req.query;
        // get method
        const posts = await getPosts(Number(page), Number(limit));
        await dbDisconnect();
        return res.status(200).json(posts);
      } catch (error) {
        console.error(error);
        await dbDisconnect();
        return res.status(500).json({ success: false, error: "Server Error" });
      }
    case "POST":
      try {
        //post method
        let { title, body, hashtags, color } = req.body;

        // check if title and body is not empty after trimming
        if (!title.trim() && !body.trim()) {
          res.status(400).json({
            message: "missing title or body value!",
          });
          return;
        }

        //   filter hashtags using regx
        hashtags = hashtags.match(/#\w+/g) || [];

        // Remove the '#' character if it's present
        const colorWithoutHash = color.replace(/^#/, "");

        // check if color is in the list of valid colors
        if (!colorList.includes(colorWithoutHash)) {
          res.status(400).json({
            message: "Invalid color value!",
          });
          return;
        }

        // Check if the string is a valid color value format
        const isValidColor = /^([0-9a-fA-F]{6})$/.test(colorWithoutHash);

        title = title.trim();
        body = body.trim();

        //   new Post to add
        const newPost = {
          date: moment().format("MMMM Do YYYY"),
          time: moment().format("h:mm:ss a"),
          title,
          body,
          likes: 0,
          dislikes: 0,
          hashtags,
          comments: [],
          color: isValidColor ? colorWithoutHash : "ffffff",
        };

        await createPost(newPost)
          .then((data) => {
            res.status(200).json({
              message: "Post added!",
              Post: data,
            });
          })
          .catch((err) => {
            res.status(200).json({
              message: "error",
              err,
            });
          });
        await dbDisconnect();
        return;
      } catch (error) {
        console.error(error);
        await dbDisconnect();
        return res.status(400).json({ success: false, error: "Bad Request" });
      }
    default:
      await dbDisconnect();
      return res.status(400).json({ success: false, error: "Bad Request" });
  }
}
