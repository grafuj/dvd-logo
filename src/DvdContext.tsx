import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type DvdContextType = {
  xVelocity: number;
  yVelocity: number;
  color: string;
  menuOpen: boolean;

  setXVelocity: (velocity: number) => void;
  setYVelocity: (velocity: number) => void;
  setColor: (color: string) => void;
  setMenuOpen: (open: boolean) => void;

  reverseX: () => void;
  reverseY: () => void;
};

const DvdContext = createContext<DvdContextType | null>(null);

export function DvdProvider({ children }: { children: ReactNode }) {
  const [xVelocity, setXVelocityState] = useState(120);
  const [yVelocity, setYVelocityState] = useState(100);
  const [color, setColor] = useState("#0066ff");
  const [menuOpen, setMenuOpen] = useState(true);

  const setXVelocity = (velocity: number) => {
    setXVelocityState(velocity);
  };

  const setYVelocity = (velocity: number) => {
    setYVelocityState(velocity);
  };

  const reverseX = () => {
    setXVelocityState((current) => -current);
  };

  const reverseY = () => {
    setYVelocityState((current) => -current);
  };

  return (
    <DvdContext.Provider
      value={{
        xVelocity,
        yVelocity,
        color,
        menuOpen,

        setXVelocity,
        setYVelocity,
        setColor,
        setMenuOpen,

        reverseX,
        reverseY,
      }}
    >
      {children}
    </DvdContext.Provider>
  );
}

export function useDvd() {
  const context = useContext(DvdContext);

  if (!context) {
    throw new Error("useDvd must be used inside a DvdProvider");
  }

  return context;
}
