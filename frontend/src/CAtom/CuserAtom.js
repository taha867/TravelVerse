import { atom } from "recoil";

const travelCompanyAtom = atom({
  key: "travelCompanyAtom",
  default: JSON.parse(localStorage.getItem("travel-company-data")) || null, // Retrieve stored travel company data or null
});

export default travelCompanyAtom;
