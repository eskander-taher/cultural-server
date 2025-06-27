import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';


const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
	const { password } = req.body;

	// Check the password
	const isMatch = password == process.env.PASSWORD;

	if (!isMatch) {
		res.status(400).send({ error: "Invalid password" });
		return;
	}

	// Generate a JWT
	const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET!);
	
	res.send({ token });
});

export { router as adminRouter };
