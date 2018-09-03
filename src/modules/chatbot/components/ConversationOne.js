import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Chatbot from 'react-simple-chatbot'
import chatbotStyles from '../styles/ChatbotStyles'

import { 
  CustomColourWheel, 
  CustomMultiSelectOptions, 
  CustomPetSelection 
} from '../index'

/*
Converstation:
  Hello, my name is Jimmy
  Let's get started with a few questions.
  What is your first name? - Input
  What is your last name?  - Input
  Do you want to provide your middle name? - Yes / No
    Yes: Okay, what is your middle name?
  I see you're currently in the general area of ${props.getGeoCity()}, is this your current city? - Yes/No
    No: Okay, what is your current city?
  What is your favourite colour? - Color Wheel component
  Do you own any pets? - Yes/No
    Yes: Pet component
  Do you play any sports? - Yes/No
    Yes: Multiple Select component
  Do you have a hobby you like to do? - Yes / No
    Yes: Okay, What is your main hobby you do?
  Well that's all the questions I have for you today.
  Quick note before I leave you
  The data entered here, will be stored in local storage for furture use if enabled.
  If you want to restart the conversation please click the restart button.
*/


/* Chatbot documentation: https://lucasbassetti.com.br/react-simple-chatbot/#/docs/chatbot */
/* IMPORTANT: If any fields are added or removed make sure to change the number of fields value in ChatbotContainer */
class ConversationOne extends Component {

  progressBarUpdateTrigger = (percent, trigger) => {
    this.props.handleUpdateProgressBar(percent);
    return trigger;
  }

  isGeoCityFound = () => {
    // Get the geoCity 1 step early because if it comes back
    // undefined we dont want to prompt them with an undefined
    return this.props.getGeoCity() !== undefined;
  }

  render() {
    const props = this.props;

    return (
      <Chatbot
        handleEnd={props.handleEnd}
        hideUserAvatar={true}
        style={chatbotStyles.rootContainerStyle}
        contentStyle={chatbotStyles.contentStyle}
        customStyle={chatbotStyles.customElementStyle}
        bubbleOptionStyle={chatbotStyles.bubbleOptionStyle}
        bubbleStyle={chatbotStyles.bubbleElementStyle}
        footerStyle={chatbotStyles.footerStyle}
        inputStyle={chatbotStyles.inputStyle}
        botDelay={500}
        userDelay={500}
        steps={[
          {
            id: "hello",
            message: "Hello, my name is Jimmy",
            trigger: "favourite-colour-input-2",
          },
          {
            id: "favourite-colour-input-2",
            waitAction: true,
            component: (
            <CustomColourWheel colourWheelImageNumber={5}/>
            ),
            trigger: event => {
              return this.progressBarUpdateTrigger(
                props.progressBarIncreasePerQuestion,
                "any-pets-option"
              );
            }
          },
          {
            id: "hello",
            message: "Hello, my name is Jimmy",
            trigger: "lets-get-started",
          },
          {
            id: "lets-get-started",
            message: "Let's get started with a few questions",
            trigger: "first-name",
          },
          {
            id: "first-name",
            message: "What is your first name?",
            trigger: "first-name-input",
          },
          {
            id: "first-name-input",
            user: true,
            validator: input => {
              /* can do input validation */
              return true
            },
            trigger: event => {
              return this.progressBarUpdateTrigger(
                props.progressBarIncreasePerQuestion,
                "last-name"
              )
            }
          },
          {
            id: "last-name",
            message: "What is your last name?",
            trigger: "last-name-input",
          },
          {
            id: "last-name-input",
            user: true,
            trigger: event => {
              return this.progressBarUpdateTrigger( 
                props.progressBarIncreasePerQuestion,
                "middle-name-option"
              )
            }
          },
          {
            id: "middle-name-option",
            message: "Do you want to provide your middle name?",
            trigger: "middle-name-option-input",
          },
          {
            id: "middle-name-option-input",
            options: [
              { value: "yes", label: "Yes", trigger: "yes-middle-name"},
              { value: "no", label: "No", 
                trigger: event => {
                  return this.progressBarUpdateTrigger(
                    props.progressBarIncreasePerQuestion,
                    this.isGeoCityFound() ? "confirm-current-city" : "current-city"
                  )
                }
              }
            ]
          },
          {
            id: "yes-middle-name",
            message: "Okay, what is your middle name?",
            trigger: "middle-name-input",
          },
          {
            id: "middle-name-input",
            user: true,
            trigger: event => {
              return this.progressBarUpdateTrigger(
                props.progressBarIncreasePerQuestion,
                this.isGeoCityFound() ? "confirm-current-city" : "current-city"
              )
            }
          },
          {
            id: "confirm-current-city",
            message: e => {
              return `I see you're currently in the general area of ${props.getGeoCity()}, is this your current city?`;
            },
            trigger: "confirm-current-city-input"
          },
          {
            id: "confirm-current-city-input",
            options: [
              {
                value: "yes",
                label: "Yes",
                trigger: event => {
                  return this.progressBarUpdateTrigger(
                    props.progressBarIncreasePerQuestion,
                    "favourite-colour"
                  );
                }
              },
              { value: "no", label: "No", trigger: "current-city" }
            ]
          },
          {
            id: "current-city",
            message: "Okay, what's your current city?",
            trigger: "current-city-input"
          },
          {
            id: "current-city-input",
            user: true,
            trigger: event => {
              return this.progressBarUpdateTrigger(
                props.progressBarIncreasePerQuestion,
                "favourite-colour"
              );
            }
          },
          {
            id: "favourite-colour",
            message: "What is your favourite colour?",
            trigger: "favourite-colour-input"
          },
          {
            id: "favourite-colour-input",
            waitAction: true,
            component: (
            <CustomColourWheel colourWheelImageNumber={5}/>
            ),
            trigger: event => {
              return this.progressBarUpdateTrigger(
                props.progressBarIncreasePerQuestion,
                "any-pets-option"
              );
            }
          },
          {
            id: "any-pets-option",
            message: "Do you own any pets?",
            trigger: "any-pets-option-input"
          },
          {
            id: "any-pets-option-input",
            options: [
              { value: "yes", label: "Yes", trigger: "has-pets" },
              { value: "no", label: "No", 
                trigger: event => {
                  return this.progressBarUpdateTrigger(
                    props.progressBarIncreasePerQuestion,
                    "sports-option"
                  );
                } 
              },
            ]
          },
          {
            id: "has-pets",
            message: "Okay, please add your pets",
            trigger: "has-pets-input",
          },
          {
            id: "has-pets-input",
            waitAction: true,
            component: (
              <CustomPetSelection 
                name={"has-pets-inputs"}
                pets={props.getPetList}
              />
            ),
            trigger: event => {
              return this.progressBarUpdateTrigger(
                props.progressBarIncreasePerQuestion,
                "sports-option"
              );
            }
          },
          {
            id: "sports-option",
            message: "Do you play any sports",
            trigger: "sports-option-input",
          },
          {
            id: "sports-option-input",
            options: [
              { value: "yes", label: "Yes", trigger: "plays-sports" },
              { value: "no", label: "No", 
                trigger: event => {
                  return this.progressBarUpdateTrigger(
                    props.progressBarIncreasePerQuestion,
                    "hobby"
                  );
                } 
              },
            ]
          },
          {
            id: "plays-sports",
            waitAction: true,
            component: (
              <CustomMultiSelectOptions
                name={"plays-sports-options"}
                getOptions={props.getSportList}
              />
            ),
            trigger: event => {
              return this.progressBarUpdateTrigger(
                props.progressBarIncreasePerQuestion,
                "hobby"
              );
            }
          },
          {
            id: "hobby",
            message: "What is your main hobby you do?",
            trigger: "hobby-input"
          },
          {
            id: "hobby-input",
            user: true,
            trigger: event => {
              return this.progressBarUpdateTrigger(
                props.progressBarIncreasePerQuestion,
                "end-messages"
              );
            }
          },
          {
            id: "end-messages",
            message: "Well that's all the questions I have for you",
            trigger: "end-message-2"
          },
          {
            id: "end-message-2",
            message: "Quick notes before you leave",
            trigger: "end-message-2-note-1"
          },
          {
            id: "end-message-2-note-1",
            message: "The data entered here, will be stored in local storage for furture use if enabled.",
            trigger: "end-message-2-note-2"
          },
          {
            id: "end-message-2-note-2",
            message: "If you want to restart the conversation please click the restart button",
            end: true
          }
        ]}
      />
    )
  }
}

export default ConversationOne

