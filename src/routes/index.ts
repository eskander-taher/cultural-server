import express, { Request, Response } from "express";
import { adminRouter } from "./user.route";
import newsRoute from "./news.routes";

const apiRouter = express.Router();

apiRouter.get("/", (_: Request, res: Response) => {
	res.send("Welcome to moulhaqia server");
});

apiRouter.use("/news", newsRoute);
apiRouter.use("/admin", adminRouter);

export default apiRouter;
