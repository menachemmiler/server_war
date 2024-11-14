import { getAllOrganizsNameService, initDatabase } from "../services/all";
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

export const allOrganizName = async (req: Request, res: Response) => {
  try {
    const resulte = await getAllOrganizsNameService();
    res.json(resulte).status(200);
  } catch (err: any) {
    console.log(err.message);
    res.json(err.message).status(400);
  }
};
