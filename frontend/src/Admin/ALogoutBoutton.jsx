import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import useShowToast from "../hooks/useShowToast";
import AdminAtom from "../AAtom/AuserAtom";
import { FiLogOut } from "react-icons/fi";

const AdminLogoutButton = () => {
  const navigate = useNavigate();
  const showToast = useShowToast();
  const setAdmin = useSetRecoilState(AdminAtom); 
  const handleLogout = async () => {
    try {
      // Call logout API to notify the backend (optional)
      const res = await fetch("/api/admin/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      // Clear admin data from local storage and navigate to login page
      localStorage.removeItem("Admin-data");
      setAdmin(null); // Clear admin state
      showToast("Success", data.message, "success");
      navigate("/"); 
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

export default AdminLogoutButton;
