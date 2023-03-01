interface PostLayoutProps {
  children: React.ReactNode | React.ReactNode[];
}

const PostLayout = ({ children }: PostLayoutProps) => {
  return (
    <div className="max-w-7xl mx-auto pt-28 px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
      {children}
    </div>
  );
};

export default PostLayout;
