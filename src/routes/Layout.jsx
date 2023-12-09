import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/user/selectors";

export default function Layout() {
  const user = useSelector(selectUser);
  return (
    <div className="h-screen overflow-hidden">
      {location.pathname !== "/" && location.pathname !== "/login" ? (
        <header className="w-[99%] h-[3%] pt-[20px] pr-[20px] flex justify-between">
          <h1 className="ml-[5%]">Hello, {user?.email}</h1>
          <div className="flex justify-end gap-5">
            <NavLink
              className={({ isActive }) =>
                isActive ? "navLinkActive" : "navLink"
              }
              to="/home"
            >
              About
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "navLinkActive" : "navLink"
              }
              to="/notes"
              end={true}
            >
              Notes
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "navLinkActive" : "navLink"
              }
              to="/login"
              end={true}
            >
              Log out
            </NavLink>
          </div>
        </header>
      ) : (
        <header className="h-[3%]"></header>
      )}
      <main className="h-[90%]">
        <Outlet />
      </main>
      <footer className="relative">
        <hr />
        <div className="footerText">
          <span>Created by: Pavlova Darya</span>
          <span>BSU: 2023</span>
        </div>
      </footer>
    </div>
  );
}
