import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import "./Jumbotron.css";
import bgimage from "./images/bgimg-min.jpg";

 const JumbotronComp = () => {
  return (
    <>
      <Jumbotron
        fluid
        className="jumbo-shadow mb-5"
        style={{
          backgroundImage: `url(${bgimage})`,
          backgroundSize: "cover",
          maxHeight: "500px",
        }}
      >
        <Container>
          <div className="text-center wt p-5 header-font">
            <h1 className="header-font">Welcome to Gear-Out!</h1>
          </div>
        </Container>
      </Jumbotron>
    </>
  );
}

export default JumbotronComp;
