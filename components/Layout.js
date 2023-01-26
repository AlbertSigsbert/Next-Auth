import Head from "next/head";
import Navbar from "./Navbar";

function Layout(props) {
  return (
    <>
      <Head>
        <title>Next Auth</title>
        <meta name="description" content="Next App to perform user auth" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main className="relative min-h-[80%]">{props.children}</main>
      <footer className=" mx-auto text-center my-4">
        <p className="text-[14px] font-montserrat font-medium">
          &copy;2023
        </p>
      </footer>
    </>
  );
}

export default Layout;
