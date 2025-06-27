import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n';

import { AuthProvider } from 'contexts/AuthContext.tsx';
import ErrorHandler from 'shared/withErrorHandler/errorHandler.tsx';
import ErrorBoundary from 'shared/errorBoundary/errorBoundary.tsx';

createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <ErrorHandler />
        <ErrorBoundary />
        <App />
    </AuthProvider>
);
