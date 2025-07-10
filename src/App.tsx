import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import isEmpty from "lodash/isEmpty";

import Dashboard from "components/consultant/Dashboard";
import ConsultantProfile from "components/consultant/ConsultantProfile";
import ConsultantHelp from "components/consultant/ConsultantHelp";

import QuestionFlow from "components/user/QuestionFlow";
import CanvasPlayground from "components/user/CanvasPlayground";
import ReviewRequest from "components/user/ReviewRequest";
import LoginPage from "components/Auth/LoginPage";
import UserLanding from "components/user/UserLanding";

import { FlowProvider } from "contexts/FlowContext";
import { useAuth } from "contexts/AuthContext";
import { UserFlowProvider } from "contexts/userFlowContext";

function App() {
  const { user } = useAuth();
  const isAuthenticated = !isEmpty(user);

  return (
    <Routes>
      {/* Authenticated Consultant Routes */}
      {isAuthenticated && (
        <Route path="/consultant" element={<ConsultantWrapper />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<ConsultantProfile />} />
          <Route path="help" element={<ConsultantHelp />} />
          <Route path="*" element={<Navigate to="/consultant" replace />} />
        </Route>
      )}

      {/* Public/User Routes */}
      <Route path="/flow/:id" element={<UserFlowWrapper />}>
        <Route index element={<UserLanding />} />
        <Route path="questions" element={<QuestionFlow />} />
        <Route path="canvas" element={<CanvasPlayground />} />
        <Route path="complete" element={<ReviewRequest />} />
      </Route>

      {/* Login Route (only when not authenticated) */}
      {!isAuthenticated && <Route path="/login" element={<LoginPage />} />}

      {/* Fallback Routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route
        path="*"
        element={
          <Navigate to={isAuthenticated ? "/consultant" : "/login"} replace />
        }
      />
    </Routes>
  );
}

export default App;

const ConsultantWrapper = () => (
  <FlowProvider>
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
  </FlowProvider>
);

const UserFlowWrapper = () => (
  <UserFlowProvider>
    <Outlet />
  </UserFlowProvider>
);
