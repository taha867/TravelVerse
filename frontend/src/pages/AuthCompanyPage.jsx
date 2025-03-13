import { useRecoilState } from "recoil";
import LoginCard from "../TravelCompany/CLogin"; // Travel Company Login Card
import SignupCard from "../TravelCompany/CSignup"; // Travel Company Signup Card
import authCompanyAtom from "../CAtom/CauthAtom";

const AuthCompanyPage = () => {
  const [authScreenState, setAuthScreenState] = useRecoilState(authCompanyAtom);

  return (
    <>
      {authScreenState === "login" ? (
        <LoginCard />
      ) : (
        <SignupCard onSignupSuccess={() => setAuthScreenState("login")} />
      )}
    </>
  );
};

export default AuthCompanyPage;
