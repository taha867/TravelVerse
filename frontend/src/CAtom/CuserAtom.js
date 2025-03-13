import { atom } from "recoil";

const CuserAtom = atom({
  key: "travelCompanyAtom",
  default: (() => {
    const storedData = JSON.parse(localStorage.getItem("travel-company-data"));
    return storedData?.user || null; // Return the nested `user` object or null
  })(),
});



export default CuserAtom;
