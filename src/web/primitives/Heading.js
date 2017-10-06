import styled from 'styled-components';

import injectStyles from '../utils/inject-styles';

export const H1 = injectStyles(styled.h1`
  font-family: ${({ styles }) => styles.font.secondary};
  font-size: ${props => props.small ? '20px' : '50px'};
  font-weight: ${props => props.small ? '300' : '500'};
  line-height: 1.2;
`);

export const H2 = injectStyles(styled.h2`
  font-family: ${({ styles }) => styles.font.secondary};
  font-size: ${props => props.small ? '24px' : '32px'};
  margin: 0 0 10px;
  line-height: 1.3;
`);

export const H3 = injectStyles(styled.h3`
  font-family: ${({ styles }) => styles.font.primary};
  font-size: ${props => (props.small ? '16px' : '20px')};
  margin: 0 0 10px;
  line-height: 1.3;
`);

export const H4 = injectStyles(styled.h4`
  font-family: ${({ styles }) => styles.font.primary};
  font-size: ${props => (props.small ? '16px' : '20px')};
  margin: 0 0 6px;
  line-height: 1.3;
`);

export const H5 = injectStyles(styled.h5`
  font-family: ${({ styles }) => styles.font.primary};
  font-size: 1em;
  margin: 0;
  line-height: 1.3;
`);
