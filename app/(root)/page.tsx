import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Link from "next/link";

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const questions: Question[] = [
  {
    id: "1",
    title: "How to implement authentication in Next.js?",
    description:
      "I'm building a Next.js app and need to add user authentication. What are the best practices and libraries to use?",
    tags: [
      { id: "1", name: "Next.js" },
      { id: "2", name: "React.js" },
    ],
    author: { id: "1", name: "John Doe" },
    createdAt: new Date(),
    upvotes: 10,
    answers: 5,
    views: 100,
  },
  {
    id: "2",
    title: "How to do for loops in JavaScript or React?",
    description:
      "I'm new to JavaScript and React, and I'm trying to understand how to use for loops effectively in my code. Can someone provide examples of how to use for loops in both JavaScript and React?",
    tags: [
      { id: "1", name: "JavaScript" },
      { id: "2", name: "React.js" },
    ],
    author: { id: "1", name: "John Doe" },
    createdAt: new Date(),
    upvotes: 8,
    answers: 3,
    views: 80,
  },
];

export default async function Home({ searchParams }: SearchParams) {
  const { query = "", filter = "" } = await searchParams;

  const filteredQuestions = questions.filter((question) => {
    const matchesQuery = question.title
      .toLowerCase()
      .includes(query?.toLocaleLowerCase());
    const matchesFilter =
      !filter ||
      question.tags.some(
        (tag) => tag.name.toLowerCase() === filter.toLowerCase()
      );
    return matchesQuery && matchesFilter;
  });

  return (
    <div>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Button
          asChild
          className="primary-gradient text-light-900! min-h-11.5 px-4 py-3"
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask A Question</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch route="/" />
      </section>

      <HomeFilter />

      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>
    </div>
  );
}
