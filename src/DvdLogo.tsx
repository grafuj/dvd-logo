import { DvdProvider } from "./DvdContext";
import { DvdAnimation } from "./DvdAnimation";
import { ControlPanel } from "./ControlPanel";

export function DvdLogo() {
  return (
    <DvdProvider>
      <DvdAnimation />
      <ControlPanel />
    </DvdProvider>
  );
}

export default DvdLogo;
