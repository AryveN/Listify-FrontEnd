import { NavLink, Outlet } from "react-router-dom";
import { users } from "../data/mockData";
import { UserId } from "../types";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "nav-link active" : "nav-link";

export const Layout: React.FC<{
  currentUserId: UserId;
}> = ({ currentUserId }) => {
  const currentUser = users.find((user) => user.id === currentUserId);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>Listify</h1>
          <p className="subtitle">Jednoduchý nákupní pomocník</p>
        </div>
        <div className="nav-wrapper">
          <NavLink to="/lists" className={navLinkClass}>
            Seznamy
          </NavLink>
          <NavLink to="/lists/archived" className={navLinkClass}>
            Archivované
          </NavLink>
          <NavLink to="/list/create" className={navLinkClass}>
            Vytvořit
          </NavLink>
          <NavLink to="/login" className={navLinkClass}>
            Odhlásit
          </NavLink>
        </div>
        {currentUser && (
          <p className="user-info">Přihlášen: {currentUser.name}</p>
        )}
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
};
