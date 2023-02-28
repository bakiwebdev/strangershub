import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const WordCardSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#1e283b" highlightColor="#334155">
      <div className="border rounded-md border-gray-500 flex flex-col p-4">
        {/* heading and body */}
        <div className="flex flex-col gap-1">
          {/* heading */}
          <Skeleton height={"14px"} />
          <Skeleton width={"50%"} height={"12px"} />
          <section>
            <Skeleton count={5} />
          </section>
        </div>
        {/* like, dislike, comment */}
        <div
          className="flex justify-between mt-2 px-4 sm:px-3 md:px-2 z-10"
        >
          <Skeleton circle height="20px" width={"20px"} />
          <Skeleton circle height="20px" width={"20px"} />
          <Skeleton circle height="20px" width={"20px"} />
          <Skeleton circle height="20px" width={"20px"} />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default WordCardSkeleton;
