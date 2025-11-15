import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { users } from "../data/mockData";
import { useLists } from "../context/ListsContext";
import { UserId } from "../types";

export const MembersPage: React.FC<{ currentUserId: UserId }> = ({
  currentUserId,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lists, setLists } = useLists();
  const list = lists.find((entry) => entry.id === id);
  const [selectedMember, setSelectedMember] = useState(users[2]?.id ?? "");

  const availableUsers = useMemo(
    () => users.filter((user) => !(list?.memberIds?.includes(user.id))),
    [list]
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

  const handleRemoveMember = (userId: string) => {
    if (userId === list.ownerId) return;
    setLists((prev) =>
      prev.map((entry) =>
        entry.id === list.id
          ? { ...entry, memberIds: entry.memberIds.filter((id) => id !== userId) }
          : entry
      )
    );
  };

  const handleAddMember = () => {
    if (!selectedMember) return;
    setLists((prev) =>
      prev.map((entry) =>
        entry.id === list.id
          ? { ...entry, memberIds: [...entry.memberIds, selectedMember] }
          : entry
      )
    );
    setSelectedMember("");
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Správa členů</h2>
          <p className="muted">{list.title}</p>
        </div>
        <button className="btn" onClick={() => navigate(`/list/${list.id}`)}>
          ← Zpět na seznam
        </button>
      </div>

      <div className="members">
        {list.memberIds.map((memberId) => {
          const member = users.find((user) => user.id === memberId);
          const isOwner = memberId === list.ownerId;
          const isCurrentUser = memberId === currentUserId;
          return (
            <div key={memberId} className="member-row">
              <div>
                <strong>{member?.name ?? memberId}</strong>
                <span className="muted">
                  {isOwner ? " (vlastník)" : isCurrentUser ? " (já)" : ""}
                </span>
              </div>
              {!isOwner && (
                <button
                  className="btn danger"
                  onClick={() => handleRemoveMember(memberId)}
                >
                  {isCurrentUser ? "Odebrat sebe" : "Odebrat"}
                </button>
              )}
            </div>
          );
        })}
        {list.memberIds.length === 0 && (
          <p className="empty">Žádní členové.</p>
        )}
      </div>

      <div className="add-member">
        <select value={selectedMember} onChange={(e) => setSelectedMember(e.target.value)}>
          <option value="">Vyberte člena</option>
          {availableUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button className="btn" onClick={handleAddMember}>
          Přidat člena
        </button>
      </div>
    </div>
  );
};
