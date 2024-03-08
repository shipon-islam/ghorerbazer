"use client";
import { ReactNode, createContext, useContext, useRef } from "react";
const initialState = {
  sideCartRef: null,
  open: () => {},
};
type contextType = {
  sideCartRef: any;
  open: () => void;
};
const UtilityContext = createContext<contextType>(initialState);
export const useUtility = () => {
  return useContext(UtilityContext);
};
export default function UtilityProvider({ children }: { children: ReactNode }) {
  const sideCartRef = useRef<any>();
  const open = () => {
    sideCartRef.current?.click();
  };
  return (
    <UtilityContext.Provider value={{ sideCartRef, open }}>
      {children}
    </UtilityContext.Provider>
  );
}
