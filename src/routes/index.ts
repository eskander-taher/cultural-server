import express, { Request, Response } from "express";
import { adminRouter } from "./user.route";
import newsRoute from "./news.routes";
import subscriberRoute from "./subscriber.routes";
import visitorRoutes from "./visitor.routes";
import pdfRoutes from "./pdf.routes";
import uploadRoutes from "./uploadRoutes";

const apiRouter = express.Router();

apiRouter.get("/", (_: Request, res: Response) => {
	res.send("Welcome to moulhaqia server");
});

apiRouter.use("/upload", uploadRoutes);
apiRouter.use("/news", newsRoute);
apiRouter.use("/admin", adminRouter);
apiRouter.use("/subscribers", subscriberRoute);
apiRouter.use("/visitors", visitorRoutes);
apiRouter.use("/pdfs", pdfRoutes);


export default apiRouter;
