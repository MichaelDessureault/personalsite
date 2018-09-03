import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from '../styles/PageWrapper.css'
import { HeaderContainer, FooterContainer } from '../../index'

/**
 * PageWrapper 
 *  - This wraps a new page in a NavigationBar and Footer tag.
 *  - It also aligns the page
 * 
 */
class PageWrapper extends Component {
  render () {
    return (
      <div>
        <HeaderContainer />
        <div id={"page-wrapper-inner-content"} className={styles.innerContainer}>
          {this.props.children}
        </div>
        <FooterContainer />
      </div>
    )
  }
}

export default PageWrapper