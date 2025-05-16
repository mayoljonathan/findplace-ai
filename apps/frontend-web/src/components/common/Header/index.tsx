import React from "react";
import { APP_NAME } from "../../../config/constants";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = (props) => {
  const {} = props;

  return (
    <div className="min-h-14 flex items-center justify-center flex-col">
      <span className="text-center text-2xl font-bold text-primary">
        {APP_NAME}
      </span>
    </div>
  );
};

Header.displayName = "Header";
