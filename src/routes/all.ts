import { initDatabase } from "../services/all";
import { Request, Response } from "express";

export const sid = async (req: Request, res: Response) => {
  try {
    const resulte = await initDatabase();
    res.json(resulte).status(201);
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};
