import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLists } from "../context/ListsContext";
import { UserId } from "../types";

export const CreateListPage: React.FC<{ currentUserId: UserId }> = ({
  currentUserId,
}) => {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const { setLists } = useLists();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!title.trim()) return;
    const newId = `list-${Date.now()}`;
    setLists((prev) => [
      ...prev,
      {
        id: newId,
        title: title.trim(),
        ownerId: currentUserId,
        memberIds: [currentUserId],
        isArchived: false,
        createdAt: new Date().toISOString(),
        items: [],
      },
    ]);
    navigate(`/list/${newId}`);
  };

  return (
    <div className="centered-card">
      <h2>Vytvořit nový seznam</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Název seznamu
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Např. Rodinný nákup"
          />
        </label>
        <button className="btn primary" type="submit">
          Uložit a pokračovat
        </button>
      </form>
      <p className="muted">
        Tento formulář je pouze demonstrační a pracuje s lokálním stavem.
      </p>
    </div>
  );
};
