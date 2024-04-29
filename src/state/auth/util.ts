// import api from "state/api";
// import { Auth, AuthInfo } from "./types";
import credentialCookie from "./cookie";
import { errCodes, LOGIN_STATUS } from "@/state/constant";


const [, NeedVerified] = errCodes;
export const checkLogin = () => {
  const data = credentialCookie.get();
  if (data === undefined) {
    return LOGIN_STATUS.NO_LOGIN;
  }
  if (data === NeedVerified) {
    return LOGIN_STATUS.NEED_VER;
  }
  return LOGIN_STATUS.LOGIN
};
