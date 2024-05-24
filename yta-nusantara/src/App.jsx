/* eslint-disable react/prop-types */
import * as React from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import { authProvider } from "./auth";
import { AuthContext, useAuth } from "./context/useAuth";
import LoginForm from "./components/LoginForm";
import LandingPage from "./pages/LandingPage";
import ProgramPage from "./pages/ProgramPage";
import ProgramCreatePage from "./pages/ProgramCreatePage";
import ProgramEditPage from "./pages/ProgramEditPage";
import SubProgramPage from "./pages/SubProgramPage";
import SubProgramCreatePage from "./pages/SubProgramCreatePage";
import SubProgramEditPage from "./pages/SubProgramEditPage";
import WorkshopPage from "./pages/WorkshopPage";
import WorkshopCreatePage from "./pages/WorkshopCreatePage";
import WorkshopEditPage from "./pages/WorkshopEditPage";
import UserPasswordEditPage from "./pages/SettingPage";

function ProgramRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProgramPage />} />
      <Route path="/create" element={<ProgramCreatePage />} />
      <Route path="/edit/:id" element={<ProgramEditPage />} />
    </Routes>
  );
}

function SubProgramRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SubProgramPage />} />
      <Route path="/create" element={<SubProgramCreatePage />} />
      <Route path="/edit/:id" element={<SubProgramEditPage />} />
    </Routes>
  );
}

function WorkshopRoutes() {
  return (
    <Routes>
      <Route path="/" element={<WorkshopPage />} />
      <Route path="/create" element={<WorkshopCreatePage />} />
      <Route path="/edit/:id" element={<WorkshopEditPage />} />
    </Routes>
  );
}

function SettingRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserPasswordEditPage />} />
    </Routes>
  );
}

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProgramPage />} />
      <Route path="/program/*" element={<ProgramRoutes />} />
      <Route path="/sub-program/*" element={<SubProgramRoutes />} />
      <Route path="/workshop/*" element={<WorkshopRoutes />} />
      <Route path="/setting/*" element={<SettingRoutes />} />
    </Routes>
  );
}
export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin/*"
            element={
              <RequireAuth>
                <AdminRoutes />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

function Layout() {
  return (
    <Outlet />
  );
}

function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);

  let signin = (username, password, callback) => {
    return authProvider.signin(username, password, () => {
      setUser(username);
      callback();
    });
  };

  let signout = (callback) => {
    return authProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  );
}

function RequireAuth({ children }) {
  // let auth = useAuth();
  let location = useLocation();

  if (!localStorage.getItem("token")) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/admin";

  function handleSubmit(event) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let username = formData.get("username");
    let password = formData.get("password");

    auth.signin(username, password, () => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from, { replace: true });
    });
  }

  return (
    <LoginForm onSubmit={handleSubmit} />
  );
}
