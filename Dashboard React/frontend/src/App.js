import { useState, useContext } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Bar from "./scenes/bar";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import LoginPage from "./User/Login";
import SignUpPage from "./User/SignUp";
import { AuthContext } from "./context/AuthContext";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();
  const {user} = useContext(AuthContext);
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";

  if (isLoginPage || isSignupPage) {
    if (user) {
      return <Navigate to="/" />;
    }
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {isLoginPage && <LoginPage />}
          {isSignupPage && <SignUpPage />}
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Sidebar isSidebar={isSidebar} />
            <div style={{ height: "100%", width: "100%" }}>
              <main>
                <Topbar setIsSidebar={setIsSidebar} />
                <Routes>
                  <Route path="/" element={user ? <Dashboard /> : <Navigate to = "/login" />} />
                  {/* <Route path="/team" element={user ? <Team /> : <Navigate to = "/login" />} />
                  <Route path="/contacts" element={user ? <Contacts /> : <Navigate to = "/login" />} />
                  <Route path="/invoices" element={user ? <Invoices /> : <Navigate to = "/login" />} />
                  <Route path="/form" element={user ? <Form /> : <Navigate to = "/login" />} /> */}
                  <Route path="/bar" element={user ? <Bar /> : <Navigate to = "/login" />} />
                  <Route path="/pie" element={user ? <Pie /> : <Navigate to = "/login" />} />
                  <Route path="/line" element={user ? <Line /> : <Navigate to = "/login" />} />
                  {/* <Route path="/faq" element={user ? <FAQ /> : <Navigate to = "/login" />} />
                  <Route path="/calendar" element={user ? <Calendar /> : <Navigate to = "/login" />} />
                  <Route path="/geography" element={user ? <Geography /> : <Navigate to = "/login" />} /> */}
                </Routes>
              </main>
            </div>
          </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
