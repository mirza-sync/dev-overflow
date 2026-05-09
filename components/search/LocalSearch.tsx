"use client";

import Image from "next/image";
import { Input } from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { formUrlQuery } from "@/lib/url";

interface LocalSearchProps {
  route: string;
  imgSrc?: string;
  placeholder?: string;
  twClasses?: string;
}

const LocalSearch = ({
  route,
  imgSrc = "/icons/search.svg",
  placeholder = "Search...",
  twClasses,
}: LocalSearchProps) => {
  const router = useRouter();
  const serchParams = useSearchParams();
  const query = serchParams.get("query") || "";

  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    if (searchQuery) {
      const newUrl = formUrlQuery({
        params: serchParams.toString(),
        key: "query",
        value: searchQuery,
      });
      router.push(newUrl, { scroll: false });
    }
  }, [searchQuery, router, route, serchParams]);

  return (
    <div
      className={`background-light800_darkgradient flex min-h-14 grow items-center rounded-[10px] px-4 ${twClasses}`}
    >
      {serchParams.toString()}
      <Image
        src={imgSrc}
        width={24}
        height={24}
        alt="Magnifying Glass"
        className=""
      />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent! shadow-none outline-none"
      />
    </div>
  );
};

export default LocalSearch;
