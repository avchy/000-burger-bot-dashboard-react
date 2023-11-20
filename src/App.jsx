import "./styles/App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TableOrders } from "./pages/TableOrders";
import { Settings } from "./pages/Settings";
import { Home } from "./pages/Home";
import { Statistics } from "./pages/Statistics";
import Profile from "./pages/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./components/Navbar";
import { Dishes } from "./pages/Dishes";
import { Toppings } from "./pages/Toppings";
import { Extras } from "./pages/Extras";
import { MenuBar } from "./components/MenuBar";

// import LoginButton from "./components/LoginButton";
// import LogoutButton from "./components/LogoutButton";

function App() {
  const { isLoading, error } = useAuth0();

  return (
    <>
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
        <>
          {/* <LoginButton />
					<LogoutButton /> */}

          <Router>
            <MenuBar />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/orders" element={<TableOrders />} />

              {/* <Route path="/login" element={<LoginButton />} />
							<Route path="/logout" element={<LogoutButton />} /> */}

              <Route path="/toppings" element={<Toppings />} />
              <Route path="/extras" element={<Extras />} />
              <Route path="/dishes" element={<Dishes />} />
            </Routes>
          </Router>
        </>
      )}
    </>
  );
}

export default App;
