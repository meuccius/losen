import PropTypes from 'prop-types';
import React from 'react';
import get from 'lodash.get';

import { Value as StyledValue } from '../../../primitives/Summary';

export default function Sum({ value, node }) {
  const { minimum, operations, values, data } = node;

  function ifMoreThanOnePropertyIsMissingValue() {
    console.log(value);
    return true;
  }

  if (ifMoreThanOnePropertyIsMissingValue()) {
    return <StyledValue missing>* Mangler verdi for utregning</StyledValue>;
  }

  const sum = values.reduce((accumulator, currentValue, currentIndex) => {
    if (operations[currentIndex] === '-') {
      return Math.max(accumulator - get(data, currentValue), minimum);
    } else if (operations[currentIndex] === '*') {
      return Math.max(accumulator * get(data, currentValue), minimum);
    } else if (operations[currentIndex] === '/') {
      return Math.max(accumulator / get(data, currentValue), minimum);
    }
    return Math.max(accumulator + get(data, currentValue), minimum);
  }, 0);
  return <StyledValue>{sum}</StyledValue>;
}

Sum.propTypes = {
  node: PropTypes.object.isRequired,
  value: PropTypes.any,
};

Sum.defaultProps = {
  value: undefined,
};
