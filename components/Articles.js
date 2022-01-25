import { FiberManualRecordRounded } from "@mui/icons-material";
import React from "react";
import TimeAgo from "timeago-react";

const Articles = ({ url, title = "", publishedAt = new Date() }) => {
  return (
    <div
      key={url}
      className="flex space-x-2 items-center cursor-pointer hover:bg-black/10 dark:hover:bg-black/20 px-2.5 py-1 mt-2"
    >
      <FiberManualRecordRounded className="!h-2 !w-2" />
      <div>
        <h5 className="max-w-xs font-medium text-sm pr-5">{title}</h5>
        <TimeAgo
          datetime={publishedAt}
          className="text-sm mt-0.5 dark:text-white/75 opacity-80"
        />
      </div>
    </div>
  );
};

export default Articles;
