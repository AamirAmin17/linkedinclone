import React from "react";
import Image from "next/image";
import ExploreIcon from "@mui/icons-material/Explore";
import GroupIcon from "@mui/icons-material/Group";
import OndemandVideoSharpIcon from "@mui/icons-material/OndemandVideoSharp";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import IntentComponent from "../components/IntentComponent";
import { getProviders, signIn } from "next-auth/react";
import HeaderLink from "../components/HeaderLink";

const Home = ({ providers }) => {
  const cloneProviders = {
    ...providers,
    facebook: {
      callbackUrl: "http://localhost:3000/api/auth/callback/google",
      id: "facebook",
      name: "Facebook",
      signinUrl: "http://localhost:3000/api/auth/signin/google",
      type: "oauth",
    },
  };
  console.log(cloneProviders);
  console.log(providers);
  return (
    <div className="px-7">
      <header className=" max-w-screen-xl mx-auto py-4">
        <div className="flex items-center justify-between">
          <div className="relative w-36 h-10">
            <Image
              src="https://rb.gy/vtbzlp"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <nav>
            <div className="flex items-center sm:divide-x divide-gray-300">
              <div className="hidden sm:flex space-x-12 pr-4">
                <HeaderLink text="Discover" Icon={ExploreIcon} />
                <HeaderLink text="People" Icon={GroupIcon} />
                <HeaderLink text="Learning" Icon={OndemandVideoSharpIcon} />
                <HeaderLink text="Jobs" Icon={BusinessCenterIcon} />
              </div>

              <div className="pl-4">
                <button
                  className="text-blue-700 font-semibold rounded-full border border-blue-700 px-5 py-1.5 transition-all hover:border-blue-700/50 "
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                >
                  Sign in with Google
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <main className="flex flex-col xl:flex-row items-center max-w-screen-xl mx-auto mt-7">
        <div className="space-y-6 xl:space-y-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-amber-800/80 lg:max-w-xl !leading-tight pl-4 xl:pl-0">
            Welcome to your professional community
          </h1>
          <div className="space-y-4">
            <IntentComponent
              text="Search for a job"
              Icon={ArrowForwardIosRoundedIcon}
            />
            <IntentComponent
              text="Find a person you know"
              Icon={ArrowForwardIosRoundedIcon}
            />
            <IntentComponent
              text="Learn a new skill"
              Icon={ArrowForwardIosRoundedIcon}
            />
          </div>
        </div>
        <div className="relative w-80 h-80 xl:w-[650px] xl:h-[650px] xl:absolute right-12 3xl:right-52  top-14">
          <Image src="https://rb.gy/vkzpzt" layout="fill" priority />
        </div>
      </main>
    </div>
  );
};

export default Home;

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
