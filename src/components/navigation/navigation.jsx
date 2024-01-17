import { Link, useLocation } from "react-router-dom";
import { updateUserRole } from "../../utils/user";

const Navigation = () => {
  return (
    <div className="border-b border-indigo-300">
      <div className="flex justify-between h-12 items-center px-[5%] max-w-7xl mx-auto">
        <div className="text-indigo-600 font-bold text-xl">Plutus</div>
        <div>
          <ul className="flex">
            {routes.map(
              (route, index) =>
                route.display && (
                  <Route
                    key={index}
                    to={route.to}
                    label={route.label}
                    onClick={route.onClick}
                  />
                )
            )}
            <li className="h-8 w-8 ml-5 rounded-full overflow-hidden my-auto">
              <img
                src={localStorage.getItem("userImage")}
                alt="Profile Picture"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
                }}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navigation;

const Route = ({ to, label, onClick }) => {
  const location = useLocation();

  if (onClick) {
    return (
      <li
        className={`px-4 py-1 mx-1 rounded-md text-indigo-900 hover:bg-slate-200 hover:text-indigo-600 transition-all cursor-pointer`}
        onClick={onClick}>
        {label}
      </li>
    );
  }

  return (
    <li
      className={`px-4 py-1 mx-1 rounded-md text-indigo-900 ${
        location.pathname === to && "bg-slate-200 !text-indigo-600"
      } hover:bg-slate-200 hover:text-indigo-600 transition-all`}>
      <Link to={to}>{label}</Link>
    </li>
  );
};

const routes = [
  {
    to: "/posts",
    label: "Posts",
    display: true,
    onClick: null,
  },
  {
    to: "",
    label: "Become an Author",
    display: localStorage.getItem("userRole") === "reader",
    onClick: () => {
      try {
        updateUserRole(localStorage.getItem("userEmail"), "author").then(() => {
          localStorage.setItem("userRole", "author");
          window.location.reload();
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  {
    to: "/author",
    label: "Author",
    display: localStorage.getItem("userRole") === "author",
    onClick: null,
  },
  {
    to: "/updates",
    label: "Updates",
    display: localStorage.getItem("userRole") === "author",
    onClick: null,
  },
];
