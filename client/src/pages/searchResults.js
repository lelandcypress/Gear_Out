// import any major components, such as card
import Card from '../components/Card';
import { useParams, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORY_SEARCH } from '../utils/queries';

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
        return  <Redirect  to="/404" />
    }

    return (
        <>
            <ul>
                {results.map((item) => {
                    return (
                        <li
                            key={item._id}
                        >
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
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

export default SearchResults;