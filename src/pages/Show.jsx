import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';
const Show = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMount = true;
    apiGet(`/shows/${id}?embed[]=episodes&embed[]=cast`)
      .then(result => {
        if (isMount) {
          setIsLoading(false);
          setShow(result);
        }
      })
      .catch(err => {
        if (isMount) {
          setError(err.message);
          setIsLoading(false);
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
  console.log(show);
  return <div>This is show page</div>;
};

export default Show;
