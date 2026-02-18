import type { PostMetadata } from "@/types";

import { Date, Tags } from "@/components/posts";

export const PostStats = ({ postMeta }: { postMeta: PostMetadata }) => {
  return (
    <div className="mb-6 pb-6 border-primary border-b-2">
      <div className="flex flex-wrap gap-2 mb-4">
        {postMeta.tags.map((tag, index) => (
          <Tags key={index}>{tag}</Tags>
        ))}
      </div>
      <Date date={postMeta.timestamp} />
    </div>
  );
};
