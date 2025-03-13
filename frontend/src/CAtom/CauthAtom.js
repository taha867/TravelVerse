import { atom } from "recoil";

const CauthAtom = atom({
  key: "authCompanyAtom",
  default: "login", // Default screen is login
});

export default CauthAtom;
