import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import "./Jumbotron.css";
import bgimage from "./images/bgimg-min.jpg";

import React from "react";

export default function JumbotronComp() {
  return (
    <>
      <Jumbotron
        fluid
        className="jumbo-shadow"
        style={{
          backgroundImage: `url(${bgimage})`,
          backgroundSize: "cover",
          minHeight: "275px",
        }}
      >
        <Container>
          <div className="text-center wt p-5 header-font">
            <figure className="bungee regular-0b5ba8 inline-55a5fe shade-0b5ba8-20 outline-ffffff sign-c1e6ff horizontal begin-circle end-circle ">
              Welcome to Gear-Out!
            </figure>
            {/* <div className="vertical mt-5 wt welcome p-3 header-body-font">
              <p>Tired of cheap party city costumes? Us too!</p>
              <p>
                Gear-Out is your one stop shop for all your premium costume and
                cosplay needs.
              </p>
              <p>
                Rent a costume from one of our verified renters and enter the
                world of high-end costumery.
              </p>
            </div> */}
          </div>
        </Container>
      </Jumbotron>
    </>
  );
}
