import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

function Navbar(props) {
  const router = useRouter();

  const { data: session } = useSession();

  const logoutHandler = () => {
      signOut();
  }
  
  return (
    <header className="shadow py-2">
      <nav className="mx-[6%] my-6 flex space-y-4 font-montserrat md:space-y-0 md:flex-row justify-between items-center">
        <Link href="/" className="font-bold">
          NextAuth
        </Link>
        <ul className="flex space-x-6">
          {!session && (
            <li>
              <Link
                href="/register"
                className={
                  router.pathname == "/register"
                    ? "font-semibold underline"
                    : ""
                }
              >
                Register
              </Link>
            </li>
          )}
          {!session && (
            <li>
              <Link
                href="/login"
                className={
                  router.pathname == "/login" ? "font-semibold underline" : ""
                }
              >
                Login
              </Link>
            </li>
          )}

          {session && (
            <li>
              <Link
                href="/profile"
                className={
                  router.pathname == "/profile" ? "font-semibold underline" : ""
                }
              >
                Profile
              </Link>
            </li>
          )}

          {session && (
            <li className="text-gray-700 text-base">
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
