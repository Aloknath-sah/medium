import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignUpInput } from "@sahalok123/common-app";
import axios from 'axios';
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignUpInput>({
    name: "",
    username: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup": "signin"}`, postInputs)
      
      const jwt = response.data.jwt;
      console.log("jwt", jwt)
      localStorage.setItem("token", jwt);
      navigate("/blogs")
    }
    catch(e) {
      //alert the request is failed 
      console.log("error in authentication", e)
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="text-2xl font-bold">{type === "signup" ?  "Create an account" : "Sign in to your account"}</div>
          <div>
            {type === "signin" ? "Don't have an account": "already have an account?" } 
            <Link className="pl-2" to={ type === "signin" ? "/signup" : "/signin"}>
              {type === "signin" ? "Sign up" : "Sign In"}
            </Link>{" "}
          </div>
          <div className="mt-5">
            <LabelledInput
              label="name"
              placeholder="name"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  name: e.target.value,
                });
              }}
            />
            <LabelledInput
              label="Username"
              placeholder="email or username"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  username: e.target.value,
                });
              }}
            />
            <LabelledInput
              label="Password"
              type={"password"}
              placeholder="password"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <button
              onClick={sendRequest}
              type="button"
              className="w-full mt-5 text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type === "signup" ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputTypes {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputTypes) {
  return (
    <div>
      <div>
        <label className="block text-sm/6 font-medium text-gray-900">
          {label}
        </label>
        <div className="mt-2">
          <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
            <input
              onChange={onChange}
              name={label.toLowerCase()}
              id={label.toLowerCase()}
              className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              placeholder={placeholder}
              type={type || "text"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
