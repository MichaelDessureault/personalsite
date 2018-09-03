import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/ElementWrapper.css'

class ElementWrapper extends Component {
  static propTypes = {
    backgroundImage: PropTypes.string,
    centerContent: PropTypes.bool,
    style: PropTypes.shape({
      column: PropTypes.bool,
      wrap: PropTypes.bool,
      itemsCenter: PropTypes.bool,
      contentCenter: PropTypes.bool,
      padding: PropTypes.string,
    })
  }

  static defaultProps = {
    centerContent: false,
    style: { 
      column: true,
      wrap: false,
      itemsCenter: false,
      contentCenter: false,
      padding: "0px",
    }
  }

  getStyleObject = () => {
    const wrapperStyle = this.props.style;

    // flex structure
    let styleObject = { display: "flex" }
    styleObject.flexDirection = (wrapperStyle.column) ? "column" : "row"
    styleObject.flexWrap = (wrapperStyle.wrap) ? "wrap" : "nowrap"
    styleObject.alignItems = (wrapperStyle.itemsCenter) ? "center" : "flex-start"
    styleObject.justifyContent = (wrapperStyle.contentCenter) ? "center" : "flex-start"
    
    // padding
    styleObject.padding = wrapperStyle.padding

    return styleObject
  }


  render() {
    return (
      // outterContainer allows for a full screen background
      <div
        style={{ backgroundImage: this.props.backgroundImageUrl }}
        className={styles.outterContainer}
      >
        <div
          style={this.getStyleObject()}
          className={ styles.baseInnerContainer }
        >
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default ElementWrapper