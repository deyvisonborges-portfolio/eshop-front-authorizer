export const AUTH_CONSTANTS = {
  secret: {
    csrfKey: process.env.NEXT_PUBLIC_API_CSRF_KEY,
  },
  cookie: { csrfToken: "csrf.token", csrfHeaderToken: "X-CSRF-Token" },
};
