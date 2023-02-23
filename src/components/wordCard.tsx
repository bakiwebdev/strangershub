const WordCard = () => {
  return (
    <div className="bg-gray-800 flex flex-col p-4 border rounded-md border-white ">
      word card
      {/* heading */}
      <h3>This is heading</h3>
      {/* body */}
      <section>
        "fashion is part of the daily air and it changes all the time, with all
        the events. you can even see the approaching of a revolution in clothes.
        you can see and feel everything in clothes." —diana vreeland
      </section>
      {/* like, dislike, comment */}
      <div className="flex justify-between"></div>
    </div>
  );
};

export default WordCard;
