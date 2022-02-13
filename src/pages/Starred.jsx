import React, { useEffect, useReducer } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';
import { useShows } from '../misc/custom-hooks';
const reducer = (prevState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { isLoading: false, error: null, shows: action.show };
    case 'FETCH_FAILURE':
      return { ...prevState, isLoading: false, error: action.error };
    case 'NO_STARRED':
      return { ...prevState, isLoading: false, show: null };
    default:
      return prevState;
  }
};
const initialState = {
  isLoading: true,
  shows: null,
  error: null,
};
const Starred = () => {
  const [starred] = useShows();
  const [{ shows, error, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map(showId => apiGet(`/shows/${showId}`));
      Promise.all(promises)
        .then(apiData => apiData.map(show => ({ show })))
        .then(results => dispatch({ type: 'FETCH_SUCCESS', show: results }))
        .catch(err => dispatch({ type: 'FETCH_FAILURE', error: err }));
    } else {
      dispatch({ type: 'NO_STARRED' });
    }
  }, [starred]);
  return (
    <MainPageLayout>
      {isLoading && <div>Shows are still loading</div>}
      {error && <div>Error occured: {error}</div>}
      {!isLoading && !shows && <div>No Shows were starred</div>}
      {!isLoading && !error && shows && <ShowGrid data={shows} />}
    </MainPageLayout>
  );
};

export default Starred;
