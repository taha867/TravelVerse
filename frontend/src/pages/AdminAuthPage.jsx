import { useRecoilState } from "recoil";
import LoginCard from "../Admin/ALogin"; // Travel Company Login Card
import authAdminAtom from "../AAtom/AauthAtom";

const AdminAuthPage = () => {
  const [authScreenState] = useRecoilState(authAdminAtom);

  return (
    <>
      {authScreenState === "login" ? (
        <LoginCard />
      ) : (
        <p>Invalid State</p> // Optional: handle unexpected states
      )}
    </>
  );
};

export default AdminAuthPage;
