import React, { FC, useContext, useState } from "react";
import Logo from "shared/Logo/Logo";
import MenuBar from "shared/MenuBar/MenuBar";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import NotifyDropdown from "./NotifyDropdown";
import AvatarDropdown from "./AvatarDropdown";
import DropdownTravelers from "./DropdownTravelers";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Cookies from "js-cookie";

export interface MainNav2Props {
  isTop: boolean;
}

const MainNav2: FC<MainNav2Props> = ({ isTop }) => {
  const auth = Cookies.get("auth");

  return (
    <div
      className={`nc-MainNav1 nc-MainNav2 relative z-10 ${
        isTop ? "onTop " : "notOnTop backdrop-filter"
      }`}
    >
      <div className="container py-5 relative flex justify-between items-center space-x-4 xl:space-x-8">
        <div className="flex justify-start flex-grow items-center space-x-3 sm:space-x-8 lg:space-x-10">
          <Logo />
          <div className="hidden sm:block h-10 border-l border-neutral-300 dark:border-neutral-500"></div>
          <div className="hidden sm:block">
            <DropdownTravelers />
          </div>
        </div>
        <div className="flex-shrink-0 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1">
          <div className="hidden items-center xl:flex space-x-1">
            <div></div>
            <SwitchDarkMode />
            <NotifyDropdown />
            <div></div>
            {auth ? <AvatarDropdown /> : null}

            <div className="px-1" />
            {auth ? "" : <ButtonPrimary href="/login">Sign up</ButtonPrimary>}
          </div>
          <div className="flex items-center space-x-4 xl:hidden">
            <NotifyDropdown />
            {auth ? <AvatarDropdown /> : null}
            <MenuBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav2;
