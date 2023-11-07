import { Navigate, Route, Routes } from "react-router-dom";
import "../public/fontawesome-free-6.4.2-web/fontawesome-free-6.4.2-web/css/all.css";
import About from "./About/About";
import "./App.css";
import SingleDataShow from "./DataShow/SingleDataShow";
import Message from "./Message/message";
import Mounth from "./Office/Mounth/Mounth";
import OfficeTaka from "./Office/OfficeTaka";
import PrivateRoute from "./PrivateRoute";
import DayRander from "./SecondNavTaka/Day/DayRander";
import SecondNavTaka from "./SecondNavTaka/SecondNavTaka";
import VedioPlayer from "./Vedio/Vedio";
import { AuthProvider } from "./auth/authContext";
import { AuthproviderServer } from "./auth/myServerAuthContext";
import Layout from "./layout/layout";
import Login from "./loginForm/login";
import SignIn from "./signIn/signIn";
function App() {
  return (
    <>
      <AuthProvider>
        <AuthproviderServer>
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="secondNavTaka/" />} />
              <Route path="About" element={<About />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="login" element={<Login />} />
              <Route path="Message" element={<Message />} />
              <Route path="Vedio" element={<VedioPlayer />} />
              <Route
                path="secondNavTaka/"
                element={
                  <PrivateRoute>
                    <SecondNavTaka />
                  </PrivateRoute>
                }
              >
                <Route path="Mounth" element={<Mounth />} />
                <Route path="" element={<SingleDataShow />} />
                <Route path="singleDataShow" element={<SingleDataShow />} />
                <Route path="DayRander" element={<DayRander />} />
                <Route path="OfficeTaka" element={<OfficeTaka />} />
              </Route>
            </Routes>
          </Layout>
        </AuthproviderServer>
      </AuthProvider>
    </>
  );
}

export default App;
