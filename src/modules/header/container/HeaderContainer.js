import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/HeaderStyles.css'
import NavigationBar from '../components/navigation/NavigationBar'
import { ElementWrapperContainer } from '../..';

class HeaderContainer extends Component {
  render () {
    return (
      <div id={"header"} className={styles.header}>
        <ElementWrapperContainer>
          <NavigationBar/>
        </ElementWrapperContainer>
      </div>
    )
  }
}

export default HeaderContainer