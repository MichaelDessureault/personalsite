import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import App from '../components/App'
import { PageWrapperContainer } from '../../index'

import { operators as aboutActionCreators } from '../../../store/modules/about'

class AppContainer extends Component {
  dispatchAboutStartPoint = (value) => {
    this.props.handleAboutStartPoint(value)
  }

  render () {
    return (
      <div id={"AppContainer"}>
        <PageWrapperContainer>
          <App dispatchAboutStartPoint={this.dispatchAboutStartPoint}/>
        </PageWrapperContainer>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({...aboutActionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)