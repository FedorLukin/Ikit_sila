import { useState, type PropsWithChildren } from "react";
import { MainContext } from "./MainContext.ts";

export const MainProvider = ({ children }: PropsWithChildren) => {
  const [value, setValue] = useState<number>(0);

  return (
    <MainContext.Provider value={{ value, setValue }}>
      {children}
    </MainContext.Provider>
  );
};
