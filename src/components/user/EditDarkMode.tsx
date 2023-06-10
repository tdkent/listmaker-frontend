import { useState, useEffect } from "react";
import Button from "../forms/Button";
import Sun from "../../icons/Sun";
import Moon from "../../icons/Moon";
import Cog from "../../icons/Cog";
import { CustomStylesEnum } from "../../models/styles";

interface Props {
  setEditDarkMode: (value: React.SetStateAction<boolean>) => void;
}

const EditDarkMode = ({ setEditDarkMode }: Props) => {
  const handleLightClick = () => {
    setEditDarkMode(false);
    console.log("light");
  };
  const handleDarkClick = () => {
    setEditDarkMode(false);
    console.log("dark");
  };
  const handleSystemClick = () => {
    setEditDarkMode(false);
    console.log("system");
  };
  // const handleCancel = () => {
  //   setEditDarkMode(false);
  // };
  return (
    <div className="mb-8">
      <span className="text-lg font-medium mr-4 lg:mr-12">Change Visual Preference</span>
      <div className="w-1/2 mt-4">
        <div className="flex flex-row items-center rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900">
          <Button
            type="button"
            text={<Sun styles="w-7 h-7" />}
            handleClick={handleLightClick}
            styles="px-2 py-3"
            divStyles="mr-4"
          />
          <span className="">Light</span>
        </div>
        <div className="flex flex-row items-center rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900">
          <Button
            type="button"
            text={<Moon styles="w-7 h-7" />}
            handleClick={handleDarkClick}
            styles="p-2 py-3"
            divStyles="mr-4"
          />
          <span>Dark</span>
        </div>
        <div className="flex flex-row items-center rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900">
          <Button
            type="button"
            text={<Cog styles="w-7 h-7" />}
            handleClick={handleSystemClick}
            styles="p-2 py-3"
            divStyles="mr-4"
          />
          <span>System</span>
        </div>
      </div>
      {/* <Button
        type="button"
        text="Cancel"
        handleClick={handleCancel}
        styles={`${CustomStylesEnum.btnCancel} lg:mb-0`}
      /> */}
    </div>
  );
};

export default EditDarkMode;
