import { getServerSession } from "next-auth/next";
import { useRef, useState } from "react";
import { authOptions } from "./api/auth/[...nextauth]";

function Profile(props) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  async function handleSubmit(event) {
    event.preventDefault();

    const oldPassword = oldPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;

    //Client validation
    if (newPassword.trim().length < 8) {
      setError("Password should atleast have 8 characters");
      return;
    }

    //Send req to api
    
      const response = await fetch('/api/user/change-password',{
        method:'PATCH',
        body:JSON.stringify({
          oldPassword,
          newPassword
        }),
        headers:{
          'Content-Type':'application/json'
        }
    });

    if (!response.ok) {
     const err = await response.json();
     setError(err.message);
      return;
    }

    const data  = await response.json();

    setSuccess(data.message)
      
    
   
  }

  return (
    <div className="mx-[6%] my-16">
      <h1 className="text-center text-2xl font-bold">Profile</h1>
      <form className="w-1/2 mx-auto" onSubmit={handleSubmit}>
        <h1 className="text-center my-4 text-2xl">Change your password</h1>
        <div className="mb-6">
          <label
            htmlFor="New Password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            New Password
          </label>
          <input
            type="password"
            id="New Password"
            ref={newPasswordRef}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="Old Password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Old Password
          </label>
          <input
            type="password"
            id="Old Password"
            ref={oldPasswordRef}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>

      {error && (
        <div
          className="w-1/2 mx-auto p-4 my-8 text-sm text-red-800 rounded-lg bg-red-50"
          role="alert"
        >
          <span className="font-medium px-2">Error!</span>{error}
        </div>
      )}

      {success && (
        <div
          className="w-1/2 mx-auto p-4 my-8 text-sm text-green-800 rounded-lg bg-green-50"
          role="alert"
        >
          <span className="font-medium px-2">Success!</span>{success}
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

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
      session: JSON.parse(JSON.stringify(session)),
    },
  };
}

export default Profile;
