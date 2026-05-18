import { getTimeAgo } from "@/lib/utils";

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
          <span>{getTimeAgo(createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
