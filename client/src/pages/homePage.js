import { useQuery } from "@apollo/client";
import { QUERY_FEATURED_ITEMS } from "../utils/queries";
import Fade from "react-reveal/Fade";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import "./Homepage.css";

function Homepage() {
  const { loading, data } = useQuery(QUERY_FEATURED_ITEMS);

  const results = data?.featuredItems || {};

  if (loading) {
    return (
      <>
        <Jumbotron />
        <h2>Loading, please wait...</h2>
      </>
    );
  }

  return (
    <div className="pb-5">
      <Jumbotron />
      <div className="invis-div-top"></div>
      <div className="container">
        <div className="container text-center border">
          <Fade right>
            <h2 className="m-4">Looking For A Convention Outfit?</h2>
          </Fade>
          <Fade left>
            <h2 className="m-4">Halloween Party Regalia?</h2>
          </Fade>
          <Fade right>
            <h2 className="m-4">Movie Props?</h2>
          </Fade>
          <Fade left>
            <h2 className="m-4">
              Gear-Out Is Your One Stop Shop For All Your Costume Needs.
            </h2>
          </Fade>
        </div>
      </div>
      <div className="invis-div-bottom"></div>
      <div className="text-center">
        <h2 className="text-center border p-3">Our Costumes</h2>
      </div>
      <div className="invis-div-content"></div>
      <div className="container-fluid text-center">
        <div className="row">
          {results.map((item) => {
            return (
              <Fade left key={item._id}>
                <div className="col-lg-4 mx-auto mb-4">
                  <Card
                    previous={"HOME"}
                    itemLink={item._id}
                    name={item.name}
                    category={item.category}
                    price={item.price}
                    image={item.image}
                    rating={item.rating}
                    available={item.available}
                  />
                </div>
              </Fade>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Homepage;
