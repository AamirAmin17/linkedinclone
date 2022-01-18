import React from "react";
import Feed from "./Feed";
import Sidebar from "./Sidebar";
const Main = () => {
  return (
    <main className="flex justify-center gap-x- px-4 sm:px-12">
      <div className="flex flex-col md:flex-row gap-5">
        {/**Sidebar */}
        <Sidebar />

        {/**Feed */}
        <Feed />
      </div>
    </main>
  );
};

export default Main;
