import { Button } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import travelCompanyAtom from "../CAtom/CuserAtom"; 
import useShowToast from "../hooks/useShowToast";
import { FiLogOut } from "react-icons/fi";


const TravelCompanyLogoutButton = () => {
  const setCompany = useSetRecoilState(travelCompanyAtom); 
  const showToast = useShowToast();


  const handleLogout = async () => {
    try {
      const res = await fetch("/api/travelcompany/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
  
      const data = await res.json();

      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
  
      // Clear state and local storage
      localStorage.removeItem("travel-company-data");
      setCompany(null);
    } catch (error) {
      showToast("Error", error.message || "Network error", "error");
    }
  };
  

  return (
    <Button size={"sm"} onClick={handleLogout} leftIcon={<FiLogOut />}>
      Logout
    </Button>
  );
};

export default TravelCompanyLogoutButton;