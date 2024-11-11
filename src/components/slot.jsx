import React, { useEffect, useState } from "react";
import check from "../assets/images/others/check-circle-fill.png";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { Calls } from "../utils/call";
import { api, socket } from "../urls";
import { dateConvertSlashInDash, getNextSevenDays } from "../utils/dates";
import { DisplayRazorpay } from "../payament";
import Order_Success from "./order-success";
import { toast } from "react-toastify";
// import { io } from "socket.io-client"
const Slot = ({
  show,
  setShow,
  restaurantID,
  isPayamentModeOnline
}) => {
  const navigate = useNavigate();
  const [partySize, setPartySize] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [selectedSlot, setSelectedSlot] = useState();
  const [slotList, setSlotLiist] = useState([]);
  const [dateList, setDateList] = useState([]);
  const [slotID, setSlotID] = useState("");
  const [successShow, setSuccessShow] = useState(false);
  useEffect(() => {
    setDateList(getNextSevenDays());
    console.log("date", restaurantID);
  }, []);

  //   const fetchSlots = async () => {
  //     const res = await requestPost(api.getTimeSlot, { restaurantID });
  //     if (res.data) {
  //       console.log(res.data);
  //       setSlotLiist(selectCreater(res.data.data, "_id", "startTime", "endTime"));
  //     }
  //   };
  const selectCreater = (array, optionValue, optionName, secondOptionName) => {
    let finalArray = [];
    array.map((item) => {
      if (item.active) {
        finalArray.push({
          value: item[optionValue],
          label: `${item[optionName]}  - to -  ${item[secondOptionName]}`,
        });
      }
    });
    return finalArray;
  };
  const dateHandler = async (e) => {
    let value = e.target.value;
    value = value.split(",")[0];
    if (value) {
      setSelectedDate(e.target.value);
      const res = await Calls.requestPost(api.getTimeSlot, {
        restaurantID,
        day: value.toLowerCase(),
      });
      if (res.data) {
        setSlotLiist(res.data.data);
      }
    }
  };

  const slotHandler = (e) => {
    if (e.target.value) {
      setSlotID(e.target.value);
    }
  };
  const peopleHandler = (e) => {
    let value = e.target.value;
    if (!isNaN(value)) {
      setPartySize(e.target.value);
    }
  };
  const handleClose = () => setShow(false);
  const handleSlotData = () => {
    if(!partySize){
      toast.error("People is required..")
      return
    }
    if(!selectedDate){
      toast.error("Day is required..")
      return
    }
    if(!slotID){
      toast.error("Slot is required..")
      return
    }
    if (isPayamentModeOnline) {
      let body = {
        slotId: slotID,
        partySize: Number(partySize),
        preOrderDate: dateConvertSlashInDash(selectedDate.split(", ")[1]),
      };
      DisplayRazorpay(navigate, body);
    } else {
      finalOrder();
    }
  };

  const finalOrder = async () => {
    console.log("i am from cash");
    
    let res = await Calls.requestPost(api.createOrder, {
      orderType: "PRE_ORDER",
      slotId: slotID,
      partySize: Number(partySize),
      preOrderDate: dateConvertSlashInDash(selectedDate.split(", ")[1]),
      paymentMethod: "cash",
    });
    if (res.data) {
      setSuccessShow(true);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        className="slot"
        size="sm"
      >
        <div>
          <Modal.Body className="py-0">
            <div className="row justify-content-center bg-form-time">
              <div className="col-11 ">
                <form className="my-4">
                  <div className="form-group">
                    <label htmlFor="people" className="fs-13 mb-1">
                      For People
                    </label>
                    <input
                      type="text"
                      value={partySize}
                      onChange={peopleHandler}
                      className="form-control fs-12 ps-2 text-pink border-0 py-2"
                    />
                  </div>
                  <div className="form-group my-3 phone-group">
                    <label htmlFor="date" className="fs-13 mb-1">
                      Select Date
                    </label>
                    <select
                      name="selectedDate"
                      className=" fs-13 border-0 form-control"
                      id=""
                      value={selectedDate}
                      onChange={dateHandler}
                    >
                      <option value={""}>Select</option>
                      {dateList.map((item) => {
                        return (
                          <>
                            <option value={item}>{item}</option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-group my-3 phone-group">
                    <label htmlFor="date" className="fs-13 mb-1">
                      Select Slot
                    </label>
                    {/* <Select className=" fs-13 border-0" options={slotList} /> */}
                    <select
                      name="selectedlot"
                      className=" fs-13 border-0 form-control"
                      id=""
                      value={slotID}
                      onChange={slotHandler}
                    >
                      <option value={""}>Select</option>
                      {slotList.map((item) => {
                        return (
                          <>
                            <option value={item._id}>
                              {item.startTime} to {item.endTime}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                  <div className="row mt-4 justify-content-center">
                    <div className="col-6 ">
                      <Link
                        to=""
                        className="btn text-bluec skip-btn w-100 "
                        onClick={handleClose}
                      >
                        Cancel
                      </Link>
                    </div>
                    <div className="col-6 ">
                      <Link
                        to="/confirm-order"
                        className="btn btn-custom w-100"
                        onClick={handleSlotData}
                      >
                        Done
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Modal.Body>
        </div>
      </Modal>
      <Order_Success show={successShow} setShow={setSuccessShow} />
    </>
  );
};

export default Slot;
