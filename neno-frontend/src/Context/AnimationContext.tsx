"use client"

import React, { createContext, useState, useContext, ReactNode } from "react";

// Defina a forma do contexto
interface AnimationContextData {
  animation: boolean;
  setAnimation: React.Dispatch<React.SetStateAction<boolean>>;
}

// Crie o contexto com um valor inicial
const AnimationContext = createContext<AnimationContextData | undefined>(
  undefined
);

// Hook customizado para usar o contexto
export const UseAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error(
      "UseAnimation deve ser usado dentro de um AnimationProvider"
    );
  }
  return context;
};

// Componente AnimationProvider
export const AnimationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [animation, setAnimation] = useState(false);

  return (
    <AnimationContext.Provider value={{ animation, setAnimation }}>
      {children}
    </AnimationContext.Provider>
  );
};
