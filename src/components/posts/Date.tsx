import { formatDate } from "@/shared/lib";

export const Date = ({ date }: { date: string }) => {
  return (
    <span className="text-sm text-muted-foreground font-lora">
      {formatDate(date)}
    </span>
  );
};
