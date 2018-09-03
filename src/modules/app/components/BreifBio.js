import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/BreifBio.css'
import { isUndefinedOrNull } from '../../../helpers/utils';
import SeeMoreLink from './SeeMoreLink';

class BreifBio extends Component {
  static propTypes = {
    imgSrc: PropTypes.string,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    bio: PropTypes.string.isRequired,
    navigationObj: PropTypes.object, // Navigation Object
    linkClicked: PropTypes.func,
    linkText: PropTypes.string,
  }

  render() {
    return (
      <div className={styles.container}>
        {!isUndefinedOrNull(this.props.imgSrc)
          ? (
            <div className={styles.imageContainer}>
              <img alt="mypicture" src={this.props.imgSrc} width={150} height={150} />
            </div>
          ) : null
        }

        <div className={styles.bioContainer}>
          {/* information */}
          <h2 className={styles.title}> {this.props.title} </h2>
          <div className={styles.subTitle}> {this.props.subTitle} </div>
          <p className={styles.text}> {this.props.bio} </p>

          <SeeMoreLink
            navigationObj={this.props.navigationObj}
            linkClicked={this.props.linkClicked}
            linkText={this.props.linkText}
          />
        </div>
      </div>
    )
  }
}

export default BreifBio