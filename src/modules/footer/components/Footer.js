import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from '../styles/footer.css'
import { ElementWrapperContainer } from '../..';

class Footer extends Component {
  render () {
    return (
      <ElementWrapperContainer>
        <div className={styles.mainContainer}>
          {"This is a footer"}
          {"I will contain links from the navigation stuff, i will contain links to linkden, github, and more..."}
        </div>
      </ElementWrapperContainer>
    )
  }
}

export default Footer