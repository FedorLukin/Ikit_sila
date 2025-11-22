import { createContext } from "react";

export const MainContext = createContext<{ value: number; setValue: (v: number) => void;}>({
  value: 0,
  setValue: () => {},
});
