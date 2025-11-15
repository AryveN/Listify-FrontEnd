import { Item } from "../types";

export type ItemRowProps = {
  item: Item;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export const ItemRow: React.FC<ItemRowProps> = ({ item, onToggle, onDelete }) => (
  <div className="item-row">
    <label>
      <input
        type="checkbox"
        checked={item.resolved}
        onChange={() => onToggle(item.id)}
      />
      <span className={item.resolved ? "resolved" : ""}>{item.label}</span>
    </label>
    <button className="btn danger" onClick={() => onDelete(item.id)}>
      Smazat
    </button>
  </div>
);

export type ItemsListProps = {
  items: Item[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export const ItemsList: React.FC<ItemsListProps> = ({ items, onToggle, onDelete }) => {
  if (items.length === 0) {
    return <p className="empty">Žádné položky k zobrazení.</p>;
  }

  return (
    <div className="items-list">
      {items.map((item) => (
        <ItemRow key={item.id} item={item} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  );
};
