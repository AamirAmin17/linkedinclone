import { CloseRounded, MoreHorizRounded } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

const Post = ({ post, modalPost }) => {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [showInput, setShowInput] = useState(false);

  const truncate = (string, characterLength) => {
    return string.length > characterLength
      ? string.substr(0, characterLength - 1) + "...see more"
      : string;
  };

  return (
    <div
      className={`bg-white dark:bg-[#1D2226] ${
        modalPost ? "rounded-r-lg" : "rounded-lg"
      } space-y-2 py-2.5 border-gray-300 dark:border-none`}>
      <div className='flex items-center px-2.5 cursor-pointer'>
        <Avatar src={post.userImg} className='!h-10 !w-10 !cursor-pointer' />
        <div className=' ml-2 leading-none'>
          <h6 className='font-medium text-black/75 hover:text-black/90 dark:text-white/75 dark:hover:text-white hover:underline'>
            {post.username}
          </h6>
          <p className='text-sm dark:text-white/75 opacity-90'>{post.email}</p>
          {/**Timeago stamp */}
        </div>

        {modalPost ? (
          <IconButton className='ml-auto' onClick={() => setModalOpen(false)}>
            <CloseRounded className='dark:text-white/75 h-7 w-7' />
          </IconButton>
        ) : (
          <IconButton className='ml-auto'>
            <MoreHorizRounded className='dark:text-white/75 h-7 w-7' />
          </IconButton>
        )}
      </div>
      {/**post content */}
      {/**condiitonal check if post exits */}
      {post.input && (
        <div className='px-2.5 break-all'>
          {modalPost || showInput ? (
            <p
              onClick={() => setShowInput(false)}
              className='dark:text-white/75'>
              {post.input}
            </p>
          ) : (
            <p
              onClick={() => setShowInput(true)}
              className='dark:text-white/75'>
              {truncate(post.input, 150)}
            </p>
          )}
        </div>
      )}

      {post.photoUrl && !modalPost && (
        <img
          src={post.photoUrl}
          className='w-full cursor-pointer'
          layout='fill'
          alt='new'
        />
      )}
    </div>
  );
};

export default Post;
