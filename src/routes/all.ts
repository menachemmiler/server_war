import { initDatabase } from "../services/all";
import { Request, Response } from "express";


export const sid = async (req: Request, res: Response) => {
    try {
      await initDatabase();
      res.status(201);
    } catch (err) {
      console.log(err);
      res.status(400);
    }
  };
  