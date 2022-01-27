import {
  CloseRounded,
  CommentOutlined,
  MoreHorizRounded,
  ThumbUpOffAltOutlined,
  ThumbUpOffAltRounded,
  DeleteRounded,
  ReplyRounded,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../atoms/modalAtom";
import { getPostState, handlePostState } from "../atoms/postAtom";
import TimeagoReact from "timeago-react";
import TimeAgo from "timeago-react";
import useSWR, { mutate } from "swr";
import { CircularProgress } from "@mui/material";
const Post = ({ post, modalPost }) => {
  console.log("post: ", post);
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [showInput, setShowInput] = useState(false);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [postState, setPostState] = useRecoilState(getPostState);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const [spinner, setSpinner] = useState(false);

  const [liked, setLiked] = useState(false);
  const { data } = useSession();
  const truncate = (string, characterLength) => {
    return string.length > characterLength
      ? string.substr(0, characterLength - 1) + "...see more"
      : string;
  };

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
  console.log("getData: ", getData);
  const deletePost = async () => {
    setSpinner((prev) => !prev);

    mutate(
      "/api/posts",
      getData.filter((data) => data._id !== post._id),
      false
    );
    setSpinner((prev) => !prev);
    const response = await fetch(`/api/posts/${post._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "applicaton/json" },
    });
    mutate("/api/posts");
    setHandlePost((prev) => !prev);
    setModalOpen(false);
  };
  return (
    <div
      className={`bg-white dark:bg-[#1D2226] ${
        modalPost ? "rounded-r-lg" : "rounded-lg"
      } space-y-2 py-2.5 border-gray-300 dark:border-none`}
    >
      <div className="flex items-center px-2.5 cursor-pointer">
        <Avatar src={post.userImg} className="!h-10 !w-10 !cursor-pointer" />
        <div className=" ml-2 leading-none">
          <h6 className="font-medium text-black/75 hover:text-black/90 dark:text-white/75 dark:hover:text-white hover:underline">
            {post.username}
          </h6>
          <p className="text-sm dark:text-white/75 opacity-90">{post.email}</p>
          {/**Timeago stamp */}
          <TimeAgo
            datetime={post.createdAt}
            className="text-sm dark:text-white/75 opacity-80"
          />
        </div>

        {modalPost ? (
          <IconButton className="!ml-auto" onClick={() => setModalOpen(false)}>
            <CloseRounded className="dark:text-white/75 h-7 w-7" />
          </IconButton>
        ) : (
          <IconButton className="!ml-auto">
            <MoreHorizRounded className="!dark:text-white/75 !h-7 !w-7" />
          </IconButton>
        )}
      </div>
      {/**post content */}
      {/**condiitonal check if post exits */}
      {post.input && (
        <div className="px-2.5 break-all">
          {modalPost || showInput ? (
            <p
              onClick={() => setShowInput(false)}
              className="dark:text-white/75"
            >
              {post.input}
            </p>
          ) : (
            <p
              onClick={() => setShowInput(true)}
              className="dark:text-white/75"
            >
              {truncate(post.input, 150)}
            </p>
          )}
        </div>
      )}

      {post.photoUrl && !modalPost && (
        <img
          src={post.photoUrl}
          className="w-full cursor-pointer"
          alt="new"
          onClick={() => {
            setModalOpen(true);
            setModalType("gifYouUp");
            setPostState(post);
          }}
        />
      )}
      <div className="flex justify-evenly items-center dark:border-t border-gray-600/80 mx-2.5 pt-2 text-black/60 dark:text-white/75">
        {modalPost ? (
          <button className="postButton">
            <CommentOutlined />
            <h4>Comment</h4>
          </button>
        ) : (
          <button
            className={`postButton ${liked && "text-blue-500"}`}
            onClick={() => setLiked(!liked)}
          >
            {liked ? (
              <ThumbUpOffAltRounded className="-scale-x-100" />
            ) : (
              <ThumbUpOffAltOutlined className="-scale-x-100" />
            )}
            <h4>Like</h4>
          </button>
        )}

        {data?.user?.email === post?.email ? (
          <button
            className="postButton hover:text-red-400 transition ease-out"
            onClick={deletePost}
          >
            <div className="flex gap-2 items-center">
              {spinner && <CircularProgress />}
              <DeleteRounded />
              <h4>Delete a post</h4>
            </div>
          </button>
        ) : (
          <button className="postButton">
            <ReplyRounded className="-scale-x-100" />
            <h4>Share</h4>
          </button>
        )}
      </div>
    </div>
  );
};

export default Post;
