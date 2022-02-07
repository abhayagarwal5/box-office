import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { apiGet } from '../misc/config';
const Home = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);
  const onSearch = () => {
    apiGet(`search/shows?q=${input}`).then(result => {
      // console.log(result);
      setResults(result);
    });
  };
  const onInputChange = event => {
    setInput(event.target.value);
  };
  const onKeyDown = event => {
    if (event.keyCode === 13) {
      onSearch();
    }
  };
  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>No results</div>;
    }
    if (results && results.length > 0) {
      return (
        <div>
          {results.map(item => (
            <div key={item}>{item.show.name} </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <MainPageLayout>
      <input
        type="text"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
