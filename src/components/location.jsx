import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import Select from "react-select";
import { BiCurrentLocation } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import Form from "react-bootstrap/Form";
import { FaSearch } from "react-icons/fa";
import { Calls } from "../utils/call";
import { api } from "../urls";
const Location = ({ show, setShow }) => {
  const [locationList, setLocationList] = useState([]);

  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = async () => {
    const res = await Calls.requestGet(api.getUserAddress);
    if (res.data) {
      setLocationList(res.data.data);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        className="location "
        size="sm"
      >
        <div>
          <Modal.Body>
            <div className="row justify-content-center location-modal">
              <div className="col-12 ">
                {/* <Form className="d-flex px-0" id="search-wrapper">
                <FaLocationDot className="search-icon" size={20} />
                <Form.Control
                  id="search"
                  type="search"
                  placeholder="Select your location....."
                  className=""
                  aria-label="Search"
                
                />
                <FaSearch className="search-button" size={20} />

              </Form> */}

                <div className="bg-white mt-3 mb-4 current-loc">
                  <p className=" mb-0 text-center">
                    <span className="me-2">
                      <BiCurrentLocation className="fs-4" />
                    </span>{" "}
                    <span className="fs-13 fw-600">Use current location </span>
                  </p>
                </div>
                <h6 className="fw-600 text-bluec my-3">SAVED ADDRESSES</h6>

                <div className="billing-details">
                  <div className="billing-address">
                    {locationList?.length > 0 &&
                      locationList.map((item) => {
                        return (
                          <div className="billing-address-detail bg-white">
                            <div class="form-check mb-3">
                              <input
                                class="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                              />
                              <label
                                class="form-check-label fw-bold"
                                for="flexRadioDefault1"
                              >
                                Home
                              </label>
                            </div>

                            <div className="billing-fulladdress ps-4 fs-12 text-justify">
                              <p>
                                C.P.-61, Viraj Khand-4, Viraj Khand, Gomti
                                Nagar, Lucknow near sanjivani hospital
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    <div className="billing-address-detail bg-white">
                      <div class="form-check mb-3">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        />
                        <label
                          class="form-check-label fw-bold"
                          for="flexRadioDefault1"
                        >
                          Office
                        </label>
                      </div>
                      <div className="billing-fulladdress ps-4 fs-12 text-justify">
                        <p>
                          C.P.-61, Viraj Khand-4, Viraj Khand, Gomti Nagar,
                          Lucknow near sanjivani hospital
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
};

export default Location;
