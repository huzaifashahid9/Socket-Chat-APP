import React from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useState } from "react";
import { Link } from "react-router-dom";

const Form = ({ isSignInPage = true }) => {
  const [data, setData] = useState({
    ...(!isSignInPage && { fullName: "" }),
    email: "",
    password: "",
  });

  console.log("Data===> ", data);
  return (
    <div className="bg-white h-screen flex items-center justify-center">
      <div className="bg-white w-[600px] h-[600px] rounded-lg shadow-lg flex flex-col justify-center items-center">
        <div className="text-4xl font-extrabold">
          Welcome {isSignInPage && "BacK"}{" "}
        </div>
        <div className="text-xl font-light mb-14">
          {isSignInPage ? "Sign in to get explored" : "Sign up to get started"}
        </div>
        <form
          className="flex flex-col justify-center w-full items-center"
          onSubmit={() => console.log("Hello Form Submitted")}
        >
          {!isSignInPage && (
            <Input
              name={"name"}
              label={"Full Name"}
              placeholder="Enter your first name"
              className={"mb-6"}
              isRequired={false}
              value={data.fullName}
              onChange={(e) => setData({ ...data, fullName: e.target.value })}
            />
          )}
          <Input
            name={"email"}
            label={"Email"}
            placeholder="Enter your email"
            className={"mb-6"}
            isRequired={true}
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <Input
            name={"password"}
            label={"Password"}
            type="password"
            placeholder="Enter your password"
            className={"mb-6"}
            isRequired={true}
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <Button
            type="submit"
            label={isSignInPage ? "Login" : "Create Account"}
            onClick={() => console.log("Login Signup Clicked")}
            className={"w-3/5 mt-4"}
          />
        </form>

        <div className="mt-2">
          {isSignInPage ? "Don't have an account?" : "Already have an account?"}{" "}
          <span className="text-blue-800 cursor-pointer underline">
            <Link to={isSignInPage ? "/user/sign_up" : "/user/login"}>
              {isSignInPage ? "Create Account" : "Login"}
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Form;
