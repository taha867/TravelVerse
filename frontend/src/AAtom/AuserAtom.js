import { atom } from "recoil";

const AdminAtom = atom({
  key: "AdminAtom",
  default: JSON.parse(localStorage.getItem("Admin-data")) || null, // Retrieve stored travel company data or null
});

export default AdminAtom;
