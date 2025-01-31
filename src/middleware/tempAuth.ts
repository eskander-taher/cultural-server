import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const protect = (req: Request, res: Response, next: NextFunction) => {
	const token = req.header("Authorization")?.replace("Bearer ", "");
	console.log(token)
	if (!token) {
		res.status(401).send({ error: "Unauthorized" });
		return;
	}

	try {
		jwt.verify(token, process.env.JWT_SECRET!);
		next();
	} catch (err) {
		res.status(401).send({ error: "Unauthorized" });
	}
};

export default protect;
