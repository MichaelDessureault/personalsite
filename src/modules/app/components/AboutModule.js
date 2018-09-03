import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ElementWrapperContainer } from '../..';
import { isUndefinedOrNull } from '../../../helpers/utils';

import styles from '../styles/AboutModule.css'

class AboutModule extends Component {
  static propTypes = {
    title: PropTypes.string
  }

  render() {
    return (
      <ElementWrapperContainer>
        {!isUndefinedOrNull(this.props.title)
          ? (
            <h1 className={styles.title}> {this.props.title} </h1>
          ) : null
        }
        <div className={styles.contentContainer}>
          {this.props.children}
        </div>
      </ElementWrapperContainer>
    )
  }
}

export default AboutModule