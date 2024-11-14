import { io } from "../app";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { IAttack } from "../models/attack";

io.on("connection", (socket) => {
  console.log("A user connected"); // הדפסת התחברות לקוח
  socket.on("login", () => {
    console.log(`a user is login`);
  });

  socket.on("attack", async (data: IAttack) => {
    try {
      console.log("attack", data);
      const { idAttacker, name, idIntercepted, timeAttack, area } = data;
      if (idAttacker || !timeAttack) {
        //אם המתקפה נגמרה צריך לשמור אןתה במסד הנתונים
        //save attack
        return;
      }
      const attacker = await User.findOne({ _id: idAttacker });
      if (!attacker) {
        throw new Error("user not found");
      }
      const attack = {
        name,
        idAttacker,
      };
      io.emit(`attack-${area}`, attack);
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected"); // הדפסת התנתקות לקוח
  });
});
