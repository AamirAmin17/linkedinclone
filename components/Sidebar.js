import { AddRounded, BookmarkOutlined } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import Image from "next/image";
import React from "react";
import { signOut, useSession } from "next-auth/react";

const Sidebar = () => {
  const { data } = useSession();

  return (
    <>
      <aside className="space-y-2 min-w-max max-w-lg">
        <section>
          {/**Top */}
          <div className="bg-white dark:bg-[#1D2226] rounded-lg overflow-hidden relative flex flex-col items-center text-center border border-gray-300 dark:border-none">
            <div className="relative w-full h-14">
              <Image src="https://rb.gy/i26zak" layout="fill" priority />
            </div>
            <Avatar
              src={data?.user?.image}
              className="!h-14 !w-14 !border-2 !absolute !top-4 !cursor-pointer"
            />
            <div className="mt-5 py-4 space-x-0.5">
              <h4
                className="hover:underline decoration-gray-400 underline-offset-2 cursor-pointer"
                onClick={() => signOut()}
              >
                {data?.user?.name}
              </h4>
              <p className="text-black/60 dark:text-white/75 text-sm">
                {data?.user?.email}
              </p>
            </div>

            <div className="hidden md:inline text-left dark:text-white/75 text-sm">
              <section>
                <div className="font-medium sidebarButton space-y-0.5">
                  <div className="flex justify-between space-x-2">
                    <h4>Who viewed your profile</h4>
                    <span className="text-blue-500">321</span>
                  </div>
                  <div className="flex justify-between space-x-2">
                    <h4>Views of your post</h4>
                    <span className="text-blue-500">1,892</span>
                  </div>
                </div>
              </section>
              <section>
                <div className="sidebarButton">
                  <h4 className="font-medium dark:text-white">
                    <span className="h-3 w-3 inline-flex rounded-sm bg-gradient-to-tr from-yellow-700 to-yellow-200 mr-1" />
                    Try Premium for free
                  </h4>
                </div>
              </section>

              <section>
                <div className="sidebarButton flex items-center space-x-1">
                  <BookmarkOutlined />
                  <h4>My Items</h4>
                </div>
              </section>
            </div>
          </div>
        </section>
        {/**Bottom */}

        <div className="hidden md:flex bg-white dark:bg-[#1D2226] rounded-lg flex-col space-y-2 pt-2.5 sticky top-20 border border-gray-300 dark:border-none">
          <p className="siderLink">Groups</p>
          <div className="flex items-center justify-between">
            <p className="siderLink">Events</p>
            <AddRounded className="!h-5" />
          </div>
          <p className="siderLink">Followd Hashtags</p>
          <section>
            <div className="sidebarButton text-center">
              <h4>Discover More</h4>
            </div>
          </section>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
