import Info from "../../icons/Info";
import { InputIdsEnum } from "../../models/forms";

interface Props {
  id: string;
}

const Tooltip = ({ id }: Props) => {
  return (
    <div className={`tip-${id} relative`}>
      <Info />
      <div
        className={`text-${id} invisible opacity-0 absolute z-10 border-gray-900 border rounded mt-1 p-4 top-[1.75rem] left-[calc(50%-13rem)] bg-white dark:bg-sky-800 dark:border-none text-sm w-56 after:content-[' '] after:absolute after:w-4 after:h-4 after:border-gray-900 after:border-t after:border-l after:rotate-45 after:bottom-[calc(100%-0.45rem)] after:right-2 after:bg-white dark:after:bg-sky-800 dark:after:border-none`}>
        {id === InputIdsEnum.regName && (
          <div>
            <p>Nicknames are optional and can be 1-18 characters long.</p>
          </div>
        )}
        {id === InputIdsEnum.regPass && (
          <div>
            <p>Passwords must have:</p>
            <ul className="list-disc mt-2">
              <li className="ml-4">At least 8 characters</li>
              <li className="ml-4">1 lower case letter</li>
              <li className="ml-4">1 upper case letter</li>
              <li className="ml-4">1 number</li>
              <li className="ml-4">1 symbol: *@#^&$!%</li>
            </ul>
          </div>
        )}
        {id === InputIdsEnum.newListName && (
          <div>
            <p>List names can be 1-18 characters long.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tooltip;
