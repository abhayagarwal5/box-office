import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
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
    apiGet(`/shows/${id}?embed[]=episodes&embed[]=cast`)
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
  console.log(show);

  if (isLoading) {
    return <div>Data is being loaded</div>;
  }
  if (error) {
    return <div>Error occured: {error}</div>;
  }
  return <div>This is show page</div>;
};

export default Show;
