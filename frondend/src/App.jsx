import LoginForm from "./Pages/LoginPage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProtectedRoute from "./Pages/ProtectedRoute";
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/action" element={<ProtectedRoute />}  />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
