// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import "../../../../utils/mongoose";
import { getPostById } from "../../../../helper/post-helper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;

    if (!id) {
      res.json([]);
    } else {
      const Post = await getPostById(id as string);
      res.status(200).json(Post);
    }
  } else {
    res.status(400);
  }
}
