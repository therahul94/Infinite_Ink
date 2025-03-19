import { MouseEvent } from "react";

interface AuthbuttonInterface {
    buttonVal: string;
    onClick: (e: MouseEvent<HTMLButtonElement>)=>void;
}
const AuthButton = ({buttonVal, onClick}: AuthbuttonInterface) => {
  return (
    <div>
      <button type="button" onClick={onClick} className="text-white w-full bg-black hover:bg-black focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-black dark:hover:bg-black dark:focus:ring-black dark:border-black">{buttonVal}</button>
    </div>
  )
}

export default AuthButton
