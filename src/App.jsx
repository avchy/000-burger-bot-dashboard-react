import "styles/App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";
import { Navbar } from "components/Navbar";
import { MenuBar } from "components/MenuBar";
import { Header } from "components/Header";
import { pagesDashboards } from "constants/constants";
import { LoadingOverlay } from "components/LoadingOverlay";

function App() {
  const { isLoading, error } = useAuth0();

  return (
    <>
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <LoadingOverlay />}
      {!error && !isLoading && (
        <>
          {/* <LoginButton />
					<LogoutButton /> */}

          <Router>
            
            <MenuBar />
            <Navbar />
            
            <Header />

            <Routes>
              {pagesDashboards.map((page, index) => (
                <Route key={index} path={page.href} element={page.element} />
              ))}
            </Routes>
          </Router>
        </>
      )}
    </>
  );
}

export default App;
