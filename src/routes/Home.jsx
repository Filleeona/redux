import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/user/selectors";

export default function Home() {
  const user = useSelector(selectUser);

  function formatMilliseconds(userDate) {
    const date = new Date(userDate);
    return date.toLocaleDateString().replace(/[,]/g, "");
  }

  const formattedDate = formatMilliseconds(user.date);

  return (
    <div className="h-[100%] w-[100%] flex items-center justify-center flex-col gap-5">
      <div className="prose flex flex-col items-center gap-5">
        <h1>About me</h1>
        <div className="flex flex-col items-center">
          <div className="text-2xl">
            <span className="text-black font-medium">Email:&nbsp;</span>
            <span className=" text-gray-400">{user.email}</span>
          </div>
          <div className="text-2xl">
            <span className="text-black font-medium">Sign up date:&nbsp;</span>
            <span className=" text-gray-400">{formattedDate}</span>
          </div>
        </div>
        <NavLink
          className="no-underline mt-[40%] flex items-center justify-center w-[150px] h-8 rounded-xl p-2 border border-black hover:bg-black hover:text-white"
          to="/notes"
        >
          Go to notes
        </NavLink>
      </div>
    </div>
  );
}
