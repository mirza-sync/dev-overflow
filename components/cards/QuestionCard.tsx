import ROUTES from "@/constants/routes";
import { getTimeAgo } from "@/lib/utils";
import Link from "next/link";

interface QuestionCardProps {
  question: Question;
}

const QuestionCard = ({
  question: { id, title, tags, author, createdAt, upvotes, answers, views },
}: QuestionCardProps) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeAgo(createdAt)}
          </span>
          <Link href={ROUTES.QUESTION(id)}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
