import { useContext } from "react";

import ErrorContext from "../context/ErrorContext";

const Queue = () => {
  const { active } = useContext(ErrorContext);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`w-5 h-5 stroke-gray-600 mr-1 ml-3 mt-1 ${
        active
          ? "stroke-gray-300 hover:stroke-gray-300 dark:stroke-gray-600 dark:hover:stroke-gray-600"
          : "stroke-gray-600 hover:stroke-gray-900 dark:stroke-gray-400 dark:hover:stroke-gray-300"
      }`}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
      />
    </svg>
  );
};

export default Queue;
