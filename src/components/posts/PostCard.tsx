import type { PostMetadata } from "@/types";

import { Date, Tags } from "@/components/posts";
import { Separator } from "@/components/ui/separator";
import { PATH } from "@/shared/constants";
import { Link } from "react-router-dom";

export const Title = ({ title }: { title: string }) => {
  return <h3 className="text-lg font-semibold hover:underline">{title}</h3>;
};

export const PostCard = ({
  post,
  index,
}: {
  post: PostMetadata;
  index: number;
}) => {
  const appearDirections = [
    "animate-slide-in-from-left",
    "animate-slide-in-from-right",
    "animate-slide-in-from-top",
    "animate-slide-in-from-bottom",
  ];
  const direction = appearDirections[index % 4];
  const delay = (index % 6) * 100;

  return (
    <div
      className={`w-full bg-card text-card-foreground rounded-xl border shadow-sm p-4 ${direction}`}
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      <div className="flex flex-row items-start justify-between gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <Link to={`${PATH.POST_DETAIL}/${post.fileName}`}>
            <Title title={post.title} />
          </Link>
          <Date date={post.timestamp} />

          <Separator />

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <Tags key={index}>{tag}</Tags>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
