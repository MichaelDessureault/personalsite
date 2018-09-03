import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { PageWrapperContainer } from '../../index'
import { clamp } from '../../../helpers/utils'
import { getUsersLocation } from '../../../helpers/apis'
import { ConversationOne, ProgressBar } from '../index'
// import styles from '../styles/ChatbotContainerStyles.css'
import "../styles/ChatbotVendorStyles.global.css";

class ChatbotContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      geoCity: undefined,
      progressBarPercentage: 0
    }
  }

  componentWillMount() {
    if (this.state.geoCity === undefined) {
      this.handleGettingUsersLocation()
    }
  }

  handleGettingUsersLocation = async () => {
    let location = await getUsersLocation();
    this.setState({ geoCity: location.city });
  };


  handleEndOfChatbotConversationOne = ({ steps }) => {
    console.log('converstation steps: ', steps);
  }

  updateProgressBarPercent = value => {
    // clamp the value between 0 and 100
    let tempValue = clamp(value, 0, 100);
    let newValue = clamp(this.state.progressBarPercentage + tempValue, 0, 100);
    this.setState({ progressBarPercentage: newValue });
  }

  //#region Functions to allow for Chatbot component to access the needed values, such as lists
  getPetList = () => {
    return this.props.petsList
  }

  getSportList = () => {
    return this.props.sportsList
  }

  getGeoCity = () => {
    return this.state.geoCity
  }
  //#endregion  

  render() {
    return (
      <PageWrapperContainer>
        <ProgressBar precentage={this.state.progressBarPercentage} />

        {/* Currently there is only 1 converstation if more gets added a function call might be useful */}
        <ConversationOne
          progressBarIncreasePerQuestion={100 / 8} // There are 8 questions and will go to 100%
          // List
          getPetList={this.getPetList}
          getSportList={this.getSportList}
          // Methods
          getGeoCity={this.getGeoCity}
          handleEnd={this.handleEndOfChatbotConversationOne}
          handleUpdateProgressBar={this.updateProgressBarPercent}
        />
      </PageWrapperContainer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,

    // petsList: state.list.pets,
    // sportsList: state.list.sports,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatbotContainer)