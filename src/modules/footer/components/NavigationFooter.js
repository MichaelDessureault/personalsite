import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from '../styles/footer.css'

class NavigationFooter extends Component {
  render() {
    return (
      <div className={styles.container}>
        <h4 className={styles.header}> {this.props.header} </h4>
        <ul className={styles.itemList}>
          {this.props.items.map((element, index) =>
            <li className={styles.item} key={index}>
              {!element.isOffsiteLink
                ? (
                  <Link
                    className={styles.link}
                    to={{ pathname: element.navigationObj.link }}
                  >
                    {element.navigationObj.label}
                  </Link>
                )
                : (
                  <a
                    className={styles.link}
                    href={element.navigationObj.link}
                    target={"_blank"}
                  >
                    {element.navigationObj.label}
                  </a>
                )
              }
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default NavigationFooter