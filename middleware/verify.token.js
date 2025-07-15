import JWT from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message: "Unauthorized"});
    }

    const token = authHeader.split(" ")[1];

    

    JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
            return res.status(401).json("Forbidden or invalid token");
        }
        req.user = decoded;
        console.log("decoded" ,decoded);
        next();
    });
};

export const authorizationRoles = (...roles) => {
    return (req, res, next) => {
        console.log("Allowed roles:", roles);
        console.log("User role:", req.user?.role);

        if (!roles.includes(req.user?.role)) {
            return res.status(403).json({ message: "Forbidden" });
        }

        next();
    };
};
