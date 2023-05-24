const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    let decodedtoken;
    
    try {
        const token = req.headers.authorization;


        if(!token || token === "null") {
            const error = new Error("Unauthorized | No token presented");
            error.statusCode = 401;
            throw error;
        }

        try {
            decodedtoken = jwt.verify(token, process.env.SECRET, {json: true}) || null;
        } catch {
            const error = new Error("Uauthorized | Token has been tempered");
            error.statusCode = 401;
            throw error;
        }
        
        req.userId = decodedtoken.userId;
        next();
    } catch (error) {
        if (error.statusCode) {
            res.status(error.statusCode).json({success: false, error: error.message});
            console.error(error)
            return;
        }
        res.status(500).json({success: false, error: "Something went wrong. Please, try again in a few minutes."}); 
    }

}