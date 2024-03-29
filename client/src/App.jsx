import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import LoginForm from "./pages/login/LoginPage";
import RegisterForm from "./pages/register/RegisterPage";
import HomePage from "./pages/home/HomePage";
import TransactionsPage from "./pages/transactions/TransactionsPage";
import ExchangePage from "./pages/exchange/ExchangePage";
import HistoryPage from "./pages/history/HistoryPage";
import { ProtectedRoute, Landing } from "./protectedRoute";

function App() {

  useEffect(() => {
    document.title = 'Homebanking App';
    return () => {
      document.title = 'Homebanking App';
    };
  }, []);



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/exchange" element={<ExchangePage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
