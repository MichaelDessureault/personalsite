import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/App.css'
import { ElementWrapperContainer } from '../..';

class FullBackground extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    backgroundImageUrl: PropTypes.string.isRequired,
  }

  render() {
    return (
      <ElementWrapperContainer 
        backgroundImageUrl={this.props.backgroundImageUrl}
        >
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>
            {this.props.title}
          </h1>
        </div>
      </ElementWrapperContainer>
    )
  }
}

export default FullBackground