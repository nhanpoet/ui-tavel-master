import facebookSvg from "images/Facebook.svg";
import googleSvg from "images/Google.svg";
import twitterSvg from "images/Twitter.svg";
import Cookies from "js-cookie";
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import swal from "sweetalert";

export interface PageLoginProps {
  className?: string;
}

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

export default class PageLogin extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      userEmail: "",
      userPassword: "",
    };
  }

  setParams = (event: any) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  login = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("userEmail", this.state.userEmail);
    urlencoded.append("userPassword", this.state.userPassword);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    fetch("http://localhost:8080/api/login_user", requestOptions)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        Cookies.set("auth", responseData[0].userId);
        return this.props.history.push(`/`);
      })
      .then((result) => {
        console.log(result);
        swal("Oops", "Login Success", "success");
      })
      .catch((error) => {
        console.log("error", error);
        swal("Oops", "Email or Password not found", "error");
      });
  };

  render() {
    return (
      <div className={`nc-PageLogin`} data-nc-id="PageLogin">
        <Helmet>
          <title>Login || Booking React Template</title>
        </Helmet>
        <div className="container mb-24 lg:mb-32">
          <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
            Login
          </h2>
          <div className="max-w-md mx-auto space-y-6">
            <div className="grid gap-3">
              {loginSocials.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
                >
                  <img
                    className="flex-shrink-0"
                    src={item.icon}
                    alt={item.name}
                  />
                  <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                    {item.name}
                  </h3>
                </a>
              ))}
            </div>
            {/* OR */}
            <div className="relative text-center">
              <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
                OR
              </span>
              <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
            </div>
            {/* FORM */}
            <form className="grid grid-cols-1 gap-6">
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Email address
                </span>
                <Input
                  type="email"
                  name="userEmail"
                  onChange={this.setParams}
                  placeholder="example@example.com"
                  className="mt-1"
                />
              </label>
              <label className="block">
                <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                  Password
                  <Link to="/forgot-pass" className="text-sm">
                    Forgot password?
                  </Link>
                </span>
                <Input
                  type="password"
                  name="userPassword"
                  onChange={this.setParams}
                  className="mt-1"
                />
              </label>
              <ButtonPrimary type="button" onClick={this.login}>
                Continue
              </ButtonPrimary>
            </form>

            {/* ==== */}
            <span className="block text-center text-neutral-700 dark:text-neutral-300">
              New user? {` `}
              <Link to="/signup">Create an account</Link>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
