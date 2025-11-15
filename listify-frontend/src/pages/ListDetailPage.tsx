import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ItemsList } from "../components/ItemsList";
import { useLists } from "../context/ListsContext";
import { Item, UserId } from "../types";

export const ListDetailPage: React.FC<{ currentUserId: UserId }> = ({
  currentUserId,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lists, setLists } = useLists();
  const list = lists.find((entry) => entry.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(list?.title ?? "");
  const [showResolved, setShowResolved] = useState(true);
  const [newItemLabel, setNewItemLabel] = useState("");

  useEffect(() => {
    if (list) {
      setEditedTitle(list.title);
    }
  }, [list]);

  const items = useMemo(() => list?.items ?? [], [list]);
  const totalItems = items.length;
  const unresolvedCount = items.filter((item) => !item.resolved).length;

  const visibleItems = useMemo(
    () => items.filter((item) => (showResolved ? true : !item.resolved)),
    [items, showResolved]
  );

  if (!list) {
    return (
      <div>
        <p>Seznam nebyl nalezen.</p>
        <button className="btn" onClick={() => navigate("/lists")}>
          Zpět na přehled
        </button>
      </div>
    );
  }

  const updateListItems = (items: Item[]) => {
    setLists((prev) =>
      prev.map((entry) => (entry.id === list.id ? { ...entry, items } : entry))
    );
  };

  const handleToggle = (itemId: string) => {
    updateListItems(
      list.items.map((item) =>
        item.id === itemId ? { ...item, resolved: !item.resolved } : item
      )
    );
  };

  const handleDelete = (itemId: string) => {
    updateListItems(list.items.filter((item) => item.id !== itemId));
  };

  const handleAddItem = (event: FormEvent) => {
    event.preventDefault();
    if (!newItemLabel.trim()) return;
    const newItem: Item = {
      id: `item-${Date.now()}`,
      label: newItemLabel.trim(),
      resolved: false,
    };
    updateListItems([...list.items, newItem]);
    setNewItemLabel("");
  };

  const handleTitleSave = () => {
    if (!editedTitle.trim()) return;
    setLists((prev) =>
      prev.map((entry) =>
        entry.id === list.id ? { ...entry, title: editedTitle.trim() } : entry
      )
    );
    setIsEditing(false);
  };

  const handleTitleEdit = () => {
    setEditedTitle(list.title);
    setIsEditing(true);
  };

  const canEdit = list.ownerId === currentUserId;

  return (
    <div className="list-detail">
      <div className="list-header">
        {isEditing ? (
          <div className="title-edit">
            <input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <div>
              <button className="btn primary" onClick={handleTitleSave}>
                Uložit
              </button>
              <button className="btn secondary" onClick={() => setIsEditing(false)}>
                Zrušit
              </button>
            </div>
          </div>
        ) : (
          <div className="title-row">
            <div>
              <h2>{list.title}</h2>
              <p className="muted">
                Položky: {unresolvedCount} / {totalItems}
              </p>
            </div>
            {canEdit && (
              <button className="btn" onClick={handleTitleEdit}>
                Upravit název
              </button>
            )}
          </div>
        )}
        <Link to={`/list/${list.id}/members`} className="link">
          Správa členů →
        </Link>
      </div>

      <form className="items-toolbar" onSubmit={handleAddItem}>
        <input
          type="text"
          placeholder="Nová položka"
          value={newItemLabel}
          onChange={(e) => setNewItemLabel(e.target.value)}
        />
        <button className="btn primary" type="submit">
          Přidat položku
        </button>
        <label className="checkbox">
          <input
            type="checkbox"
            checked={showResolved}
            onChange={(e) => setShowResolved(e.target.checked)}
          />
          Zobrazit vyřešené
        </label>
      </form>

      <ItemsList items={visibleItems} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
};
