import ROUTES from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";

const RightSidebar = () => {
  const hotQuestions = [
    {
      id: "1",
      title: "How to optimize React performance?",
    },
    {
      id: "2",
      title: "What are the best practices for state management in React?",
    },
    { id: "3", title: "How to handle side effects in React applications?" },
    {
      id: "4",
      title: "What is the difference between React Context and Redux?",
    },
  ];

  return (
    <section className="custom-scrollbar background-light900_dark200 light-border shadow-light-300 sticky top-0 right-0 flex h-screen w-87.5 flex-col gap-6 overflow-y-auto border-l p-6 pt-36 max-lg:hidden dark:shadow-none">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>

        <div className="mt-7 flex w-full flex-col gap-7.5">
          {hotQuestions.map(({ id, title }) => (
            <Link
              href={ROUTES.PROFILE(id)}
              className="flex items-center justify-between gap-7"
              key={id}
            >
              <p className="text-dark500_light700 font-medium">{title}</p>
              <Image
                src="/icons/chevron-right.svg"
                alt="Chevron Right"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
