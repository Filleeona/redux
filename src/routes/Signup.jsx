import { useState } from "react";
import { z } from "zod";
import { User } from "../utils/validation";
import { useNavigate } from "react-router-dom";
import API from "../utils/API";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();

  function handleSignUp() {
    let user = {};
    try {
      user = User.parse({
        email,
        password,
        date: Date.now(),
      });
      setErrors(null);
      if (password !== repeatedPassword) {
        setPasswordError("Passwords don't match");
        return;
      } else {
        setPasswordError("");
      }
      if (!errors && !passwordError) {
        API.postUser(user).then((user) => {
          if (user) {
            navigate("/login");
          }
        });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.format());
      }
    }
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="prose flex flex-col gap-5 w-3/4 items-center">
        <h1>Sign up</h1>
        <div className="w-[100%] flex flex-col gap-5">
          <div>
            <input
              className="rounded-xl p-2 border border-gray-300 w-full"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            {errors?.email && (
              <div className="text-red-500">{errors?.email?._errors}</div>
            )}
          </div>
          <div>
            <input
              className="rounded-xl p-2 border border-gray-300 w-full"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            {errors?.password && (
              <div className="text-red-500">{errors?.password?._errors}</div>
            )}
          </div>
          <div>
            <input
              className="rounded-xl p-2 border border-gray-300 w-full"
              placeholder="Repeat password"
              type="password"
              value={repeatedPassword}
              onChange={(e) => setRepeatedPassword(e.target.value)}
            ></input>
            {password !== repeatedPassword && (
              <div className="text-red-500">{passwordError}</div>
            )}
          </div>
        </div>
        <button
          className="flex items-center justify-center w-[100px] h-8 rounded-xl p-2 border border-black hover:bg-black hover:text-white"
          placeholder="password"
          onClick={handleSignUp}
        >
          Sign up
        </button>
      </div>
    </div>
  );
}
