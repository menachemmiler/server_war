import { IAttack } from "../models/attack";

export const getAllOrganizsNameService = async (attack: IAttack) => {
  try {
    const {idAttacker,name, idIntercepted} = attack;
    if(!idAttacker) throw new Error("idAttacker is required");
    if(!name) throw new Error("name is required");
    
  } catch (err: any) {
    console.log("con't get all organizs name", err.message);
  }
};
