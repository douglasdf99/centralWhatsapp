import User from "../../models/User";
import AppError from "../../errors/AppError";
import {
  createAccessToken,
  createRefreshToken
} from "../../helpers/CreateTokens";
import { SerializeUser } from "../../helpers/SerializeUser";
import Queue from "../../models/Queue";

interface SerializedUser {
  id: number;
  name: string;
  email: string;
  profile: string;
  queues: Queue[];
}

interface Request {
  email: string;
  password: string;
}

interface Response {
  serializedUser: SerializedUser;
}

const GetUserService = async ({ email }: Request): Promise<Response> => {
  const user = await User.findOne({
    where: { email },
    include: ["queues"]
  });
  if (!user) {
    throw new AppError("ERR_INVALID_CREDENTIALS", 401);
  }
  const serializedUser = SerializeUser(user);

  return {
    serializedUser
  };
};

export default GetUserService;
