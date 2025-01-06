import { atom } from "recoil";

const authAdminAtom = atom({
  key: "authAdminAtom",
  default: "login", // Default screen is login
});

export default authAdminAtom;
