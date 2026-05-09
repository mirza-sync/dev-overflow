"use client";

import Image from "next/image";
import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";

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
  const pathname = usePathname();
  const router = useRouter();
  const serchParams = useSearchParams();
  const query = serchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const previousSearchRef = useRef(searchQuery);

  useEffect(() => {
    // Only trigger if search actually changed
    if (previousSearchRef.current === searchQuery) return;
    previousSearchRef.current = searchQuery;

    const debounce = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: serchParams.toString(),
          key: "query",
          value: searchQuery,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromUrlQuery({
            params: serchParams.toString(),
            keysToRemove: ["query"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchQuery, router, route, serchParams, pathname]);

  return (
    <div
      className={`background-light800_darkgradient flex min-h-14 grow items-center rounded-[10px] px-4 ${twClasses}`}
    >
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
