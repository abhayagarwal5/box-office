import React from 'react';
// import { Switch, Route } from 'react-router-dom';
import Navs from './Navs';
import Titles from './Titles';

const MainPageLayout = ({ children }) => {
  return (
    <div>
      <Titles
        title="Box Office"
        subtitle="Are you looking for a movie or an actor?"
      />
      <Navs />
      {children}
    </div>
  );
};

export default MainPageLayout;
