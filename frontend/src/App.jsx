import { Container } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { Navigate, Route, Routes } from "react-router-dom";
import userAtom from "./Uatoms/userAtom";
import CompanyAtom from "./CAtom/CuserAtom";
import AdminAtom from "./AAtom/AuserAtom";
import HomePage from "./pages/LandingPage";
import UAuthPage from "./pages/UserAuthPage";
import CAuthPage from "./pages/AuthCompanyPage";
import AAuthPage from "./pages/AdminAuthPage";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import UDashboardPage from "./Users/UDashboard";
import TDashboardPage from "./TravelCompany/CDashboard";
import ADashboardPage from "./Admin/ADashboard";
import Navbar from "./components/Navbar";
import AdminApproval from "./Admin/AdminApprovalPage";
import SetPasswordPage from "./Admin/SetPasswordPage";
import BrowsePage from "./pages/BrowsePage";
import UpdateProfile from "./TravelCompany/CDashboardComponents/UpdateProfilePage";

function App() {
  const user = useRecoilValue(userAtom);
  const TCompany = useRecoilValue(CompanyAtom);
  const Admin = useRecoilValue(AdminAtom);

  return (
    <Container maxW="100vw" minH="100vh" p={0} m={0}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/browse" element={<BrowsePage />} />
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
            ) : Admin ? (
              <ADashboardPage />
            ) : (
              <Navigate to="/Uauth" />
            )
          }
        />
        <Route
          path="/Cauth"
          element={!TCompany ? <CAuthPage /> : <Navigate to="/" />}
        />
        <Route
          path="/Aauth"
          element={!Admin ? <AAuthPage /> : <Navigate to="/" />}
        />
        <Route path="/admin-approval" 
        element={Admin ? <AdminApproval/> : <Navigate to="/Aauth" />} />
        <Route path="/update-profile" 
        element={TCompany ? <UpdateProfile /> : <Navigate to="/Cauth" />} />

        
        <Route path="/setpassword/:companyId" element={<SetPasswordPage />} />
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
