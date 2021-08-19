import { Modal, Button } from "react-bootstrap";
import { primaryBtn } from "../common.style";
import { modalBody, modalFooter } from "./customModal.style";

export default function CustomModal(props) {
  const { title, showModal, onHide, Content, ExtraContent, showFooter } = props;

  return (
    <Modal
      show={showModal}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Title
        id="contained-modal-title-vcenter"
        className="mt-3 ml-3 mb-1"
      >
        {title ? title : "Custom Modal"}
      </Modal.Title>
      <Modal.Body className={modalBody()} scrollable={`true`}>
        {Content}
      </Modal.Body>
      {showFooter ? (
        <Modal.Footer className={modalFooter()}>
          <Button size="sm" onClick={onHide} className={primaryBtn()}>
            Close
          </Button>
          {ExtraContent ? (
            <>
              {ExtraContent.enrollAResident}
              {ExtraContent.residentsListModal}
            </>
          ) : null}
        </Modal.Footer>
      ) : null}
    </Modal>
  );
}
