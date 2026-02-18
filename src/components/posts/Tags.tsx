import { Badge } from "@/components/ui/badge";
interface TagsProps {
  children: React.ReactNode;
  className?: string;
}

export const Tags = ({
  children,
  className = "bg-purple-50 text-purple-700 dark:bg-purple-900 dark:text-purple-200",
}: TagsProps) => {
  return <Badge className={className}>{children}</Badge>;
};
