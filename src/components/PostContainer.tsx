import PostCard from "./PostCard";
import SortByCard from "./SortByCard";
import PostLayout from "./PostLayout";

const PostContainer = ({ posts }: any) => {
  return (
    <section>
      <SortByCard />
      <div className="h-5" />
      <PostLayout>
        {posts.map((post: any) => {
          return (
            <PostCard
              key={post._id}
              id={post._id}
              date={post.date}
              time={post.time}
              body={post.body}
              color={post.color}
              likes={post.likes}
              dislikes={post.dislikes}
              hashtags={post.hashtags}
              totalComments={post.totalComments}
            />
          );
        })}
      </PostLayout>
    </section>
  );
};

export default PostContainer;
