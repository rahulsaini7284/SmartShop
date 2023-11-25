import { Alert } from "react-bootstrap";

const Message = ({ varient, message }) => {
  return (
    <>
      <Alert variant={varient}>{message}</Alert>
    </>
  );
};

Message.defaultProps = {
  varient: "info",
};
export { Message };
