import React from "react";
import Modal from "react-bootstrap/Modal";
import { Scanner } from "@yudiel/react-qr-scanner";
const CameraPopup = ({ show, setShow }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        className="slot"
        size="md"
      >
        <div>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="py-0">
            <div className="row justify-content-center bg-form-time">
              <div className="col-md-12 " style={{ height: "470px" }}>
                <Scanner
                  onScan={(result) => {
                    if (result) {
                      window.open(result[0]?.rawValue);
                    }else{
                      console.log("no qr code ");
                      
                    } 
                  }}
                  onError={(error) => {
                      console.log("no qr code=== ",error);
                   
                  }}
                />
              </div>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
};

export default CameraPopup;
