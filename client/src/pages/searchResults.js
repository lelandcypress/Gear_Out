// import any major components, such as card
import Card from '../components/Card';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORY_SEARCH } from '../utils/queries';

// Props if we need them
const SearchResults = ({ props }) => {

    const { searchQuery } = useParams();
    const { loading, data } = useQuery(QUERY_CATEGORY_SEARCH, {
        variables: { categoryQuery: searchQuery },
    });

    const results = data?.category || {};

    if (loading) {
        return (
            <>
                <h2>Loading, please wait...</h2>
            </>
        );
    }

    return (
        <>
            <ul>
                {results.map((item) => {
                    return (
                        <li>
                            <Card 
                                key={item._id}
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