import React from "react";
import notfound from "../assets/images/others/gif_404.gif";
import { Link } from "react-router-dom";
const DataNotFound = ({data="NO RESTAURANT FOUND"}) => {
    return (
        <>
            <div className="container not-found">
                <div className="row justify-content-center">
                    <div className="col-md-3 text-center">
                        <img src={notfound} alt="not found img" className="img-fluid" />
                        <h5 className="text-pink fw-bold">{data}</h5>
                        <Link to="/" className="btn btn-custom w-100 mt-4">  Back to Home  </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DataNotFound;