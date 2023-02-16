import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";

// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";

function Profile(props) {
  //CLIENT SIDE ROUTE GUARDING
  //   const router = useRouter();
  //   const { status } = useSession({
  //     required: true,
  //     onUnauthenticated() {
  //       router.push("/login");
  //     },
  //   });

  //   if (status === "loading") {
  //     return <p>Loading...</p>;
  //   }

  return (
    <div className="mx-[6%] my-16">
      <h1 className="text-center text-2xl font-bold">Profile</h1>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req,context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session:JSON.parse(JSON.stringify(session))
    },
  };
}

export default Profile;
