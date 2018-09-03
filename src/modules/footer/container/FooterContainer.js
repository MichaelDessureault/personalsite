import React, { Component } from 'react'
import PropTypes from 'prop-types'

import NavigationFooter from '../components/NavigationFooter'
import FooterDetails from '../components/FooterDetails'

import { ElementWrapperContainer } from '../../index';
import styles from '../styles/footer.css'
import { navigationLinks } from '../../../helpers/navigation';

class FooterContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      footerClassCurrent: "footerRelative",
      footerClass: styles.footerRelative,
    }
  }

  componentDidMount() {
    const headerHeight = document.getElementById("header").clientHeight
    const contentHeight = document.getElementById("page-wrapper-inner-content").clientHeight
    const footerHeight = document.getElementById("footer").clientHeight
    const pageHeight = window.innerHeight

    if (contentHeight < (pageHeight - headerHeight - footerHeight)) {
      if (this.state.footerClassCurrent !== "footerFixed") {
        this.setState({ footerClass: styles.footerFixed, footerClassCurrent: "footerFixed" })
      }
    } else {
      if (this.state.footerClassCurrent !== "footerRelative") {
        this.setState({ footerClass: styles.footerRelative, footerClassCurrent: "footerRelative" })
      }
    }
  }

  render() {
    return (
      <div id={"footer"} className={this.state.footerClass}>
        <ElementWrapperContainer
          style={{
            padding: "30px 0px",
            contentCenter: true,
          }}
        >
          <div className={styles.footerContent}>
            <div className={styles.footerNavigation}>
              <NavigationFooter
                header={"Navigation"}
                items={[
                  {
                    isOffsiteLink: false,
                    navigationObj: navigationLinks.about,
                  },
                  {
                    isOffsiteLink: false,
                    navigationObj: navigationLinks.chatbot,
                  },
                  {
                    isOffsiteLink: false,
                    navigationObj: navigationLinks.api.submenu.googlemaps,
                  },
                  {
                    isOffsiteLink: false,
                    navigationObj: navigationLinks.api.submenu.giphy,
                  },
                ]}
              />
              <NavigationFooter
                header={"Social"}
                items={[
                  {
                    isOffsiteLink: true,
                    navigationObj: {
                      link: "https://www.linkedin.com/in/michael-dessureault-a89899134/",
                      label: "Linkedin",
                    }
                  },
                  {
                    isOffsiteLink: true,
                    navigationObj: {
                      link: "https://github.com/MichaelDessureault",
                      label: "Github",
                    }
                  }
                ]}
              />
            </div>
            <FooterDetails />
          </div>
        </ElementWrapperContainer>
      </div>
    )
  }
}

export default FooterContainer