import { MouseEvent } from "react";

interface AuthbuttonInterface {
    buttonVal: string;
    onClick: (e: MouseEvent<HTMLButtonElement>)=>void;
}
const AuthButton = ({buttonVal, onClick}: AuthbuttonInterface) => {
  return (
    <div className="h-full flex flex-col justify-end">
      <button type="button" onClick={onClick} className="text-white w-full bg-black hover:bg-black focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{buttonVal}</button>
      </div>
  )
}

export default AuthButton
