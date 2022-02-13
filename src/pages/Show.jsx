/* eslint-disable no-underscore-dangle */
import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Cast from '../components/show/Cast';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import { InfoBlock, ShowPageWrapper } from '../components/show/Show.styled';
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
    <ShowPageWrapper>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />

      <InfoBlock>
        <h2>Details</h2>
        <Details
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </InfoBlock>

      <InfoBlock>
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.seasons} />
      </InfoBlock>

      <InfoBlock>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
      </InfoBlock>
    </ShowPageWrapper>
  );
};

export default Show;
