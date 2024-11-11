import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { errorToast, successToast ,Calls} from "../utils/call";
import { api } from "../urls";

const RestaurantRating = ({ show, setShow, data }) => {
  const [ratingNumber, setRatingNumber] = useState(0);
  const [comment, setComment] = useState("");

  // Catch Rating value
  const handleRating = (rate) => {
    setRatingNumber(rate);
  };
  const submitRating = async () => {
    data.comment = comment;
    data.rating = ratingNumber;
    const res = await Calls.requestPost(api.saveRatings, data);
    if (res.data) {
      successToast(res);
      setShow(false);
    } else {
      errorToast(res);
    }
  };
  // Optinal callback functions
  const onPointerEnter = () => console.log("Enter");
  const onPointerLeave = () => console.log("Leave");
  const onPointerMove = (value, index) => console.log(value, index);

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        className="login"
      >
        <Modal.Header closeButton>
          <Modal.Title className="fs-5 fw-600">Give a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container row justify-content-center">
            <div className="col-md-12 row text-center">
              <Rating
                onClick={handleRating}
                onPointerEnter={onPointerEnter}
                onPointerLeave={onPointerLeave}
                onPointerMove={onPointerMove}
                allowFraction={true}
                fillColor="#6409bc"
                size={35}
                /* Available Props */
              />
              <div class="form-group">
                {/* <label for="exampleFormControlTextarea1">Comment</label> */}
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  placeholder="Type here..."
                  rows="7"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-custom" onClick={submitRating}>Send a Review</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RestaurantRating;
