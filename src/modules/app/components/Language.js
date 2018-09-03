import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/Language.css'
import SeeMoreLink from './SeeMoreLink';

class Language extends Component {
  static propTypes = {
    imgSrc: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    details: PropTypes.string,

    // offsite navigations (eg: www.google.ca)
    offsiteLink: PropTypes.string,

    // insite navigations
    navigationObj: PropTypes.object,
    navigationLinkClicked: PropTypes.func,
    navigationLinkText: PropTypes.string,
    absoluteBottomSeeMore: PropTypes.bool,
  }

  render() {
    return (
      <div className={styles.container}>
        <a href={this.props.offsetLink} target={"_blank"}>
          <img alt={"logo"} src={this.props.imgSrc} height={120} />
        </a>

        <h3 className={styles.name}> 
          {this.props.name} 
        </h3>

        <p className={ (!!this.props.details === false) ? styles.displaynone : styles.details}>
          {this.props.details}
        </p>

        <SeeMoreLink
          navigationObj={this.props.navigationObj}
          linkText={this.props.navigationLinkText}
          linkClicked={this.props.navigationLinkClicked}
          absoluteBottom={this.props.absoluteBottomSeeMore}
        />
      </div>
    )
  }
}

export default Language