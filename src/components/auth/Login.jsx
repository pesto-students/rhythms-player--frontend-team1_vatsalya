import React, { useState } from "react";
import "../../assets/css/auth.css";
import swal from "sweetalert";
import axios from "axios";
import { API } from "../../config/APIConfig";
import { useNavigate } from "react-router-dom";
const LOGINAPI = `${API.URL}/api/${API.VERSION}/login`;

const Login = () => {
  const navigate = useNavigate();
  const [loginObj, setLoginObj] = useState({});

  const handleInpChange = (e) => {
    const field = e.target.id;
    const value = e.target.value;
    setLoginObj((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    debugger;
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .post(LOGINAPI, loginObj, {
        headers: headers,
      })
      .then((response) => {
        console.log(response, "userLogin");
        if (response?.status === 200) {
          if (response?.data?.length != 0) navigate("/home", { replace: true });
          else {
            swal("Login Failed", "Please Try Again", "error", {
              closeOnClickOutside: false,
              closeOnEsc: false,
            });
          }
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        swal("Login Failed", "Please Try Again", "error", {
          closeOnClickOutside: false,
          closeOnEsc: false,
        });
      });
  };
  return (
    <section className="bg-gray-50 w-screen z-10   absolute top-0 left-0 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          {/* <img
            className="w-8 h-8 mr-2"
            src=""
            alt="logo"
          /> */}
          Rhythms
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Email Address"
                  required=""
                  onChange={handleInpChange}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="pwd"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  onChange={handleInpChange}
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
