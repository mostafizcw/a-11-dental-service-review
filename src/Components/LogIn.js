import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider/AuthProvider";
import useTitle from "../Hooks/useTitle";

const LogIn = () => {
  const [error, setError] = useState("");
  const { loginWithEmail, signInProvider } = useContext(AuthContext);

  // dynamic title
  useTitle("Login");

  // jump others page after log in
  const navigate = useNavigate();

  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/";
  // event handeler

  // log in with email and password
  const handleLogin = (event) => {
    event.preventDefault();
    setError("");
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    console.log(email, password);

    loginWithEmail(email, password)
      .then((result) => {
        console.log(result.user);
        // navigate(from, { replace: true });
        navigate('/');
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  // google auth provider
  const googleProvider = new GoogleAuthProvider();

  // log in with google
  const signInWithGoogle = () =>{
    signInProvider(googleProvider)
    .then(result => {
      const user = result.user;
      console.log(user);
      navigate('/');
    })
    .catch(err => {
      setError(err.message);
    })

  }

  return (
    <div>
      <div className="m-auto xl:container px-12 sm:px-0 mx-auto">
        <div className="mx-auto h-full sm:w-max">
          <div className="m-auto  py-12">
            {/* <h3 className="text-center">Please Log In</h3> */}
            <div className="mt-12 rounded-3xl border bg-gray-50 dark:border-gray-700 dark:bg-gray-800 -mx-6 sm:-mx-10 p-8 sm:p-10">
              <h3 className="md:text-4xl font-semibold text-gray-700 dark:text-white">
                Login to your account
              </h3>
              <div className="mt-12 grid">
                <button onClick={signInWithGoogle} className="w-full h-11 rounded-full border border-gray-300/75 bg-white px-6 transition active:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:border-gray-700">
                  <div className="w-max mx-auto flex items-center justify-center space-x-4">
                    <img
                      src="https://svgshare.com/i/ng7.svg"
                      className="w-5"
                      alt=""
                    />
                    <span className="block w-max text-sm font-semibold tracking-wide text-cyan-700 dark:text-white">
                      With Google
                    </span>
                  </div>
                </button>
                {/* <button className="w-full h-11 rounded-full bg-gray-900 px-6 transition hover:bg-gray-800 focus:bg-gray-700 active:bg-gray-600 dark:bg-gray-700 dark:border dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:border-gray-700">
                  <div className="w-max mx-auto flex items-center justify-center space-x-4 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="w-5"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                    <span className="block w-max text-sm font-semibold tracking-wide text-white">
                      With Github
                    </span>
                  </div>
                </button> */}
              </div>
              <form
                onSubmit={handleLogin}
                className="mt-10 space-y-8 dark:text-white"
              >
                <div>
                  <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                    <input
                      required
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none transition"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                    <input
                      required
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Your Password"
                      className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none transition"
                    />
                  </div>
                  <small className="text-red-600">{error}</small>

                  <button type="reset" className="-mr-3 w-max p-3">
                    <span className="text-sm tracking-wide text-sky-600 dark:text-sky-400">
                      Forgot password ?
                    </span>
                  </button>
                </div>
                <div>
                  <button className="w-full rounded-full bg-sky-500 dark:bg-sky-400 h-11 flex items-center justify-center px-6 py-3 transition hover:bg-sky-600 focus:bg-sky-600 active:bg-sky-800">
                    <span className="text-base font-semibold text-white dark:text-gray-900">
                      Login
                    </span>
                  </button>
                  <Link to="/signup">
                    <button href="#" type="reset" className="-ml-3 w-max p-3">
                      <span className="text-sm tracking-wide text-sky-600 dark:text-sky-400">
                        Don’t have an account? Sign Up
                      </span>
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
