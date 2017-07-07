import React, { Component } from 'react';
import PropTypes from 'prop-types';
import merge from 'lodash.merge';
import { connect } from 'react-redux';
import autobind from 'react-autobind';

import Page from './Page';
import Navigation from './Navigation';
import Heading from './Heading';
import defaultStyles from '../styles';
import reduceWizard from '../utils/reduce-wizard';

import StyledWizard from '../primitives/Wizard';

class Wizard extends Component {
  static propTypes = {
    schema: PropTypes.array,
    styles: PropTypes.object,
  };

  static defaultProps = {
    schema: '',
    styles: {},
  };

  static childContextTypes = {
    styles: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      result: false,
    };
    autobind(this);
  }

  getChildContext() {
    return {
      styles: merge({}, defaultStyles, this.props.styles),
    };
  }

  nextPage() {
    this.setState({
      page: this.state.page + 1,
    });
  }

  previousPage() {
    this.setState({
      page: this.state.page - 1,
    });
  }

  render() {
    const { schema } = this.props;
    return (
      <StyledWizard>
        <Heading />
        <Page
          heading={schema[this.state.page].heading}
          children={schema[this.state.page].children}
        />
        <Navigation
          page={this.state.page}
          nextPage={this.nextPage}
          previousPage={this.previousPage}
        />
      </StyledWizard>
    );
  }
}

const mapStateToProps = (state, props) => ({
  schema: reduceWizard(props.schema, state),
});

export default connect(mapStateToProps)(Wizard);
