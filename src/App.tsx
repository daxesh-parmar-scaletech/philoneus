import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import Dashboard from 'components/consultant/Dashboard';
import ConsultantProfile from 'components/consultant/ConsultantProfile';
import ConsultantHelp from 'components/consultant/ConsultantHelp';
import FlowBuilder from 'components/consultant/FlowBuilder';
import UserLanding from 'components/user/UserLanding';
import QuestionFlow from 'components/user/QuestionFlow';
import CanvasPlayground from 'components/user/CanvasPlayground';
import ReviewRequest from 'components/user/ReviewRequest';
import LoginPage from 'components/Auth/LoginPage';

import { FlowProvider } from 'contexts/FlowContext';
import { useAuth } from 'contexts/AuthContext';

function App() {
    const { user } = useAuth();

    return (
        <Router>
            {!isEmpty(user) ? (
                <div className='min-h-screen bg-gray-50'>
                    <FlowProvider>
                        <Routes>
                            {/* Consultant Portal */}
                            <Route path='/' element={<Dashboard />} />
                            <Route path='/consultant' element={<Dashboard />} />
                            <Route path='/consultant/profile' element={<ConsultantProfile />} />
                            <Route path='/consultant/help' element={<ConsultantHelp />} />
                            <Route path='/consultant/flow/new' element={<FlowBuilder />} />
                            <Route path='/consultant/flow/:id/edit' element={<FlowBuilder />} />

                            {/* User Experience */}
                            <Route path='/flow/:shareId' element={<UserLanding />} />
                            <Route path='/flow/:shareId/questions' element={<QuestionFlow />} />
                            <Route path='/flow/:shareId/canvas' element={<CanvasPlayground />} />
                            <Route path='/flow/:shareId/complete' element={<ReviewRequest />} />
                            <Route path='*' element={<Navigate to='/' />} />
                        </Routes>
                    </FlowProvider>
                </div>
            ) : (
                <Routes>
                    {/* Consultant Portal */}
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='*' element={<Navigate to='/login' />} />
                </Routes>
            )}
        </Router>
    );
}

export default App;
