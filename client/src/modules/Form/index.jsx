import React from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync, signUpAsync } from "../../store/service/AuthService";
import { clearError } from "../../store/AuthSlice";

const Form = ({ isSignInPage = true }) => {
  const [data, setData] = useState({
    ...(!isSignInPage && { fullName: "" }),
    email: "",
    password: "",
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear any existing errors
    if (error) {
      dispatch(clearError());
    }
    
    try {
      let result;
      if (isSignInPage) {
        // Login
        result = await dispatch(loginAsync({
          email: data.email,
          password: data.password
        })).unwrap();
        
        if (result) {
          navigate('/');
        }
      } else {
        // Signup
        result = await dispatch(signUpAsync({
          fullName: data.fullName,
          email: data.email,
          password: data.password
        })).unwrap();
        
        if (result) {
          // Show success message or redirect to login
          alert('Account created successfully! Please login.');
          navigate('/user/login');
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      // Error is handled by Redux, no need to do anything here
    }
  };

  // Clear errors when user starts typing
  const handleInputChange = (field, value) => {
    if (error) {
      dispatch(clearError());
    }
    setData({ ...data, [field]: value });
  };

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
        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">
            {error}
          </div>
        )}
        <form
          className="flex flex-col justify-center w-full items-center"
          onSubmit={handleSubmit}
        >
          {!isSignInPage && (
            <Input
              name={"name"}
              label={"Full Name"}
              placeholder="Enter your first name"
              className={"mb-6"}
              isRequired={false}
              value={data.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
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
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
          <Input
            name={"password"}
            label={"Password"}
            type="password"
            placeholder="Enter your password"
            className={"mb-6"}
            isRequired={true}
            value={data.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
          />
          <Button
            type="submit"
            label={isSignInPage ? (loading ? "Logging in..." : "Login") : (loading ? "Creating Account..." : "Create Account")}
            disabled={loading}
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
