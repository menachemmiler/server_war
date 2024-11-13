import locations from "../../dto/location";
import { LoginDto, RegisterDto } from "../../dto/user";
import organiz from "../models/organiz";
import User from "../models/user";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";

export const userLogin = async (user: LoginDto) => {
  try {
    const { password, username } = user;
    if (!password || !username) {
      throw new Error("password and username is required to login");
    }
    const userFromDatabase = await User.findOne({
      username: user.username,
    });
    if (!userFromDatabase) throw new Error("user not found");

    const match = await compare(user.password, userFromDatabase.password);
    if (!match) throw new Error("wrong password");
    // gen token
    const token = await jwt.sign(
      {
        _id: userFromDatabase._id,
        username: userFromDatabase.username,
        organiz: userFromDatabase.organiz,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "10m",
      }
    );
    const { organiz } = userFromDatabase;
    return { organiz, username, token, password: "*******" };
  } catch (err) {
    throw err;
  }
};

export const createNewUser = async (user: RegisterDto) => {
  try {
    if (!user.username) {
      throw new Error("username is required!");
    }
    if (!user.password)
      throw new Error("Missing user data, [password] is require");
    if (user.area && !locations.includes(user.area)) {
      throw new Error(
        "not valid location! (locations=[North, South, Center, West Bank])"
      );
    }
    const ifOrganiz = await organiz.findOne({ name: user.organiz });
    if (!ifOrganiz) {
      throw new Error("this organiz not exist");
    }
    if (user.organiz.includes(" ")) {
      console.log(50, user.organiz.split(" - ")[1]);
      user.area = user.organiz.split(" - ")[1];
    }
    const encPass = await hash(user.password, 10);
    user.password = encPass;
    const { name, resources, budget } = ifOrganiz;
    const newUser = new User({ ...user, organiz: { name, resources, budget } });
    return await newUser.save();
  } catch (err: any) {
    console.log(err.message);
    throw new Error(`Can't create new user: ${err.message}`);
  }
};

export const profileService = async (user: { user_id: string }) => {
  // console.log({ user });
  try {
    if (!user) {
      throw new Error("user is required!");
    }
    // console.log({ user });
    const findById = await User.findOne({ _id: user.user_id });
    // console.log({ findById });
    if (!findById) throw new Error("user not found!");
    return findById;
  } catch (err: any) {
    console.log(err);
    throw new Error(`${err.message}`);
  }
};

export const myOrganizService = async (user: { _id: string }) => {
  // console.log({ user });
  try {
    if (!user) {
      throw new Error("user is required!");
    }
    const findById = await User.findOne({ _id: user._id });
    if (!findById) throw new Error("user not found!");
    return findById.organiz;
  } catch (err: any) {
    console.log(err);
    throw new Error(`${err.message}`);
  }
};
