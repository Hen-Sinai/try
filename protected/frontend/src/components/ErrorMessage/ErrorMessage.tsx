import React from "react";
import "./ErrorMessage.css";

interface Props {
  message: string;
}

const ErrorMessage: React.FC<Props> = ({ message }) => {
  return <div className="error-message">{message}</div>;
};

export default ErrorMessage;
