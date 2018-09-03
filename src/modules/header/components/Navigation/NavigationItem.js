import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/NavigationStyles.css'
import { keys, objectToArray } from '../../../../helpers/utils'
import { Link } from 'react-router-dom'

const InsertLink = ({ link, label, level, hasSubMenu }) => {
  const faIcon = (level === 1) ? "fa-angle-down" : "fa-angle-right"
  const navStyle = (level === 1) ? `${styles.navLink}` : `${styles.subMenuNavLink}`

  if (link !== "none") {
    return (
      <Link
        className={navStyle}
        to={{ pathname: link }}
      >
        {label}
        {hasSubMenu
          ? <span className={`fa ${faIcon} ${styles.arrow}`}> </span>
          : null
        }
      </Link>
    )
  } else {
    return (
      <div className={navStyle}>
        {label}
        {hasSubMenu
          ? <span className={`fa ${faIcon} ${styles.arrow}`}> </span>
          : null
        }
      </div>
    )
  }
}

class NavigationItem extends Component {
  static propTypes = {
    level: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,  // "none" is for no link
    hasSubMenu: PropTypes.bool.isRequired,
    submenu: PropTypes.object.isRequired,
  }

  generateSubMenuWithSeparator = () => {
    const newMap = []

    const subMenuArrayKeys = keys(this.props.submenu)

    const subMenuArray = objectToArray(this.props.submenu)

    for (let i = 0; i < subMenuArrayKeys.length; i++) {
      const key = subMenuArrayKeys[i]
      const navLink = this.props.submenu[key]

      // Add the navigation item
      newMap.push(
        <NavigationItem
          key={key}
          level={this.props.level + 1}
          link={navLink.link}
          label={navLink.label}
          hasSubMenu={(keys(navLink.submenu).length !== 0)}
          submenu={navLink.submenu}
        />
      )

      // Add the separator is it's not the end
      if (i + 1 !== subMenuArray.length) {
        newMap.push(<div key={`${key}separator`} className={styles.separator}> </div>)
      }
    }

    return (
      <ul className={(this.props.level === 1) ? styles.subMenuNavItemList : styles.subMenuNavItemListLevel2}>
        {newMap}
      </ul>
    )
  }

  render() {
    return (
      <li className={styles.navItem}>
        <InsertLink
          link={this.props.link}
          label={this.props.label}
          level={this.props.level}
          hasSubMenu={this.props.hasSubMenu}
        />

        {this.props.hasSubMenu
          ? this.generateSubMenuWithSeparator()
          : null}
      </li>
    )
  }
}

export default NavigationItem