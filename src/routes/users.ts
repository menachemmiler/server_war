import { Request, Response } from "express";
import { LoginDto, RegisterDto } from "../../dto/user";
import {
  createNewUser,
  // initDatabase,
  profileService,
  userLogin,
} from "../services/users";

export const login = async (req: Request<LoginDto>, res: Response) => {
  try {
    const loggedUser = await userLogin(req.body);
    res.status(200).json(loggedUser);
  } catch (err) {
    res.status(400).json((err as Error).message);
  }
};

export const register = async (
  req: Request<any, any, RegisterDto>,
  res: Response
) => {
  try {
    console.log("req.body= ", req.body);
    const freshlyCreatedUser = await createNewUser(req.body);
    console.log("test :" , freshlyCreatedUser)
    res.status(201).json(freshlyCreatedUser);
  } catch (err: any) {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaa")
    res.status(400).json(err.message);
  }
};

export const profile = async (req: Request, res: Response) => {
  try {
    const resulte = await profileService((req as any).user);
    res.status(200).json(resulte);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
};



