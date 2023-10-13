import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Profile, SignIn, SignOut, About, Home } from "./pages";
import { Header } from "./components";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-out" element={<SignOut />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
