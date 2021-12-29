import React from "react";
import "../App.css";

export default function Card(props) {
  const {
    user: { name, picture, email, phone, dob, location },
  } = props;

  return (
    <div className="cards">
      <div className="cards-detail">
        <img src={picture?.medium}></img>
        <div className="cards-info">
          <h2 className="card-name">
            {name.first} {name.last}{" "}
          </h2>
          <div className="user-info">
            <div className="info-main">
              <b>Email:</b>
              {email}
            </div>
            <div>
              <b>Phone:</b>
              {phone}
            </div>
            <div>
              <b>Age:</b>
              {dob.age}
            </div>
            <div>
              <b>Address:</b>
              {location?.city},{location?.state},{location?.country},
              {location?.pincode}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
