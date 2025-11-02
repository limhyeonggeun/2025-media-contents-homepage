import Header from './components/Header';
import Banner from './components/Banner';
import Concept from './components/Concept';
import Poster from './components/Poster';
import Member from './components/Member';
import Introduce from './components/Introduce';
import Footer from './components/Footer';
import ScrollTopButton from "./components/ScrollTopButton";
import './styles/global.css';

export default function App() {
  return (
    <>
      <Header />
      <Banner />
      <Concept />
      <Poster />
      <Member />
      <Introduce />
      <Footer />
      <ScrollTopButton />
    </>
  );
}