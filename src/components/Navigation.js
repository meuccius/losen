import React from 'react';
import PropTypes from 'prop-types';
import Button from '../primitives/Button';
import Nav from '../primitives/grid/Navigation';

export default function Navigation({ hasPrevious, previousPage, hasNext, nextPage }) {
  const previous = <Button onClick={previousPage}>Forrige</Button>;
  const next = (
    <Button next onClick={nextPage}>
      Neste
    </Button>
  );

  return (
    <Nav>
      {hasPrevious && previous}
      {hasNext && next}
    </Nav>
  );
}

Navigation.defaultProps = {
  hasNext: false,
  hasPrevious: false,
  nextPage: () => {},
  previousPage: () => {},
};

Navigation.propTypes = {
  hasNext: PropTypes.bool,
  hasPrevious: PropTypes.bool,
  nextPage: PropTypes.func,
  previousPage: PropTypes.func,
};
