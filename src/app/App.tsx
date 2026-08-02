import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { AuthProvider } from '@/app/providers/AuthProvider';
import { ProtectedRoute } from '@/app/providers/ProtectedRoute';
import { AuthPage } from '@/pages/AuthPage';
import { BoardPage } from '@/pages/BoardPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

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
