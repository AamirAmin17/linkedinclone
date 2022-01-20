import React from "react";
import useSWR from "swr";
import Input from "./Input";
import { getPostServerSide } from "../atoms/getPostAtom";
import { useRecoilValue } from "recoil";
const Feed = () => {
  const fetchPostsFromRecoil = useRecoilValue(getPostServerSide);

  //short syntax of the same above function but still im using long because to understand clearly :D
  //   const fetcher = (...args) => fetch(...args).then((res) => res.json());

  //long function of fetcher
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

  const { data, error } = useSWR("/api/posts", fetcher);
  //   if (error) return "An error has occurred.";
  //   if (!data) return "Loading...";

  console.log(data);
  return (
    <div className='space-y-6 pb-24 max-w-lg'>
      {/**Input */}
      <Input />
      {fetchPostsFromRecoil?.map((data) => (
        <div>{data.input}</div>
      ))}
      {/**Posts */}
    </div>
  );
};

export default Feed;
