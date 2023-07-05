import { PostLayoutInterface } from "@/Interface/PostInterface";
import { motion, Variants } from "framer-motion";

const PostLayout = ({ children }: PostLayoutInterface) => {
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
      className="flex flex-col gap-4 mb-10"
    >
      {children}
    </motion.div>
  );
};

export default PostLayout;
