import { CloseRounded } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import React from "react";
import { useRecoilValue } from "recoil";
import Backdrop from "./Backdrop";
import Form from "./Form";
import Post from "./Post";
import { getPostState } from "../atoms/postAtom";
const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 15,
      shiffness: 600,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const gifYouUp = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.15,
      ease: "easeOut",
    },
  },
};

const Modal = ({ handleClose, type }) => {
  const { data } = useSession();
  const post = useRecoilValue(getPostState);
  return (
    <div>
      <Backdrop onClick={handleClose}>
        {type === "dropIn" && (
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="rounded-xl flex flex-col justify-center bg-white dark:bg-[#1D2226] w-full md:-mt-24 max-w-lg mx-6"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/**top bar and cancel button */}
            <header className="flex items-center justify-between border-b border-gray-300 dark:border-white/75 px-4 py-2.5">
              <h4 className="text-xl">Create a post</h4>
              <IconButton onClick={handleClose}>
                <CloseRounded className="h-7 w-7 dark:text-white/75" />
              </IconButton>
            </header>

            <main className="p-4 space-x-2">
              <div className="flex items-center space-x-2">
                <Avatar src={data?.user?.image} />
                <h6>{data?.user?.name}</h6>
              </div>
            </main>
            {/**textarea, input, postButton */}
            <Form />
          </motion.div>
        )}

        {type === "gifYouUp" && (
          <motion.div
            className="modal rounded-l-lg rounded-r-lg flex mt-12 flex-col md:flex-row bg-[#1D2226] md:w-full md:max-w-6xl mx-3 md:mx-6"
            onClick={(e) => e.stopPropagation()}
            variants={gifYouUp}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.img
              alt=""
              onDoubleClick={handleClose}
              src={post.photoUrl}
              className="object-contain max-h-[50vh] md:max-h-[80vh] w-full md:max-w-md lg:max-w-xl xl:max-w-3xl rounded-l-lg"
            />
            <div className="w-full md:w-3/5 bg-white dark:bg-[#1D2226] rounded-r-lg ">
              <Post post={post} modalPost />
            </div>
          </motion.div>
        )}
      </Backdrop>
    </div>
  );
};

export default Modal;
