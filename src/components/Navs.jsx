import React from 'react';
import { Link } from 'react-router-dom';

const LINK = [
  { to: '/', text: 'home' },
  { to: '/starred', text: 'starred' },
];

const Navs = () => {
  return (
    <div>
      <ul>
        {LINK.map(element => (
          <li key={element.to}>
            <Link to={element.to}>{element.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navs;
