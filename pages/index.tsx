import { AuthContext } from "@/components/AuthProvider/authContext";
import Loading from "@/components/Loading/Loading";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

export default function Home() {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  }, [currentUser, router]);

  return (
    <>
      <Head>
        <title>Boiler Plate Web Front</title>
        <meta
          name="description"
          content="Template project for creating serverless web apps using Google Firebase and MUI."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Loading />
    </>
  );
}
