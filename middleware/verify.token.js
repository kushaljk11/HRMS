import JWT from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message: "Unauthorized"});
    }

    const token = authHeader.split(" ")[1];

    JWT.verify(token, process.env.JWT, (err, decoded) => {
        if(err){
            return res.status(401).json("Forbidden or invalid token");
        }
        req.user = decoded;
        console.log("decoded" ,decoded);
        next();
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.role === "admin" || req.user.role === "employee" || req.user.role === "manager"){
            next();
        } else {
            return res.status(403).json("You are not authorize");
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.role === "admin"){
            next();
        } else {
            return res.status(403).json("You can goooo");
        }
    });
};

export const verifyEmployee = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.role === "employee"){
            next();
        } else {
            return res.status(403).json("You are not authorize");
        }
    });
};

export const verifyManager = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.role === "manager"){
            next();
        } else {
            return res.status(403).json("You are not authorize");
        }
    });
};