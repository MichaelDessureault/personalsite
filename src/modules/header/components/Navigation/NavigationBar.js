import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/NavigationStyles.css'

import NavigationItem from './NavigationItem'
import { navigationLinks } from '../../../../helpers/navigation'
import { keys } from '../../../../helpers/utils'
import { ElementWrapperContainer } from '../../..';

class NavigationBar extends Component {
  render() {
    return (
      <ElementWrapperContainer>
        <div id={"navBar"} className={styles.navBarContainer}>
          <ul className={styles.navBarItemList}>
            {keys(navigationLinks).map(key => {
              const navLink = navigationLinks[key]
              return (
                <NavigationItem
                  key={key}
                  level={1}
                  link={navLink.link}
                  label={navLink.label}
                  hasSubMenu={(keys(navLink.submenu).length !== 0)}
                  submenu={navLink.submenu}
                />
              )})
            }
          </ul>
        </div>
      </ElementWrapperContainer>
    )
  }
}

export default NavigationBar

