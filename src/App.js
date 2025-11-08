import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Project from "./pages/Project";
import DepartmentInfo from "./pages/DepartmentInfo";
import Gallery from "./pages/Gallery";
import GuestBook from "./pages/GuestBook";
import Footer from './components/Footer';
import ScrollTopButton from "./components/ScrollTopButton";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<Project />} />
        <Route path="/department" element={<DepartmentInfo/>} />
        <Route path="/gallery" element={<Gallery />} /> 
        <Route path="/guestbook" element={<GuestBook />} />
      </Routes>
      <Footer />
      <ScrollTopButton />
    </Router>
  );
}