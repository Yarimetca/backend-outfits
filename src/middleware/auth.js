import jwt from "jsonwebtoken";

const auth = (req, res, next) => {

  // 🔓 permitir acceso público a uploads
  if (req.originalUrl.startsWith("/uploads")) {
    return next();
  }

  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ error: "Token requerido" });

    const token = header.startsWith("Bearer ")
      ? header.split(" ")[1]
      : header;

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: payload.userId };
    next();

  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
};

export default auth;
