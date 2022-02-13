import React, { memo } from 'react';
import { TitleWrapper } from './Titles.styled';

const Titles = ({ title, subtitle }) => {
  return (
    <TitleWrapper>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </TitleWrapper>
  );
};

export default memo(Titles);
