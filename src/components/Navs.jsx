import React from 'react';
import { useLocation } from 'react-router';
import { NavList, LinkStyled } from './Navs.styled';

const LINK = [
  { to: '/', text: 'Home' },
  { to: '/starred', text: 'Starred' },
];

const Navs = () => {
  const location = useLocation();
  return (
    <div>
      <NavList>
        {LINK.map(element => (
          <li key={element.to}>
            <LinkStyled
              to={element.to}
              className={element.to === location.pathname ? 'active' : ''}
            >
              {element.text}
            </LinkStyled>
          </li>
        ))}
      </NavList>
    </div>
  );
};

export default Navs;
