import styled from 'styled-components';

import injectStyles from '../../utils/inject-styles';

const Nav = injectStyles(styled.nav`
  padding: 20px;
  background-color: #072938;
  color: white;
  grid-area: header;
`);

export default Nav;
