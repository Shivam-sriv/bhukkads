import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaStar } from "react-icons/fa";
// import Give_Review from "./give-a-review";
import { getDateAndTime } from "../utils/dates";
import { Rating } from "react-simple-star-rating";
import profileImg from "../assets/images/others/Profile.png"

const Review = ({ show, setShow, ratingList }) => {
  const handleClose = () => setShow(false);
  const [givereviewShow, setGiveReviewShow] = useState(false);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        className="animate__animated animate__fadeInUp view-orders"
        scrollable
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title className="fs-5 fw-600">Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-6">
                <h3 className="fw-bold">
                  {ratingList?.averageRating?.toFixed(1)}
                </h3>
                <div className="star d-flex cursor">
                  <Rating
                    // allowHover={false}
                    initialValue={ratingList?.averageRating?.toFixed(1)}
                    allowFraction={true}
                    disableFillHover={false}
                    fillColor="#6409bc"
                    readonly={true}
                    size={35}
                    /* Available Props */
                  />
                </div>
                <p className="fs-14  mt-2 text-grayc">
                  Based on {ratingList?.data?.length} review
                </p>
              </div>
              <div className="col-6">
                <div className="d-flex ">
                  <span className="fs-14 me-2">
                    {ratingList?.counting?.rating_1}
                  </span>
                  <meter
                    value={ratingList?.counting?.rating_1}
                    min="0"
                    max="5"
                    className="w-100 align-self-center"
                  ></meter>
                </div>
                <div className="d-flex">
                  <span className="fs-14 me-2">
                    {ratingList?.counting?.rating_2}
                  </span>
                  <meter
                    value={ratingList?.counting?.rating_2}
                    min="0"
                    max="5"
                    className="w-100 align-self-center"
                  ></meter>
                </div>
                <div className="d-flex">
                  <span className="fs-14 me-2">
                    {ratingList?.counting?.rating_3}
                  </span>
                  <meter
                    value={ratingList?.counting?.rating_3}
                    min="0"
                    max="5"
                    className="w-100 align-self-center"
                  ></meter>
                </div>
                <div className="d-flex">
                  <span className="fs-14 me-2">
                    {ratingList?.counting?.rating_4}
                  </span>
                  <meter
                    value={ratingList?.counting?.rating_4}
                    min="0"
                    max="5"
                    className="w-100 align-self-center"
                  ></meter>
                </div>
                <div className="d-flex">
                  <span className="fs-14 me-2">
                    {ratingList?.counting?.rating_5}
                  </span>
                  <meter
                    value={ratingList?.counting?.rating_5}
                    min="0"
                    max="5"
                    className="w-100 align-self-center"
                  ></meter>
                </div>
              </div>
            </div>
            {ratingList?.data?.length > 0 &&
              ratingList?.data.map((item) => {
                return (
                  <div className="row">
                    <div className="col-12">
                      <div className="card-rating bg-lightc p-2 mt-2">
                        <div className="fs-12 mb-1 d-flex">
                        <div className=""><img src={item?.userImage || profileImg} alt="" className="img-fluid rating-user"/></div>
                        <div className="align-self-center ms-2">
                          <b className="me-1">{item.rating}.0</b>
                          <FaStar className="text-voilet me-1 align-baseline" />    
                          </div>  
                         <div className="ms-2 align-self-center">
                            {getDateAndTime(item.createdAt).formattedDate}
                          </div>
                                            
                         
                        </div>

                        <p className="fs-11 my-1 text-black">{item?.comment}.</p>
                        <div className="text-grayc mb-0 fs-12 d-flex mt-2">
                       
                     <div className="ms-2 align-self-center">{item.user?.name}</div>     
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button
            className="btn btn-custom"
            onClick={() => setGiveReviewShow(true)}
          >
            Give a Review
          </Button>
        </Modal.Footer> */}
      </Modal>

      {/* <Give_Review show={givereviewShow} setShow={setGiveReviewShow} /> */}
    </>
  );
};

export default Review;
