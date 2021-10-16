import { useParams, Redirect } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORY_SEARCH } from "../utils/queries";
import Card from "../components/Card";
import Fade from "react-reveal/Fade";

const SearchResults = () => {
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

  if (!loading && !results.length) {
    return <Redirect to="/404" />;
  }

  return (
    <div className="pb-5">
      <div className="container-fluid text-center">
        <div className="row">
          {results.map((item) => {
            return (
              <Fade left key={item._id}>
                <div className="col-lg-4 mx-auto m-4">
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
              </Fade>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
