
import express from "express";
import cors from "cors";
import router from "./routes/index.js";

// import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Students vault application is working fine'); 
  });
app.use('/', router);
  
export default app;
