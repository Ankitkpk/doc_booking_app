import jwt from "jsonwebtoken";

const authAdmin = (req, res, next) => {
    try {

        const atoken = req.headers;

       
        if (!atoken) {
            return res.status(401).json({ success: false, message: "Token required" });
        }

    
        jwt.verify(atoken, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ success: false, message: "Invalid or expired token" });
            }

        
            req.user = decoded;
            next(); 
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export default authAdmin;
