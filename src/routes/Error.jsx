import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserId } from "../redux/user/selectors";

export default function Error() {
  const id = useSelector(selectUserId);
  return (
    <div className="h-[100%] w-[100%] flex items-center justify-center flex-col gap-5">
      <div className="prose flex flex-col items-center gap-5">
        <span className=" text-3xl">404</span>
        <h1>Page not found</h1>
        <div className="flex items-center text-2xl">
          <span className="text-gray-400">Go&nbsp;</span>
          {id ? (
            <NavLink
              className={({ isActive }) =>
                isActive ? "navLinkActive" : "navLink"
              }
              to="/home"
            >
              Home
            </NavLink>
          ) : (
            <NavLink
              className={({ isActive }) =>
                isActive ? "navLinkActive" : "navLink"
              }
              to="/login"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}
