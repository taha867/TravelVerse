import { atom } from "recoil";

const storedAdmin = localStorage.getItem("Admin-data");

const AdminAtom = atom({
  key: "AdminAtom",
  default: storedAdmin ? JSON.parse(storedAdmin) : null,
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newAdmin) => {
        if (newAdmin) {
          localStorage.setItem("Admin-data", JSON.stringify(newAdmin));
        } else {
          localStorage.removeItem("Admin-data");
        }
      });
    },
  ],
});

export default AdminAtom;
