import { motion, Variants } from "framer-motion";

interface PostLayoutProps {
  children: React.ReactNode | React.ReactNode[];
}
const tweets = [
  {
    id: 1,
    username: "JohnDoe",
    tweet: "Hello, Twitter!",
  },
  {
    id: 2,
    username: "JaneSmith",
    tweet: "I love Tailwind CSS!",
  },
  {
    id: 3,
    username: "BobJohnson",
    tweet: "Next.js is awesome!",
  },
];
const PostLayout = ({ children }: PostLayoutProps) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };
  return (
    <motion.div
      variants={containerVariants}
      className="max-w-7xl mx-auto mt-10 px-10 grid grid-cols-1 gap-4 mb-10"
    >
      {children}
    </motion.div>
  );
};

export default PostLayout;
