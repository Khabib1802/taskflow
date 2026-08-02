import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { AuthProvider } from './app/providers/AuthProvider';
import { AuthPage } from './pages/AuthPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { BoardPage } from './pages/BoardPage';
import { ProtectedRoute } from './app/providers/ProtectedRoute';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<AuthPage />}></Route>
            <Route
              path="/board"
              element={
                <ProtectedRoute>
                  <BoardPage />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="*" element={<Navigate to="/board" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
