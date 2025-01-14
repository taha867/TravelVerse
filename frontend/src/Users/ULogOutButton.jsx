import { Button } from "@chakra-ui/button";
import { useSetRecoilState } from "recoil";
import userAtom from "../Uatoms/userAtom";
import useShowToast from "../hooks/useShowToast";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const setUser = useSetRecoilState(userAtom);
  const showToast = useShowToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/users/logout", {
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

      localStorage.removeItem("user-threads");
      setUser(null);
      navigate("/");
    } catch (error) {
      showToast("Error", error, "error");
    }
  };

  return (
    // Removed the fixed positioning to make it part of the MenuItem
    <Button size={"sm"} onClick={handleLogout} leftIcon={<FiLogOut />}>
      Logout
    </Button>
  );
};

export default LogoutButton;
