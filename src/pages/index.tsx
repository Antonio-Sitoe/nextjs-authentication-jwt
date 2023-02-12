import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, signIn } = useContext(AuthContext);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await signIn({ email, password });
  }
  return (
    <div className="body">
      <form className="main" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button>Enviar</button>
      </form>
    </div>
  );
}
