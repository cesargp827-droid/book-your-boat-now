import { createContext, useContext, useState, type ReactNode } from "react";

interface SkipperContextType {
  withSkipper: boolean;
  setWithSkipper: (v: boolean) => void;
}

const SkipperContext = createContext<SkipperContextType>({
  withSkipper: false,
  setWithSkipper: () => {},
});

export const useSkipper = () => useContext(SkipperContext);

export const SkipperProvider = ({ children }: { children: ReactNode }) => {
  const [withSkipper, setWithSkipper] = useState(false);
  return (
    <SkipperContext.Provider value={{ withSkipper, setWithSkipper }}>
      {children}
    </SkipperContext.Provider>
  );
};
