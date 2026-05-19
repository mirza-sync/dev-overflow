import ROUTES from "@/constants/routes";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { getDevIconClassName } from "@/lib/utils";

interface TagCardProps {
  id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
}

const TagCard = ({ id, name, questions, showCount, compact }: TagCardProps) => {
  const iconClass = getDevIconClassName(name);

  return (
    <Link href={ROUTES.TAGS(id)} className="flex justify-between gap-2">
      <Badge className="background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
        <div className="flex-center space-x-2">
          <i className={`${iconClass} text-sm`} />
          <span>{name}</span>
        </div>
      </Badge>

      {showCount && (
        <span className="text-dark500_light700 small-medium">{questions}</span>
      )}
    </Link>
  );
};

export default TagCard;
