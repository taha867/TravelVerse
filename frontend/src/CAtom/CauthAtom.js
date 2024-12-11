import { atom } from "recoil";

const authCompanyAtom = atom({
  key: "authCompanyAtom",
  default: "login", // Default screen is login
});

export default authCompanyAtom;
