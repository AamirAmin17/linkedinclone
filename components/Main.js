import { AnimatePresence } from "framer-motion";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState, modalTypeState } from "../atoms/modalAtom";
import Feed from "./Feed";
import Modal from "./Modal";
import Sidebar from "./Sidebar";

const Main = () => {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const modalType = useRecoilValue(modalTypeState);

  console.log("modal type", modalType);
  // const [modalType] = useRecoilValue();
  return (
    <main className="flex justify-center gap-x- px-4 sm:px-12">
      <div className="flex flex-col md:flex-row gap-5">
        {/**Sidebar */}
        <Sidebar />

        {/**Feed */}
        <Feed />
        <AnimatePresence initial={false} exitBeforeEnter={true}>
          {modalOpen && (
            <Modal handleClose={() => setModalOpen(false)} type={modalType} />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default Main;
