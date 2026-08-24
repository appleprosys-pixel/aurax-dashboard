import { ModalProvider, ScrollProgress } from "./lib/ui";
import Background from "./components/Background";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Positioning from "./components/Positioning";
import Systems from "./components/Systems";
import AutomationWorkflow from "./components/AutomationWorkflow";
import TopAgents from "./components/TopAgents";
import Stats from "./components/Stats";
import Reviews from "./components/Reviews";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Modals from "./components/Modals";

export default function App() {
  return (
    <ModalProvider>
      <Background />
      <Cursor />
      <ScrollProgress />
      <div className="relative min-h-screen overflow-x-hidden">
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <Positioning />
          <AutomationWorkflow />
          <Systems />
          <TopAgents />
          <Stats />
          <Reviews />
          <Pricing />
          <Contact />
        </main>
        <Footer />
      </div>
      <Modals />
    </ModalProvider>
  );
}
