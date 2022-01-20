import { Avatar } from "@mui/material";
import React from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  Article,
  PhotoSizeSelectActual,
  VideoCameraBack,
} from "@mui/icons-material";
import BusinessCenter from "@mui/icons-material/BusinessCenter";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../atoms/modalAtom";

const Input = () => {
  const { data } = useSession();
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  return (
    <div className="bg-white dark:bg-[#1D2226] rounded-lg p-3 space-y-3 border border-gray-300 dark:border-none">
      <div className="flex items-center space-x-2">
        <Avatar src={data?.user?.image} />
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="rounded-full border border-gray-400 py-2.5 px-3 opacity-80 hover:opacity-100 w-full font-medium"
          onClick={() => {
            setModalOpen(true);
            setModalType("dropIn");
          }}
        >
          Start a post
        </motion.button>
      </div>
      <div className="flex items-center gap-4 justify-center md:gap-x-10 flex-wrap">
        <button className="inputButton group">
          <PhotoSizeSelectActual className="text-blue-400" />
          <h4 className="opacity-80 group-hover:opacity-100">Photo</h4>
        </button>
        <button className="inputButton group">
          <VideoCameraBack className="text-green-400" />
          <h4 className="opacity-80 group-hover:opacity-100">Video</h4>
        </button>
        <button className="inputButton group">
          <BusinessCenter className="text-blue-300" />
          <h4 className="opacity-80 group-hover:opacity-100">Job</h4>
        </button>
        <button className="inputButton group">
          <Article className="text-red-400" />
          <h4 className="opacity-80 group-hover:opacity-100">Write Article</h4>
        </button>
      </div>
    </div>
  );
};

export default Input;