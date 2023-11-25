import Spinner from "react-bootstrap/Spinner";

function Loader() {
  return (
    <Spinner
      animation="border "
      role="status"
      style={{
        height: "90px",
        width: "90px",
        display: "block",
        margin: "auto",
      }}
    />
  );
}

export { Loader };
