import type { NextApiRequest, NextApiResponse } from "next";
import "../../../utils/mongoose";
import { fullTextSearchPosts } from "../../../helper/post-helper";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { query, page, limit } = req.query;
    const parsedPage = parseInt((page as string) || "1");
    const parsedLimit = parseInt((limit as string) || "10");
    const { posts, totalPages, totalResults } = await fullTextSearchPosts(
      query,
      parsedPage,
      parsedLimit
    );
    res.json({ posts, totalPages, totalResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
