import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/HeaderStyles.css'
import NavigationBar from '../components/navigation/NavigationBar'

class HeaderContainer extends Component {
  render () {
    return (
      <div className={styles.header}>
        <div className={styles.headerSection}>
          <NavigationBar/>
        </div>
      </div>
    )
  }
}

export default HeaderContainer