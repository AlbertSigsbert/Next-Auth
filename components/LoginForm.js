import { useState } from "react";
import Link from "next/link";


function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email,password);
  };

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-[80vh] lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border mt-4 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 font-montserrat md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create and account
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                />
              </div>

              
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Login
                </button>
             
             
              <p className="text-sm font-light text-gray-700 dark:text-gray-400">
                Don&apos;t have an account yet?{" "}
                <Link
                  href="/register"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Signup here
                </Link>
              </p>
            </form>
          </div>
        </div>
        {/* {error && (
          <div
            className="p-4 my-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
            role="alert"
          >
            <span className="font-medium">Error! </span>
            {error}
          </div>
        )} */}
      </div>
    </section>
  );
}

export default LoginForm;