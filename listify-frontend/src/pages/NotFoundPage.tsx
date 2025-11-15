import { useNavigate } from "react-router-dom";

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="centered-card">
      <h2>404 - Stránka nenalezena</h2>
      <p>Tato stránka neexistuje. Vyberte prosím jinou možnost z menu.</p>
      <button className="btn" onClick={() => navigate("/lists")}>
        Zpět na seznamy
      </button>
    </div>
  );
};
