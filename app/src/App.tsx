import Navigation from "./sections/Navigation";
import Hero from "./sections/Hero";
import Overview from "./sections/Overview";
import Features from "./sections/Features";
import Architecture from "./sections/Architecture";
import Highlights from "./sections/Highlights";
import Footer from "./sections/Footer";

function App() {
  return (
    <div className="relative">
      <Navigation />
      <Hero />
      <Overview />
      <Features />
      <Architecture />
      <Highlights />
      <Footer />
    </div>
  );
}

export default App;
