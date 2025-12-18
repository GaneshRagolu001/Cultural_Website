import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  const token =
    req.cookies.JWT || req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(400).json({ message: "Unauthorized: No token" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET ||
        "c2VjdXJlLWp3dC1rZXktamZoc2RmM2tzZGZoa2praGZqamZrM2Zq"
    );
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.user?.role !== "ADMIN") {
    return res.status(403).json({ message: "Access denied: Admin only" });
  }
  next();
};
