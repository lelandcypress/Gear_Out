// import any major components, such as card
import Card from "../components/Card";
import { useParams, Redirect } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORY_SEARCH } from "../utils/queries";
import { Container } from "react-bootstrap";

// Props if we need them
const SearchResults = ({ props }) => {
  const { query } = useParams();

  const { loading, data } = useQuery(QUERY_CATEGORY_SEARCH, {
    variables: { categoryQuery: query },
  });

  const results = data?.categorySearch || {};

  if (loading) {
    return (
      <>
        <h2>Loading, please wait...</h2>
      </>
    );
  }

  if (!loading && !data) {
    return <Redirect to="/404" />;
  }

  return (
    <>
      <div className="container-fluid text-center">
        <div className="row">
          {results.map((item) => {
            return (
              <div className="col-lg-4 mx-auto m-4" key={item._id}>
                <Card
                  previous={"SEARCH"}
                  itemLink={item._id}
                  name={item.name}
                  shortDesc={item.shortDescription}
                  category={item.category}
                  available={item.available}
                  price={item.price}
                  image={item.image}
                  rating={item.rating}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SearchResults;
