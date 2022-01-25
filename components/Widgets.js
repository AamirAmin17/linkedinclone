import { InfoRounded } from "@mui/icons-material";
import React from "react";
import { useRecoilValue } from "recoil";
import { newsStateSelector } from "../atoms/newsAtom";
import Timeago from "timeago-react";
import Articles from "./Articles";
import Image from "next/image";

const Widgets = () => {
  const selectorArticles = useRecoilValue(newsStateSelector);
  return (
    <div className="hidden xl:inline space-y-2">
      {/**News */}
      <div className="bg-white dark:bg-[#1D2226] py-2.5 rounded-lg space-y-2 w-11/12 overflow-hidden border border-gray-300 dark:border-none">
        <div className="flex items-center justify-between font-bold px-2.5">
          <h4>LinkedIn News</h4>
          <InfoRounded className="h-5 w-5" />
        </div>

        <articles className="space-y-1">
          {selectorArticles.map((article) => (
            <Articles
              url={article.url}
              title={article.title}
              publishedAt={article.publishedAt}
              key={article.url}
            />
          ))}
        </articles>
      </div>
      <div className="bg-white dark:bg-[#1D2226] w-11/12 h-64 px-2.5 rounded-lg sticky top-20 border border-gray-300 dark:border-none">
        <div className="relative w-full h-full">
          <Image
            src="https://rb.gy/kbfeaa"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Widgets;
