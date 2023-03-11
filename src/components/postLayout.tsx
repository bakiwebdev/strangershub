import { motion, Variants } from "framer-motion";

interface PostLayoutProps {
  children: React.ReactNode | React.ReactNode[];
}

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
      className="max-w-7xl mx-auto pt-28 px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10"
    >
      {children}
    </motion.div>
  );
};

export default PostLayout;
