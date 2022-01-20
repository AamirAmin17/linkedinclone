import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import useSWR, { mutate, trigger } from "swr";
import { modalState } from "../atoms/modalAtom";

const Form = () => {
  const [photoUrl, setPhotoUrl] = useState("");

  const [state, setState] = useState({
    value: "",
    rows: 2,
    minRows: 2,
    maxRows: 10,
  });
  const fetcher = async (...args) => {
    const response = await fetch(...args, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    return responseData;
  };

  const { data: getData, error } = useSWR("/api/posts", fetcher);
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const { data } = useSession();
  const uploadPost = async (e) => {
    e.preventDefault();

    mutate(
      "/api/posts",
      [
        ...getData,
        {
          input: state.value,
          photoUrl,
          username: data?.user?.name,
          email: data?.user?.email,
          userImg: data?.user?.image,
          createdAt: new Date().toString(),
        },
      ],
      false
    );
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        input: state.value,
        photoUrl,
        username: data?.user?.name,
        email: data?.user?.email,
        userImg: data?.user?.image,
        createdAt: new Date().toString(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    mutate("/api/posts");
    console.log("responseData: ", responseData);
    setModalOpen(false);
  };

  const handleChange = (event) => {
    const textareaLineHeight = 24;
    const { minRows } = state;

    const previousRows = event.target.rows;

    event.target.rows = minRows; // reset number of rows in textarea

    const scrollHeight = event.target.scrollHeight;

    const currentRows = event.target.scrollHeight / textareaLineHeight;

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    // if (currentRows >= maxRows) {
    //   event.target.rows = maxRows;
    //   event.target.scrollTop = event.target.scrollHeight;
    // }

    setState((prev) => ({
      ...prev,
      value: event.target.value,
      rows: currentRows,
    }));
  };

  return (
    <form className="flex flex-col relative space-y-2 text-black/80 dark:text-white/75 px-4 pb-3">
      <div>
        <textarea
          placeholder="What do you want to talk about?"
          className={`bg-transparent focus:outline-none dark:placeholder-white/75 hideScrollbar resize-none max-h-48 w-full h-auto overflow-auto`}
          value={state.value}
          onChange={handleChange}
          rows={state.rows}
        />
      </div>
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Add a photo URL (optional)"
          className="bg-transparent focus:outline-none truncate w-full max-w-xs md:max-w-sm dark:placeholder-white/75"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />
        <button
          className="font-medium bg-blue-400 hover:bg-blue-500 disabled:text-black/40 disabled:bg-white/75 disabled:cursor-not-allowed text-white rounded-full px-3.5 py-1"
          disabled={!state.value.trim() && !photoUrl.trim()}
          type="submit"
          onClick={uploadPost}
        >
          Post
        </button>
      </div>
    </form>
  );
};

export default Form;
