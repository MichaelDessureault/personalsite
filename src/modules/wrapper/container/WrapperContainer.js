// import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import PageWrapper from '../component/PageWrapper'
// import ElementWrapper from '../component/ElementWrapper'

// import { isValidType, isUndefinedOrNull } from '../../../helpers/utils'

// class WrapperContainer extends Component {
//   static propTypes = {
//     isPageWrapper: PropTypes.bool
//   }

//   static defaultProps = {
//     isPageWrapper: false
//   }

//   /**
//    * isNotFooterAndOrNavigationBar
//    *  - This is a safety check to prevent the NavigationBar and or Footer from requesting a PageWrapper 
//    *    this is required because PageWrapper invokes NavigationBar and Footer, henece would cause an infinite loop.
//    */
//   isNotFooterAndOrNavigationBar = () => {
//     const children = this.props.children

//     if (isValidType(children, ["array"])) {
//       for (let i = 0; i < children.length; i++) {
//         const name = children[i].type.name
//         if (name === "Footer" || name === "NavigationBar") {
//           return false;
//         }
//       }
//       return true;
//     } else if (!isUndefinedOrNull(children)) {
//       const name = children.type.name
//       return !(name === "Footer" || name === "NavigationBar")
//     }
//   }

//   render () {
//     if (this.props.isPageWrapper && this.isNotFooterAndOrNavigationBar()) {
//       return (<PageWrapper children={this.props.children}/>)
//     } else {
//       return (<ElementWrapper children={this.props.children}/>)
//     }
//   }
// }

// export default WrapperContainer