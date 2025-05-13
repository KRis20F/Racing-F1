import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthContainer from './app/auth/AuthForm';
import Shop from './app/features/shop/Shop';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthContainer />} />
        <Route path="/shop" element={<Shop />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App; 