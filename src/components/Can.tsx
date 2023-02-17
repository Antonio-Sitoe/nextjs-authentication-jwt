import React, { ReactNode } from "react";
import { useCan } from "../hooks/useCan";

interface ICanProps {
  children: ReactNode;
  permissions?: string[];
  roles?: string[];
}

function Can({ children, permissions, roles }: ICanProps) {
  const userCanSeeComponent = useCan({ permissions, roles });
  if (!userCanSeeComponent) {
    return null;
  }
  return <>{children}</>;
}

export default Can;
