import { Spinner } from "react-bootstrap";

export default function Loader() {
  return (
    <>
      <div
        style={{ height: "90.3vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        <Spinner animation="border" bg="0d324d" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </>
  );
}
