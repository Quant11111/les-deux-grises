import Button, { ButtonProps } from "@mui/material/Button";
import React from "react";

export const DefaultButton: React.FC<ButtonProps> = (props) => {
  const style = {
    ...props.sx,
  };
  return (
    <Button onClick={props.onClick} sx={style}>
      {props.children}
    </Button>
  );
};
