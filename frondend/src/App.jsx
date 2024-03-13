
import LoginForm from './Pages/LoginPage'
import Footer from './components/Footer'
import Header from './components/Header'
import ActionPage from './Pages/ActionPage'
import {
  Routes,Route
} from 'react-router-dom';

function App() {
  

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LoginForm />} /> {/* Login route */}
          <Route path="/action" element={<ActionPage />} /> {/* Action route */}
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App
