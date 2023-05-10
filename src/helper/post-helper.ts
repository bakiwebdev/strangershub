import { CommentProps, PostProps } from "../interfaces/Post";
import Post from "../model/post";
import Comment from "../model/comment";
import { connectMongoDB } from "@/utils/mongoose";

// Function to create a new Post document
export const createPost = async (postData: PostProps) => {
  await connectMongoDB();
  await Post.create(postData)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw new err();
    });
};

// Function to get all the Posts with pagination and limit
export const getPosts = async (page: number, limit: number) => {
  await connectMongoDB();
  const posts = await Post.aggregate([
    { $sort: { createdAt: -1 } },
    { $skip: (page - 1) * limit },
    { $limit: limit },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "post",
        as: "comments",
      },
    },
    {
      $project: {
        _id: 1,
        date: 1,
        time: 1,
        title: 1,
        body: 1,
        likes: 1,
        dislikes: 1,
        hashtags: 1,
        createdAt: 1,
        color: 1,
        totalComments: { $size: "$comments" },
      },
    },
  ]);

  const totalPost = await Post.countDocuments();

  return { totalPost, page, limit, posts };
};

// Function to get a Post document by its ID
export const getPostById = async (postId: string) => {
  await connectMongoDB();
  const post = await Post.findById(postId, { comments: 0, __v: 0 }).lean();
  return post;
};

// Like Post
export const likePost = async (postId: string) => {
  await connectMongoDB();
  const post = await Post.findByIdAndUpdate(
    postId,
    { $inc: { likes: 1 } },
    { new: true, select: "likes" }
  );

  return post;
};

// Dislike Post
export const dislikePost = async (postId: string) => {
  await connectMongoDB();
  const post = await Post.findByIdAndUpdate(
    postId,
    { $inc: { dislikes: 1 } },
    { new: true, select: "dislikes" }
  );

  return post;
};

// Function to search for Post documents
export const searchPosts = async (query: any) => {
  await connectMongoDB();
  const posts = await Post.find(query).lean();
  return posts;
};

// Function to search for Post documents using full text search
export const fullTextSearchPosts = async (
  query: any,
  page: number = 1,
  limit: number = 10
) => {
  await connectMongoDB();
  const skip = (page - 1) * limit;
  const [count, posts] = await Promise.all([
    Post.countDocuments({ $text: { $search: query } }),
    Post.find({ $text: { $search: query } }, { score: { $meta: "textScore" } })
      .sort({ score: { $meta: "textScore" } })
      .skip(skip)
      .limit(limit)
      .lean(),
  ]);
  const totalPages = Math.ceil(count / limit);
  return {
    posts,
    totalPages,
    totalResults: count,
  };
};

// Function to get the comments of a Post document by its ID
export const getComments = async (
  postId: string,
  page: number,
  limit: number
) => {
  await connectMongoDB();
  const [comments, total] = await Promise.all([
    Comment.find({ post: postId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Comment.countDocuments({ post: postId }),
  ]);
  return { total, page, limit, comments };
};

// Function to add a new comment to a Post document
export const addComment = async (postId: string, commentData: CommentProps) => {
  await connectMongoDB();
  const post = await Post.findById(postId);
  if (!post) return null;
  const comment = await Comment.create({ ...commentData, post: post._id });
  post.comments.push(comment._id);
  await post.save();
};
