import { atom } from "recoil";

const userAtom = atom({
  key: "userAtom",
  default: JSON.parse(localStorage.getItem("user-threads")) || null, // Null if no user is stored
});

export default userAtom;
