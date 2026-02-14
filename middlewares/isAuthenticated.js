import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated.",
        success: false,
      });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({
        message: "Invalid or malformed token.",
        success: false,
      });
    }

    // Attach userId to request object
    req.id = decoded.userId;
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(500).json({
      message: "Authentication failed.",
      success: false,
    });
  }
};

export default isAuthenticated;
