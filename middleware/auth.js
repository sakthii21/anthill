const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; // Extract token from "Bearer <token>"

    if (!token) {
        console.log(" No Token Received");
        return res.status(401).json({ error: "Authentication token is required" });
    }

    try {
        console.log("Token Received:", token ? "Present" : "Missing");  // Debugging

        if (!process.env.JWT_SECRET) {
            console.error("JWT Secret Key is missing in environment variables!");
            return res.status(500).json({ error: "Server error: Missing JWT secret" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Securely verify token
        req.user = decoded; // Store entire decoded payload (userId, role)
        
        next(); // Proceed to the next middleware
    } catch (err) {
        console.log(" Token Verification Failed:", err.message);
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};

// Middleware to check admin role
const adminMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ error: "Access denied: Admins only" });
    }
    next();
};

module.exports = { auth, adminMiddleware };
