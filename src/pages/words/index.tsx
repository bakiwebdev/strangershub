import Seo from "@/components/SEO";
import WordCard from "@/components/wordCard";
import WordsLayout from "@/components/wordsLayout";
import axios from "axios";
import { useEffect, useState } from "react";

const Words = () => {
  const [strangerWords, setStrangerWords] = useState([]);

  useEffect(() => {
    axios.get("https://dagmawibabi.com/wot/getNotes/time/-1").then((res) => {
      console.log(res.data);
      setStrangerWords(res.data);
    });
  }, []);
  return (
    <>
      <Seo />
      <WordsLayout>
        {strangerWords.map((strangerWord) => {
          return (
            <WordCard
              key={strangerWord._id}
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
