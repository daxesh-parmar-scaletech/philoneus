import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useParams } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import Dashboard from 'components/consultant/Dashboard';
import ConsultantProfile from 'components/consultant/ConsultantProfile';
import ConsultantHelp from 'components/consultant/ConsultantHelp';
import FlowBuilder from 'components/consultant/FlowBuilder';

import QuestionFlow from 'components/user/QuestionFlow';
import CanvasPlayground from 'components/user/CanvasPlayground';
import ReviewRequest from 'components/user/ReviewRequest';
import LoginPage from 'components/Auth/LoginPage';
import UserLanding from 'components/user/UserLanding';

import { FlowProvider } from 'contexts/FlowContext';
import { UserFlowProvider } from 'contexts/userFlowContext';
import { useAuth } from 'contexts/AuthContext';

function App() {
    const { user } = useAuth();
    const isAuthenticated = !isEmpty(user);

    return (
        <Router>
            <Routes>
                {/* Authenticated Consultant Routes */}
                {isAuthenticated && (
                    <Route path='/consultant' element={<ConsultantWrapper />}>
                        <Route index element={<Dashboard />} />
                        <Route path='profile' element={<ConsultantProfile />} />
                        <Route path='help' element={<ConsultantHelp />} />
                        <Route path='flow/new' element={<FlowBuilder />} />
                        <Route path='flow/:id/edit' element={<FlowBuilder />} />
                        <Route path='*' element={<Navigate to='/consultant' replace />} />
                    </Route>
                )}

                {/* Public/User Routes */}
                <Route path='/:userId/:shareId' element={<FlowWrapper />}>
                    <Route index element={<UserLanding />} />
                    <Route path='questions' element={<QuestionFlow />} />
                    <Route path='canvas' element={<CanvasPlayground />} />
                    <Route path='complete' element={<ReviewRequest />} />
                </Route>

                {/* Login Route (only when not authenticated) */}
                {!isAuthenticated && <Route path='/login' element={<LoginPage />} />}

                {/* Fallback Routes */}
                <Route path='/' element={<Navigate to='/login' replace />} />
                <Route path='*' element={<Navigate to={isAuthenticated ? '/consultant' : '/login'} replace />} />
            </Routes>
        </Router>
    );
}

export default App;

const FlowWrapper = () => {
    const { userId } = useParams();

    if (!userId || !['user', 'flow'].includes(userId)) {
        return <Navigate to='/login' replace />;
    }

    return (
        <UserFlowProvider>
            <Outlet />
        </UserFlowProvider>
    );
};

const ConsultantWrapper = () => (
    <FlowProvider>
        <div className='min-h-screen bg-gray-50'>
            <Outlet />
        </div>
    </FlowProvider>
);
