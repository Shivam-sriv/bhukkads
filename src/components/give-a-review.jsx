import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaStar } from "react-icons/fa";




const Give_Review = ({ show, setShow }) => {
  const handleClose = () => setShow(false);
  return (

    <>
      <Modal show={show} onHide={handleClose} centered className="animate__animated animate__fadeInUp view-orders" scrollable >
        <Modal.Header className="text-center" closeButton>
          <Modal.Title className=" fw-600 fs-5">Give a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-6">

                <div className="star d-flex cursor justify-content-evenly">
                  <FaStar className="text-pink fs-3" />
                  <FaStar className="text-pink fs-3 " />
                  <FaStar className="text-pink fs-3 " />
                  <FaStar className="text-pink fs-3 " />
                  <FaStar className="text-grayc fs-3 " />
                </div>


              </div>
              <div className=" col-12 review-d mt-4">
                <label htmlFor="" className="mb-2 fs-14">Detail Review</label>
                <textarea name="" id="" rows="5" className="form-control"></textarea>

              </div>
            </div>


          </div>




        </Modal.Body>
        <Modal.Footer>

          <Button className="btn btn-custom" onClick={handleClose}>
            Send a Review
          </Button>
        </Modal.Footer>
      </Modal>



    </>
  )
}

export default Give_Review;