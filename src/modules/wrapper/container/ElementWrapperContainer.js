import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ElementWrapper from '../component/ElementWrapper';

class ElementWrapperContainer extends Component {
  render() {
    return (
      <ElementWrapper
        children={this.props.children}
        backgroundImageUrl={this.props.backgroundImageUrl}
        style={this.props.style}
      />
    )
  }
}

export default ElementWrapperContainer