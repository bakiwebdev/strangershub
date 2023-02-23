import WordCard from "./wordCard";

const WordsLayout = () => {
  let wordCardList = [];
  for (let i = 0; i < 100; i++) {
    wordCardList.push(<WordCard />);
  }
  return (
    <div className="max-w-6xl mx-auto pt-16 px-10 sm:px-6 md:px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {wordCardList}
    </div>
  );
};

export default WordsLayout;
