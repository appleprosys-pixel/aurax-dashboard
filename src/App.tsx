import { ModalProvider } from "./lib/ui";
import Modals from "./components/Modals";
import PremiumHome from "./components/PremiumHome";

export default function App() {
  return (
    <ModalProvider>
      <PremiumHome />
      <Modals />
    </ModalProvider>
  );
}
