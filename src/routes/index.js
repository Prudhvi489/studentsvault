import { Router } from "express";
import { studentRoutes } from "../students/student.routes.js";
const router = Router();
studentRoutes(router);

export default router;