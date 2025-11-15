import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../data/mockData";
import { UserId } from "../types";

export const LoginPage: React.FC<{
  onLogin: (userId: UserId) => void;
}> = ({ onLogin }) => {
  const [email, setEmail] = useState(users[0].email);
  const [password, setPassword] = useState("tajneheslo");
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const user = users.find((u) => u.email === email) ?? users[0];
    onLogin(user.id);
    navigate("/lists");
  };

  return (
    <div className="centered-card">
      <h2>Přihlášení</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          E-mail
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Heslo
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="btn primary full">
          Přihlásit
        </button>
      </form>
      <p className="muted">Přihlášení je pouze demonstrační.</p>
    </div>
  );
};
