import React, { useState } from "react";
import Image from "next/image";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import GroupIcon from "@mui/icons-material/Group";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import { Avatar } from "@mui/material";
import HeaderLink from "./HeaderLink";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import dropDownScss from "./header.module.scss";
import { signOut } from "next-auth/react";
import { CircularProgress } from "@mui/material";
const spring = {
  type: "spring",
  shiffness: 700,
  damping: 15,
};

const Header = () => {
  const [mounted, setMounted] = React.useState(false);
  const { setTheme, resolvedTheme, theme } = useTheme();
  const [spinner, setSpinner] = useState(false);
  console.log("spinner: ", spinner);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-[#1D2226] flex items-center justify-around focus-within:shadow-lg py-2.5 px-4">
      {/**Left */}
      <div className="flex items-center space-x-2 w-full max-w-xs  ">
        {mounted && (
          <>
            {resolvedTheme === "dark" ? (
              <Image src="https://rb.gy/bizvqj" width={45} height={45} />
            ) : (
              <Image src="https://rb.gy/dpmd9s" width={55} height={55} />
            )}
          </>
        )}
        <div className="flex items-center space-x-1 dark:md:bg-gray-700 py-2.5 px-4 rounded w-full">
          <SearchRoundedIcon />

          <input
            type="text"
            placeholder="Search"
            className="hidden md:inline-flex  bg-transparent text-sm focus:outline-none placeholder-black/70 dark:placeholder-white/75 flex-grow"
          />
        </div>
      </div>
      {/**Right */}
      <nav>
        <div className="flex items-center space-x-6">
          <HeaderLink Icon={HomeRoundedIcon} text={"Home"} feed active />
          <HeaderLink Icon={GroupIcon} text={"My Network"} feed />
          <HeaderLink Icon={BusinessCenterIcon} text={"Jobs"} feed hidden />
          <HeaderLink Icon={ChatIcon} text={"Messaging"} feed />
          <HeaderLink Icon={NotificationsIcon} text={"Notifications"} feed />

          <div className={dropDownScss.dropDown}>
            <HeaderLink Icon={Avatar} text={"Me"} feed avatar />
            <div className={`${dropDownScss.dropdownContent}`}>
              <div
                className={`${dropDownScss.signOut} md:top-4 top-5 `}
                onClick={async () => {
                  setSpinner((prev) => !prev);
                  await signOut();
                  setSpinner((prev) => !prev);
                }}
              >
                <div className="flex items-center gap-3">
                  {spinner ? <CircularProgress /> : ""}
                  <p className="whitespace-nowrap"> Sign out</p>
                </div>
              </div>
            </div>
          </div>

          <HeaderLink Icon={AppsOutlinedIcon} text={"Work"} feed hidden />

          {/**Dark Mode toggle */}
          {mounted && (
            <div
              className={`flex items-center w-16 bg-gray-600 rounded-full cursor-pointer p-1 relative ${
                resolvedTheme === "dark" ? "justify-end" : "justify-start"
              }`}
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
            >
              <span className="absolute left-0.5 select-none">🌜</span>
              <motion.div
                className="w-5 h-5 bg-white rounded-full z-10"
                layout
                transition={spring}
              />
              <span className="absolute right-0.5 select-none">☀️</span>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
