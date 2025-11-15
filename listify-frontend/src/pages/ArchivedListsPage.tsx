import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ListCard, createCardPropsFromList } from "../components/ListCard";
import { useLists } from "../context/ListsContext";
import { UserId } from "../types";

export const ArchivedListsPage: React.FC<{ currentUserId: UserId }> = ({
  currentUserId,
}) => {
  const navigate = useNavigate();
  const { lists, setLists } = useLists();

  const archivedLists = useMemo(
    () => lists.filter((list) => list.isArchived),
    [lists]
  );

  const handleRestore = (id: string) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === id ? { ...list, isArchived: false } : list
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
          <h2>Archivované seznamy</h2>
          <p className="muted">Starší seznamy, které lze obnovit.</p>
        </div>
      </div>
      <div className="lists-grid">
        {archivedLists.map((list) => (
          <ListCard
            key={list.id}
            {...createCardPropsFromList(list, currentUserId)}
            onOpen={(id) => navigate(`/list/${id}`)}
            onRestore={handleRestore}
            onDelete={handleDelete}
          />
        ))}
        {archivedLists.length === 0 && (
          <p className="empty">Žádné archivované seznamy.</p>
        )}
      </div>
    </div>
  );
};
