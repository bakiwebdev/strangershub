import Seo from "@/components/SEO";
import WordCard from "@/components/wordCard";
import WordCardSkeleton from "@/components/wordCardSkeleton";
import WordsLayout from "@/components/wordsLayout";
import axios from "axios";
import { useEffect, useState } from "react";

const Words = () => {
  const [strangerWords, setStrangerWords] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  const cardSkeleton = [];

  for (let i = 0; i < 12; i++) {
    cardSkeleton.push(<WordCardSkeleton />);
  }

  useEffect(() => {
    axios.get("https://dagmawibabi.com/wot/getNotes/time/-1").then((res) => {
      setStrangerWords(res.data);
      setLoading(false);
    });
  }, []);
  return (
    <>
      <Seo />
      <WordsLayout>
        {loading && cardSkeleton}
        {strangerWords.map((strangerWord: any, index: number) => {
          return (
            <WordCard
              key={index}
              heading={strangerWord.title}
              body={strangerWord.content}
              likes={strangerWord.likes}
              dislikes={strangerWord.dislikes}
              color={strangerWord.color}
            />
          );
        })}
      </WordsLayout>
    </>
  );
};

export default Words;
