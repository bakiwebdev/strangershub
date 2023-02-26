import { PostInterface } from "@/Interface/PostInterface";
import Seo from "@/components/SEO";
import PostFilter from "@/components/postFilter";
import PostCard from "@/components/postCard";
import PostCardSkeleton from "@/components/postCardSkeleton";
import PostLayout from "@/components/postLayout";
import axios from "axios";
import { useEffect, useState } from "react";

const Words = () => {
  const [strangerWords, setStrangerWords] = useState<PostInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const cardSkeleton = [];

  for (let i = 0; i < 12; i++) {
    cardSkeleton.push(<PostCardSkeleton />);
  }

  useEffect(() => {
    axios.get("https://strangers-hub.onrender.com/api/v1/post?page=1&limit=100").then((res) => {
      setStrangerWords(res.data.posts);
      setLoading(false);
    });
  }, []);

  const updateEvent = () => {
    setLoading(true);
    axios.get("https://strangers-hub.onrender.com/api/v1/post?page=1&limit=100").then((res) => {
      setStrangerWords(res.data.posts);
      setLoading(false);
    });
  };
  return (
    <>
      <Seo />
      <PostFilter onUpdateRequest={updateEvent} />
      <PostLayout>
        {loading && cardSkeleton}
        {strangerWords.map((strangerWord: any, idx: number) => {
          return (
            <PostCard
              key={strangerWord._id}
              id={strangerWord._id}
              date={strangerWord.date}
              time={strangerWord.time}
              title={strangerWord.title}
              body={strangerWord.body}
              likes={strangerWord.likes}
              dislikes={strangerWord.dislikes}
              hashtags={strangerWord.hashtags}
              color={strangerWord.color}
            />
          );
        })}
      </PostLayout>
    </>
  );
};

export default Words;
