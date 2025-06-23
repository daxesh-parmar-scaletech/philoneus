import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import { FlowProvider } from './contexts/FlowContext';
import ConsultantDashboard from './components/consultant/ConsultantDashboard';
import ConsultantProfile from './components/consultant/ConsultantProfile';
import ConsultantHelp from './components/consultant/ConsultantHelp';
import FlowBuilder from './components/consultant/FlowBuilder';
import UserLanding from './components/user/UserLanding';
import QuestionFlow from './components/user/QuestionFlow';
import CanvasPlayground from './components/user/CanvasPlayground';
import ReviewRequest from './components/user/ReviewRequest';
import LoginPage from './components/Auth/LoginPage';
import { useAuth } from 'contexts/AuthContext';

function App() {
    const { user } = useAuth();

    // Only render the main app if logged in
    // <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50'>
    //     <div className='bg-white p-8 rounded shadow-md text-center'>
    //         <h1 className='text-2xl font-bold mb-4'>Welcome, {user.username}!</h1>
    //         <button onClick={logout} className='mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-semibold'>
    //             Logout
    //         </button>
    //     </div>
    // </div>

    return (
        <FlowProvider>
            <Router>
                {!isEmpty(user) ? (
                    <div className='min-h-screen bg-gray-50'>
                        <Routes>
                            {/* Consultant Portal */}
                            <Route path='/' element={<ConsultantDashboard />} />
                            <Route path='/consultant' element={<ConsultantDashboard />} />
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
                    </div>
                ) : (
                    <Routes>
                        {/* Consultant Portal */}
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='*' element={<Navigate to='/login' />} />
                    </Routes>
                )}
            </Router>
        </FlowProvider>
    );
}

export default App;
