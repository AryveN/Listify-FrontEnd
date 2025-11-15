import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ListCard, createCardPropsFromList } from "../components/ListCard";
import { useLists } from "../context/ListsContext";
import { UserId } from "../types";

export const ListsPage: React.FC<{ currentUserId: UserId }> = ({ currentUserId }) => {
  const navigate = useNavigate();
  const { lists, setLists } = useLists();

  const activeLists = useMemo(
    () => lists.filter((list) => !list.isArchived),
    [lists]
  );

  const handleArchive = (id: string) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === id ? { ...list, isArchived: true } : list
      )
    );
  };

  const handleDelete = (id: string) => {
    if (!window.confirm("Opravdu chcete seznam smazat?")) return;
    setLists((prev) => prev.filter((list) => list.id !== id));
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Moje nákupní seznamy</h2>
          <p className="muted">Aktivní seznamy sdílené s přáteli.</p>
        </div>
        <button className="btn primary" onClick={() => navigate("/list/create")}>
          Vytvořit seznam
        </button>
      </div>
      <div className="lists-grid">
        {activeLists.map((list) => (
          <ListCard
            key={list.id}
            {...createCardPropsFromList(list, currentUserId)}
            onOpen={(id) => navigate(`/list/${id}`)}
            onArchive={handleArchive}
            onDelete={handleDelete}
          />
        ))}
        {activeLists.length === 0 && (
          <p className="empty">Zatím nemáte žádné aktivní seznamy.</p>
        )}
      </div>
    </div>
  );
};
