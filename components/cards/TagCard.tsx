import ROUTES from "@/constants/routes";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { getDevIconClassName } from "@/lib/utils";
import Image from "next/image";

interface TagCardProps {
  id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  isCompact?: boolean;
  isRemovable?: boolean;
  onRemoveTag?: (tag: string) => void;
  hasHref?: boolean;
}

const TagCard = ({
  id,
  name,
  questions,
  showCount,
  isCompact,
  isRemovable,
  onRemoveTag,
  hasHref,
}: TagCardProps) => {
  const iconClass = getDevIconClassName(name);

  const content = (
    <>
      <Badge className="background-light800_dark300 text-light400_light500 flex flex-row gap-2 rounded-md border-none px-4 py-2 uppercase">
        <div className="flex-center space-x-2">
          <i className={`${iconClass} text-sm`} />
          <span>{name}</span>
        </div>
        {isRemovable && (
          <Image
            className="cursor-pointer object-contain invert-0 dark:invert"
            src="/icons/close.svg"
            width={12}
            height={12}
            alt="X icon"
            onClick={() => onRemoveTag?.(name)}
          />
        )}
      </Badge>

      {showCount && (
        <span className="text-dark500_light700 small-medium">{questions}</span>
      )}
    </>
  );

  if (hasHref) {
    return (
      <Link href={ROUTES.TAGS(id)} className="flex justify-between gap-2">
        {content}
      </Link>
    );
  } else {
    return <div className="cursor-default">{content}</div>;
  }
};

export default TagCard;
