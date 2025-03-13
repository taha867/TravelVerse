import { useRecoilState } from "recoil";
import LoginCard from "../Users/ULogin";
import authscreenAtom from "../Uatoms/authAtom";
import SignupCard from "../Users/USignupCard";

const AuthPage = () => {
  const [authScreenState, setAuthScreenState] = useRecoilState(authscreenAtom);

  return (
    <>
      {authScreenState === "login" ? (<LoginCard />) : (
        <SignupCard
          onSignupSuccess={() => setAuthScreenState("login")} 
        />
      )}
    </>
  );
};

export default AuthPage;
