import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/footer.css'

class FooterDetails extends Component {
  render() {
    return (
      <div className={styles.detailsContainer}>
        <p className={styles.footerCopyRight}>
          {"© 2018 Michael Dessureault All rights reserved"}
        </p>
      </div>
    )
  }
}

export default FooterDetails