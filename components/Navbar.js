import Link from "next/link";
import { useRouter } from "next/router";

function Navbar(props) {
  const router = useRouter();

  return (
    <header className="shadow py-2">
      <nav className="mx-[6%] my-6 flex space-y-4 font-montserrat md:space-y-0 md:flex-row justify-between items-center">
        <Link href="/" className="font-bold">
          NextAuth
        </Link>
        <ul className="flex space-x-6">
          {/* <li>
            <Link
              href="/register"
              className={
                router.pathname == "/register" ? "font-semibold underline" : ""
              }
            >
              Register
            </Link>
          </li> */}
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

          <li className="text-gray-700 text-base">
            <button>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
