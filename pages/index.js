import Head from "next/head";
import Image from "next/image";
import { signOut } from "next-auth/react";
export default function Home() {
  return (
    <div>
      <Head>
        <title>LinkedIn Clone</title>
        <meta name="LinkedIn Clone" content="Generated by next app" />
      </Head>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
