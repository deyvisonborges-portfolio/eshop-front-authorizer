import express from "express";
import cookieParser from "cookie-parser";
import csurf from "csurf";

const app = express();
app.use(express.json());
app.use(cookieParser());

const csrfProtection = csurf({ cookie: true });

/**
 * Rota para obter o token CSRF.
 * Essa rota deve ser chamada pelo cliente (por exemplo, ao carregar o formulário)
 * para que o token seja enviado e usado na requisição POST.
 */
app.get("/auth/csrf", csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

/**
 * Rota de login protegida por CSRF.
 * O middleware csrfProtection irá comparar o token enviado (via header ou body)
 * com o token armazenado no cookie.
 */
app.post("/auth/login", csrfProtection, (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  // Simula autenticação
  if (email === "admin@example.com" && password === "123456") {
    res.cookie("session", "token_aqui", {
      httpOnly: true, // Evita acesso via JavaScript
      secure: process.env.NODE_ENV === "production", // HTTPS em produção
      sameSite: "strict", // Reduz riscos de CSRF
      maxAge: 60 * 60 * 1000, // 1 hora
      path: "/",
    });
    return res.json({ success: true });
  }

  return res.status(401).json({ error: "Credenciais inválidas" });
});

/**
 * Rota para verificar a sessão.
 * Apenas um exemplo para mostrar que o cookie de sessão já foi configurado.
 */
app.get("/auth/session", (req, res) => {
  const sessionToken = req.cookies.session;
  if (!sessionToken) {
    return res.status(401).json({ error: "Não autenticado" });
  }
  res.json({ session: sessionToken });
});

app.listen(3001, () => console.log("Servidor Express rodando na porta 3001"));
