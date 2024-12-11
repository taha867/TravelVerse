import { Container } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { Navigate, Route, Routes } from "react-router-dom";
import userAtom from "./Uatoms/userAtom";
import CompanyAtom from "./CAtom/CuserAtom";
import HomePage from "./pages/HomePage";
import UAuthPage from "./pages/UserAuthPage";
import CAuthPage from "./pages/AuthCompanyPage";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import UDashboardPage from "./Users/UDashboard";
import TDashboardPage from "./TravelCompany/CDashboard";
import Navbar from "./components/Navbar";
import AdminApproval from "./Admin/AdminApprovalPage";
import SetPasswordPage from "./Admin/SetPasswordPage";

function App() {
  const user = useRecoilValue(userAtom);
  const TCompany = useRecoilValue(CompanyAtom);

  return (
    <Container maxW="100vw" minH="100vh" p={0} m={0}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/Uauth"
          element={!user ? <UAuthPage /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard"
          element={
            user ? (
              <UDashboardPage />
            ) : TCompany ? (
              <TDashboardPage />
            ) : (
              <Navigate to="/Uauth" />
            )
          }
        />
        <Route
          path="/Cauth"
          element={!TCompany ? <CAuthPage /> : <Navigate to="/" />}
        />
        <Route path="/admin" element={<AdminApproval />} />
        <Route path="/setpassword" element={<SetPasswordPage />} />
        <Route
          path="/:username"
          element={user ? <UserPage /> : <Navigate to="/Uauth" />}
        />
        <Route
          path="/:username/post/:pid"
          element={user ? <PostPage /> : <Navigate to="/Uauth" />}
        />
      </Routes>
    </Container>
  );
}

export default App;
