import styled from "styled-components";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import bg from "./img/bg.png";
import { MainLayout } from "./styles/Layout";
import Orb from "./Components/Orb/Orb";
import Navigation from "./Components/Navigation/navigation";
import { useEffect, useState } from "react";
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Incomes/income";
import Expenses from "./Components/Expenses/Expenses";
import { useGlobalContext } from "./context/globalContext";
import Transaction from "./Components/Transaction/Transaction";
import { useAuthContext } from "./Hooks/useAuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const { user } = useAuthContext();
  const global = useGlobalContext();

  const [orbEffect, setOrbEffect] = useState(null);
  useEffect(() => {
    setOrbEffect(<Orb />);
  }, []);

  const [active, setActive] = useState(1);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Transaction />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return null;
    }
  };

  return (
    <BrowserRouter>
    <AppStyled bg={bg} className="App">
      {orbEffect}
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
          <main>
              <Routes>

                <Route
                  path="/"
                  element={user ?<>
                    {displayData()}</>
                   : <Navigate to="/login" />}
                />
                <Route
                  path="/login"
                  element={!user ? <Login /> : <Navigate to="/" />}
                />
                <Route
                  path="/signup"
                  element={!user ? <Signup /> : <Navigate to="/" />}
                />
              </Routes>
          </main>
      </MainLayout>
    </AppStyled>
    </BrowserRouter>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;

  main {
    flex: 1;
    width:100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
