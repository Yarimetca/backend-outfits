import jwt from "jsonwebtoken";

const auth = (req, res, next) => {

  if (req.originalUrl.startsWith("/uploads")) {
    return next();
  }

  try {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({ error: "Token requerido" });
    }

    const token = header.startsWith("Bearer ")
      ? header.split(" ")[1]
      : header;

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ LEEMOS userId (como viene en el token)
    req.user = { id: payload.userId };

    next();

  } catch (err) {
    console.error("AUTH ERROR:", err);
    return res.status(401).json({ error: "Token inválido" });
  }
};

export default auth;
