export interface PostInterface {
  id: string;
  date: string;
  time: string;
  title: string;
  body: string;
  likes: number;
  dislikes: number;
  hashtags: string[];
  color: string;
  totalComments: number;
}

interface CommentInterface {
  _id: string;
  date: string;
  time: string;
  body: string;
}

export interface PostProps {
  date: string;
  time: string;
  title: string;
  body: string;
  likes: number;
  dislikes: number;
  hashtags: string[];
  comments?: CommentProps[];
  color: string;
}

export interface CommentProps {
  date: string;
  time: string;
  body: string;
}
