import { io } from "../app";
import jwt from "jsonwebtoken";
import User from "../models/user";

io.on("connection", (socket) => {
  console.log("A user connected"); // הדפסת התחברות לקוח
  socket.on("login", () => {
    console.log(`a user is login`);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected"); // הדפסת התנתקות לקוח
  });
});
