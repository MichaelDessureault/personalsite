import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/ProgressBar.css'

class ProgressBar extends Component {
  static propTypes = {
    precentage: PropTypes.number.isRequired
  }

  render() {
    return (
      <div className={styles.mainContainer}>
        <div className={styles.progress} style={{ width: `${this.props.precentage}%` }} />
      </div>
    )
  }
}

export default ProgressBar