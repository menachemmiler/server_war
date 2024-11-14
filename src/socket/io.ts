import { io } from "../app";
import jwt from "jsonwebtoken";
import User from "../models/user";
import attack, { IAttack } from "../models/attack";
import { getAllUsersAttacs } from "../services/users";
// import

io.on("connection", (socket) => {
  console.log("A user connected"); // הדפסת התחברות לקוח
  socket.on("login", () => {
    console.log(`a user is login`);
  });

  socket.on("attack", async (data: IAttack) => {
    try {
      console.log("attack", data);
      const { idAttacker, name, idIntercepted, timeAttack, area, status } =
        data;
      if (area == "" || !area) {
        throw new Error("area is required");
      }
      // if (status == "intercepted") {
      //   if (!idAttacker) throw new Error("idAttacker is required!");
      //   //to save the attack
      //   // const savedA = await attack
      //   return;
      // }
      const attacker = await User.findOne({ _id: idAttacker });
      if (!attacker) {
        throw new Error("user not found");
      }
      // const attack: IAttack = {
      //   name,
      //   idAttacker,
      //   area: area,
      // };
      if (status == "sent") {
        const savedA = new attack({ area, idAttacker, name, timeAttack });
        await savedA.save();
        io.emit(`attack-${area}`, savedA);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  });

  // socket.on("updateUser", async (_id: string, callback) => {
  //   try {
  //     const AllUsersAttac = await getAllUsersAttacs({ _id });
  //     if (AllUsersAttac) {
  //         callback({ status: "success", allAttack: AllUsersAttac });
  //     } else {
  //       callback({ status: "error", message: "User not found" });
  //     }
  //   } catch (err: any) {
  //     console.error("Token error:", err.message);
  //     callback({ status: "error", message: "Invalid token" });
  //   }
  // });

  socket.on("disconnect", () => {
    console.log("A user disconnected"); // הדפסת התנתקות לקוח
  });
});
