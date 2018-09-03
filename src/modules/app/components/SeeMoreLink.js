import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/SeeMoreLink.css'
import { Link } from 'react-router-dom'
import { isValidObject } from '../../../helpers/utils';

class SeeMoreLink extends Component {
  static propTypes = {
    navigationObj: PropTypes.object, // Navigation Object
    linkClicked: PropTypes.func,
    linkText: PropTypes.string,
    absoluteBottom: PropTypes.bool,
  }

  static defaultProps = {
    absoluteBottom: false
  }
  
  render () {
    // validate that it's a valid object to use for link
    if (isValidObject(this.props.navigationObj, ["link"])) {
      return (
        <Link
          className={(this.props.absoluteBottom) ? styles.absoluteBottom : styles.link}
          to={{ pathname: this.props.navigationObj.link }}
          onClick={this.props.linkClicked}>
          {this.props.linkText}
        </Link>
      )
    } else {
      return (<div style={{display:"none"}}> </div>)
    }
  }
}

export default SeeMoreLink