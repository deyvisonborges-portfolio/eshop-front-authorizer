import express from "express";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@example.com" && password === "123456") {
    res.cookie("session", "token_aqui", {
      httpOnly: true, // Impede acesso via JavaScript no navegador
      secure: process.env.NODE_ENV === "production", // Apenas HTTPS em produção
      sameSite: "strict", // Previne ataques CSRF
      maxAge: 60 * 60 * 1000, // 1 hora
    });

    return res.json({ success: true });
  }

  res.status(401).json({ error: "Credenciais inválidas" });
});

// Rota para obter a sessão
app.get("/auth/session", (req, res) => {
  const sessionToken = req.cookies.session;

  if (!sessionToken) {
    return res.status(401).json({ error: "Não autenticado" });
  }

  return res.json({ session: sessionToken });
});

app.listen(3001, () => console.log("Servidor Express rodando na porta 3001"));
