import { useContext } from "react";

import ErrorContext from "../context/ErrorContext";

interface Props {
  styles?: string;
}

const Pencil = ({ styles }: Props) => {
  const { active } = useContext(ErrorContext);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`w-5 h-5 mr-1 mt-1 ${
        active
          ? "stroke-gray-300 hover:stroke-gray-300 dark:stroke-gray-600 dark:hover-stroke-gray-600"
          : "stroke-gray-600 hover:stroke-gray-900 dark:stroke-gray-300 dark:hover:stroke-gray-400"
      } ${styles}`}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
      />
    </svg>
  );
};

export default Pencil;
