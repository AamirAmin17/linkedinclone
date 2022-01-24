import React, { useEffect } from "react";
import useSWR, { mutate } from "swr";
import Input from "./Input";
import { getPostServerSide } from "../atoms/getPostAtom";
import { useRecoilValue } from "recoil";
import Post from "./Post";
import { handlePostState } from "../atoms/postAtom";
const Feed = () => {
  const fetchPostsFromRecoil = useRecoilValue(getPostServerSide);
  const handlePost = useRecoilValue(handlePostState);
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
  useEffect(() => {
    mutate("/api/posts");
  }, [handlePost]);
  const { data, error } = useSWR("/api/posts", fetcher);

  //   if (error) return "An error has occurred.";
  //   if (!data) return "Loading...";

  return (
    <div className="space-y-6 pb-24 max-w-lg">
      {/**Input */}
      <Input />
      {data
        ? data?.map((postObj) => <Post post={postObj} />)
        : fetchPostsFromRecoil.map((postObj) => <Post post={postObj} />)}
      {/**Posts */}
    </div>
  );
};

export default Feed;
