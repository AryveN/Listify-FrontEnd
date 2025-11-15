import { ShoppingList } from "../types";

export type ListCardProps = {
  id: string;
  title: string;
  itemsCount: number;
  unresolvedCount: number;
  membersCount: number;
  isArchived: boolean;
  isOwner: boolean;
  onOpen: (id: string) => void;
  onArchive?: (id: string) => void;
  onRestore?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export const ListCard: React.FC<ListCardProps> = ({
  id,
  title,
  itemsCount,
  unresolvedCount,
  membersCount,
  isArchived,
  isOwner,
  onOpen,
  onArchive,
  onRestore,
  onDelete,
}) => {
  const handleAction = (cb?: (id: string) => void) => () => cb && cb(id);

  return (
    <div className="list-card">
      <div>
        <h3>{title}</h3>
        <p className="list-meta">
          Položky: {unresolvedCount} / {itemsCount} · Členové: {membersCount}
        </p>
        {isArchived && <span className="badge">Archivováno</span>}
      </div>
      <div className="list-card-actions">
        <button onClick={() => onOpen(id)} className="btn">
          Otevřít
        </button>
        {isOwner && !isArchived && (
          <>
            <button onClick={handleAction(onArchive)} className="btn secondary">
              Archivovat
            </button>
            <button onClick={handleAction(onDelete)} className="btn danger">
              Smazat
            </button>
          </>
        )}
        {isOwner && isArchived && (
          <>
            <button onClick={handleAction(onRestore)} className="btn secondary">
              Obnovit
            </button>
            <button onClick={handleAction(onDelete)} className="btn danger">
              Smazat
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export const createCardPropsFromList = (
  list: ShoppingList,
  currentUserId: string
): Omit<ListCardProps, "onOpen" | "onArchive" | "onDelete" | "onRestore"> => ({
  id: list.id,
  title: list.title,
  itemsCount: list.items.length,
  unresolvedCount: list.items.filter((item) => !item.resolved).length,
  membersCount: list.memberIds.length,
  isArchived: list.isArchived,
  isOwner: list.ownerId === currentUserId,
});
