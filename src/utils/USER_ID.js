import { v4 as uuidv4 } from "uuid";
export const getUserId = function () {
  let USERID = localStorage.getItem("USERID");
  if (!USERID) {
    USERID = uuidv4();
    localStorage.setItem("USERID", USERID);
  }
  return USERID;
};
