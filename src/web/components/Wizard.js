import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autobind from 'react-autobind';

import StyleProvider from './StyleProvider';
import Nav from './Nav';
import Page from './Page';
import reduceWizard from '../utils/reduce-wizard';
import { getPages, getNodeTitles } from '../utils/selectors';
import track from '../utils/tracking';
import Result from './Result';

import Grid from '../primitives/grid/Grid';
import StyledWizard from '../primitives/Wizard';

class Wizard extends Component {
  static propTypes = {
    wizard: PropTypes.object.isRequired,
    schema: PropTypes.array.isRequired,
    exports: PropTypes.objectOf(PropTypes.func),
    styles: PropTypes.object,
    debug: PropTypes.bool,
    tableOfContents: PropTypes.arrayOf(PropTypes.object).isRequired,
    translations: PropTypes.objectOf(
      PropTypes.shape({
        heading: PropTypes.string,
        description: PropTypes.string,
        tooltips: PropTypes.string,
        image: PropTypes.shape({
          small: PropTypes.string.isRequired,
          large: PropTypes.string.isRequired,
        }),
      }),
    ),
  };

  static defaultProps = {
    styles: {},
    exports: {},
    translations: {},
    debug: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      result: false,
    };
    autobind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.page !== prevState.page) {
      track(
        this.props.schema.filter(item => item.id === this.state.page)[0]
          .heading,
      );
    }
  }

  // @todo Consider finding a more elegant way for scrolling..?
  setPage(page, property = null) {
    if (property) {
      setImmediate(() => {
        const element = document.getElementById(property);

        if (!element) {
          return;
        }

        window.scroll(0, element.offsetTop);
      });
    } else {
      window.scrollTo(0, 0);
    }

    this.setState({ page });
  }

  getCurrentIndex() {
    return Math.max(
      0,
      this.props.schema.findIndex(({ id }) => id === this.state.page),
    );
  }

  changePage(distance) {
    const schema = this.props.schema;
    const pageIndex = this.getCurrentIndex();

    const newIndex = pageIndex + distance;

    if (newIndex >= schema.length || newIndex < 0) {
      return;
    }

    this.setPage(schema[newIndex].id);
  }

  nextPage = () => this.changePage(1);

  previousPage = () => this.changePage(-1);

  render() {
    const { wizard, styles, schema, debug, tableOfContents, exports } = this.props;
    const pageIndex = this.getCurrentIndex();
    const page = schema[pageIndex];

    return (
      <StyleProvider styles={styles}>
        <StyledWizard>
          <Grid>
            <Nav
              page={page.id}
              setPage={this.setPage}
              heading={wizard.meta.title}
              tableOfContents={tableOfContents}
            />
            {page.type === 'Result' ? (
              <Result
                {...page}
                previousPage={this.previousPage}
                debug={debug}
                pageid={page.id}
                wizard={wizard}
                schema={schema}
                setPage={this.setPage}
                exports={exports}
              />
            ) : (
              <Page
                nextPage={this.nextPage}
                previousPage={this.previousPage}
                debug={debug}
                pageid={page.id}
                firstPage={schema[0].id === page.id}
                {...page}
              />
            )}
          </Grid>
        </StyledWizard>
      </StyleProvider>
    );
  }
}

const mapStateToProps = (state, { wizard, translations }) => {
  const nodeTitles = getNodeTitles(wizard.schema, translations);

  return {
    debug: window.location.search.match('debug'),
    tableOfContents: getPages(wizard.schema, state, nodeTitles, translations),
    schema: reduceWizard(wizard.schema, state, nodeTitles, translations),
  };
};

export default connect(mapStateToProps)(Wizard);
