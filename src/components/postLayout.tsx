interface WordsLayoutProps {
  children: React.ReactNode | React.ReactNode[];
}

const WordsLayout = ({ children }: WordsLayoutProps) => {
  return (
    <div className="max-w-7xl mx-auto pt-[10rem] px-10 sm:px-8 md:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
      {children}
    </div>
  );
};

export default WordsLayout;
