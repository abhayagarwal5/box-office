/* eslint-disable no-underscore-dangle */
import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Cast from '../components/show/Cast';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import ShowMainData from '../components/show/ShowMainData';
import { apiGet } from '../misc/config';
const reducer = (prevState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { isLoading: false, error: null, show: action.show };
    case 'FETCH_FAILURE':
      return { ...prevState, isLoading: false, error: action.error };
    default:
      return prevState;
  }
};
const initialState = {
  isLoading: true,
  show: null,
  error: null,
};
const Show = () => {
  const { id } = useParams();
  const [{ show, error, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const [show, setShow] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    let isMount = true;
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(result => {
        if (isMount) {
          dispatch({ type: 'FETCH_SUCCESS', show: result });
        }
      })
      .catch(err => {
        if (isMount) {
          dispatch({ type: 'FETCH_FAILURE', error: err.message });
        }
      });
    return () => {
      isMount = false;
    };
  }, [id]);

  if (isLoading) {
    return <div>Data is being loaded</div>;
  }
  if (error) {
    return <div>Error occured: {error}</div>;
  }
  return (
    <div>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />

      <div>
        <h2>Details</h2>
        <Details
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </div>

      <div>
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.seasons} />
      </div>

      <div>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
      </div>
    </div>
  );
};

export default Show;
