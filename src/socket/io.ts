import { io } from "../app";
import jwt from "jsonwebtoken";
import User from "../models/user";
import attack from "../models/attack";
import { getAllUsersAttacs } from "../services/users";
import user from "../models/user";
import missile, { IMissile } from "../models/missile";
// import

//אינטרפייס מיוחד למתקפה שכבר נוצרה ויש לה _id
interface IAttack {
  _id?: string;
  name: string;
  idAttacker: string;
  idIntercepted?: string; //אם הוא יורט באמת
  timeAttack?: Date;
  timeToHit: number;
  area?: string;
  status?: "sent" | "fell" | "intercepted";
}

io.on("connection", (socket) => {
  console.log("A user connected"); // הדפסת התחברות לקוח
  socket.on("login", () => {
    console.log(`a user is login`);
  });

  // socket.on("intercept", async (data: IAttack) => {
  //   try {
  //     const { idAttacker, name, idIntercepted, timeAttack, area, status, _id } =
  //       data;
  //     if (area == "" || !area) {
  //       throw new Error("area is required");
  //     }
  //     if (!idAttacker) throw new Error("idAttacker is required!");
  //     if (status == "sent") {
  //       const attackToUpdate = await attack.findOne({ _id: _id });
  //       if (!attackToUpdate) throw new Error("attack not found");
  //       attackToUpdate.status = "intercepted";
  //       attackToUpdate.idIntercepted = idIntercepted as any;
  //       await attackToUpdate.save();
  //       //to find the Itercepted
  //       const itercepted = await user.findOne({ _id: idIntercepted });
  //       if (!itercepted) throw new Error("con't get itercepted");
  //       const allAttacsByArea = await attack.find({ area });
  //       if (!allAttacsByArea) throw new Error("con't get allAttacsByArea");
  //       const allAttacsByAttackerId = await attack.find({ idAttacker });
  //       if (!allAttacsByAttackerId)
  //         throw new Error("con't get allAttacsByAttackerId");
  //       io.emit(`attack-${area}`, allAttacsByArea);
  //       io.emit(`attack-${idAttacker}`, allAttacsByAttackerId);
  //     }
  //   } catch (err: any) {
  //     console.log(err.message);
  //   }
  // });

  // socket.on("attack", async (data: IAttack) => {
  //   try {
  //     console.log("attack", data);
  //     const {
  //       idAttacker,
  //       name,
  //       idIntercepted,
  //       timeAttack,
  //       area,
  //       status,
  //       _id,
  //       timeToHit,
  //     } = data;
  //     if (area == "" || !area) {
  //       throw new Error("area is required");
  //     }
  //     if (!idAttacker) throw new Error("idAttacker is required!");
  //     const attacker = await User.findOne({ _id: idAttacker });
  //     if (!attacker) {
  //       throw new Error("user not found");
  //     }
  //     //להפחית את הכמות של הטילים של אותו attacker באחד
  //     attacker.organiz.resources = attacker.organiz.resources.map((r) => {
  //       if (r.name == name) {
  //         r.amount -= 1;
  //       }
  //       return r;
  //     });
  //     await attacker.save();
  //     io.emit(`updateResources-${attacker._id}`, attacker.organiz.resources);
  //     if (status == "sent") {
  //       const savedA = new attack({
  //         area,
  //         idAttacker,
  //         name,
  //         timeAttack,
  //         timeToHit,
  //       });
  //       await savedA.save();
  //       const allAttacsByArea = await attack.find({ area });
  //       if (!allAttacsByArea) throw new Error("con't get allAttacsByArea");
  //       const allAttacsByAttackerId = await attack.find({ idAttacker });
  //       if (!allAttacsByAttackerId)
  //         throw new Error("con't get allAttacsByAttackerId");
  //       io.emit(`attack-${area}`, allAttacsByArea);
  //       io.emit(`attack-${idAttacker}`, allAttacsByAttackerId);
  //     }
  //   } catch (err: any) {
  //     console.log(err.message);
  //   }
  // });

  socket.on("attack", async (data: IAttack) => {
    try {
      console.log("attack", data);
      const {
        idAttacker,
        name,
        idIntercepted,
        timeAttack,
        area,
        status,
        _id,
        timeToHit,
      } = data;
      if (area == "" || !area) {
        throw new Error("area is required");
      }
      if (!idAttacker) throw new Error("idAttacker is required!");
      const attacker = await User.findOne({ _id: idAttacker });
      if (!attacker) {
        throw new Error("user not found");
      }
      //להפחית את הכמות של הטילים של אותו attacker באחד
      attacker.organiz.resources = attacker.organiz.resources.map((r) => {
        if (r.name == name) {
          r.amount -= 1;
        }
        return r;
      });
      await attacker.save();
      io.emit(`updateResources-${attacker._id}`, attacker.organiz.resources);
      if (status == "sent") {
        const savedA = new attack({
          area,
          idAttacker,
          name,
          timeAttack,
          timeToHit,
        });
        await savedA.save();
        const allAttacsByArea = await attack.find({ area });
        if (!allAttacsByArea) throw new Error("con't get allAttacsByArea");
        const allAttacsByAttackerId = await attack.find({ idAttacker });
        if (!allAttacsByAttackerId)
          throw new Error("con't get allAttacsByAttackerId");
        io.emit(`attack-${area}`, allAttacsByArea);
        io.emit(`attack-${idAttacker}`, allAttacsByAttackerId);
        //לעשות טיימר לפי הזמן שנותר שאחר הזמן זה עובר לסטטוס "נפל" ת
        const myInterval = setInterval(async () => {
          const currAttack = await attack.findOne({ _id: savedA._id });
          if (!currAttack) throw new Error("not find curr attack");
          if (currAttack.status == "intercepted") return;
          currAttack.timeToHit -= 1;
          await currAttack.save();
          const allAttacsByArea = await attack.find({ area });
          if (!allAttacsByArea) throw new Error("con't get allAttacsByArea");
          const allAttacsByAttackerId = await attack.find({ idAttacker });
          if (!allAttacsByAttackerId)
            throw new Error("con't get allAttacsByAttackerId");
          io.emit(`attack-${area}`, allAttacsByArea);
          io.emit(`attack-${idAttacker}`, allAttacsByAttackerId);
        }, 1000);
        const myTimeOut = setTimeout(async () => {
          //לבדוק אם לא יירטו את ההתקפה הזו
          const currAttack = await attack.findOne({ _id: savedA._id });
          if (!currAttack) throw new Error("not find curr attack");
          if (currAttack.status == "intercepted") return;
          currAttack.status = "fell";
          await currAttack.save();
          console.log({ currAttack });
          const allAttacsByArea = await attack.find({ area });
          if (!allAttacsByArea) throw new Error("con't get allAttacsByArea");
          const allAttacsByAttackerId = await attack.find({ idAttacker });
          if (!allAttacsByAttackerId)
            throw new Error("con't get allAttacsByAttackerId");
          io.emit(`attack-${area}`, allAttacsByArea);
          io.emit(`attack-${idAttacker}`, allAttacsByAttackerId);
          clearInterval(myInterval);
        }, timeToHit * 1000);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  });

  socket.on("intercept", async (data: IAttack) => {
    try {
      const { idAttacker, name, idIntercepted, timeAttack, area, status, _id } =
        data;
      if (area == "" || !area) {
        throw new Error("area is required");
      }
      if (!idAttacker) throw new Error("idAttacker is required!");
      if (status == "sent") {
        const attackToUpdate = await attack.findOne({ _id: _id });
        if (!attackToUpdate) throw new Error("attack not found");
        attackToUpdate.status = "intercepted";
        attackToUpdate.idIntercepted = idIntercepted as any;
        await attackToUpdate.save();
        //to find the Itercepted
        const itercepted = await user.findOne({ _id: idIntercepted });
        if (!itercepted) throw new Error("con't get itercepted");
        const allAttacsByArea = await attack.find({ area });
        if (!allAttacsByArea) throw new Error("con't get allAttacsByArea");
        const allAttacsByAttackerId = await attack.find({ idAttacker });
        if (!allAttacsByAttackerId)
          throw new Error("con't get allAttacsByAttackerId");
        io.emit(`attack-${area}`, allAttacsByArea);
        io.emit(`attack-${idAttacker}`, allAttacsByAttackerId);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected"); // הדפסת התנתקות לקוח
  });
});
