import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PageWrapper from '../component/PageWrapper';
import { isValidType, isUndefinedOrNull } from '../../../helpers/utils'

class PageWrapperContainer extends Component {
  /**
   * isNotFooterAndOrNavigationBar
   *  - This is a safety check to prevent the NavigationBar and or Footer from requesting a PageWrapper 
   *    this is required because PageWrapper invokes NavigationBar and Footer, henece would cause an infinite loop.
   */
  isNotFooterAndOrNavigationBar = () => {
    const children = this.props.children

    if (isValidType(children, ["array"])) {
      for (let i = 0; i < children.length; i++) {
        const name = children[i].type.name
        if (name === "Footer" || name === "NavigationBar") {
          return false;
        }
      }
      return true;
    } else if (!isUndefinedOrNull(children)) {
      const name = children.type.name
      return !(name === "Footer" || name === "NavigationBar")
    }
  }

  render () {
    if (this.isNotFooterAndOrNavigationBar()) {
      return (<PageWrapper children={this.props.children}/>)
    } else {
      console.error ("Invalid Wrapper Element, Navigation and Footer can not be page wrappers")
      return (<div> {"Invalid Wrapper Element, Navigation and Footer can not be page wrappers"} </div>)
    }
  }
}

export default PageWrapperContainer