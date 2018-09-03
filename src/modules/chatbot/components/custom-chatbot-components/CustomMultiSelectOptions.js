import React, { Component } from "react";
import PropTypes from "prop-types";

import { keys } from '../../../../helpers/utils'

import {
  customContainer,
  optionListContainer,
  optionStyle,
  optionElement,
  optionElementSelected,
  disabledElement,
} from "../../styles/ChatbotContainerStyles.css";

/*
  For the options i keep the same layout how the chatbot does theres
  ul > li > a
*/

function Option({ option, clicked, index }) {
  return (
    <li className={optionStyle}>
      <a
        data-cy={`options`}
        data-helper-selected={option.selected}
        className={
          option.selected
            ? `${optionElementSelected} ${optionElement}`
            : `${optionElement}`
        }
        onClick={e => {
          e.preventDefault();
          clicked(option);
        }}
      >
        {option.label}
      </a>
    </li>
  );
}

function DoneOption({ enabled, done }) {
  function clicked(e) {
    if (enabled) {
      e.preventDefault();
      done();
    }
  }
  return (
    <li className={optionStyle}>
      <a
        data-cy="done-option"
        data-helper-enabled={enabled}
        className={
          !enabled ? `${disabledElement} ${optionElement}` : optionElement
        }
        onClick={clicked}
      >
        {"Done"}
      </a>
    </li>
  );
}

function SelectAllOption({ active, clicked }) {
  return (
    <li className={optionStyle}>
      <a
        data-cy="all-option"
        data-helper-selected={active}
        className={
          active
            ? `${optionElementSelected} ${optionElement}`
            : `${optionElement}`
        }
        onClick={e => {
          e.preventDefault();
          clicked();
        }}
      >
        {"All"}
      </a>
    </li>
  );
}

/**
 * CustomMultiSelectOptions is created to allow for multiple selections for the Option element
 */
class CustomMultiSelectOptions extends Component {
  static propTypes = {
    options: PropTypes.array, // Array of objects that looks like this: { value: {any}, label: {string}, selectall: {true | false}}
    getOptions: PropTypes.func,
    allSelectedMessage: PropTypes.string
  };

  static defaultProps = {
    allSelectedMessage: "All selected"
  };

  constructor(props) {
    super(props);

    this.state = {
      done: false,
      selectallActive: false,
      selections: []
    };
  }

  componentWillMount() {
    // Verify that either an option array was passed or an getOptions function
    if (this.props.options === undefined && this.props.getOptions === undefined) {
      console.error("CustomMultiSelectOptions:: Invalid props passed, requires an option array or getOptions function") 
    } else if (this.props.options === undefined) {
      this.props.options = this.props.getOptions()
    }

    // Verify that the options is setup correctly; contains value and label
    const { options } = this.props;
    for (let key in options) {
      let option = options[key];
      if (!option.hasOwnProperty("value") || !option.hasOwnProperty("label")) {
        console.error(
          `CustomOptions:: For ${
          this.props.id
          } is not setup correctly, each option must contain 'value', 'label'`
        );
        break;
      } else {
        // add a selected key to each option
        option.selected = false;
      }
    }
  }

  done = () => {
    const { selections } = this.state;
    // delete each selected key from the objects before going to next step
    keys(selections).forEach(key => delete selections[key].selected);
    this.setState({ done: true });
    this.props.triggerNextStep({ value: selections });
  };

  formatedSelection = () => {
    const length = this.state.selections.length;
    let formatedStr = "";
    if (this.state.selections.length === this.props.options.length) {
      formatedStr = !!this.props.allSelectedMessage
        ? this.props.allSelectedMessage
        : "All selected.";
    } else {
      this.state.selections.forEach((option, index) => {
        formatedStr +=
          index === length - 1 ? option.label : option.label + ", ";
      });
    }

    return formatedStr;
  };

  allClicked = () => {
    const { selectallActive } = this.state;
    const { options } = this.props;

    keys(options).forEach(key => {
      options[key].selected = !selectallActive;
    });

    this.setState({
      selectallActive: !selectallActive,
      selections: !selectallActive ? [...options] : []
    });
  };

  optionClicked = option => {
    const { selections } = this.state;
    const { options } = this.props;

    // if selection includes the option then remove it, else add it
    if (selections.includes(option)) {
      let index = selections.indexOf(option);
      selections.splice(index, 1);

      // set it to deselected
      option.selected = false;
      // since one has been deselected then selectallActive is false
      this.setState({ selectallActive: false, selections });
    } else {
      // set it to selected then push it
      option.selected = true;
      selections.push(option);

      if (selections.length === options.length) {
        this.setState({ selectallActive: true, selections });
      } else {
        this.setState({ selections });
      }
    }
  };

  render() {
    const { options, name, datacy } = this.props;

    return (
      <div name={name} data-cy={datacy} className={customContainer}>
        {!this.state.done ? (
          !!options && options.length !== 0 ? (
            <ul className={optionListContainer}>
              <SelectAllOption
                active={this.state.selectallActive}
                clicked={this.allClicked}
              />

              {/* Options */}
              {keys(options).map((key, index) => {
                return (
                  <Option
                    key={index}
                    option={options[key]}
                    clicked={this.optionClicked}
                  />
                );
              })}

              {/* Add the Done option for the last */}
              <DoneOption
                done={this.done}
                enabled={this.state.selections.length !== 0}
              />
            </ul>
          ) : null
        ) : null}

        {/* Show the div for the selection */}
        {this.state.done ? (
          <div className={"rsc-ts-bubble kFPviT"}>
            {" "}
            {this.formatedSelection()}{" "}
          </div>
        ) : null}
      </div>
    );
  }
}

export default CustomMultiSelectOptions
