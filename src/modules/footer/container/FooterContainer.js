import React, { Component } from 'react'
import PropTypes from 'prop-types'

import NavigationFooter from '../components/NavigationFooter'
import FooterDetails from '../components/FooterDetails'

import { ElementWrapperContainer } from '../../index';
import styles from '../styles/footer.css'
import { navigationLinks } from '../../../helpers/navigation';

class FooterContainer extends Component {
  render() {
    return (
      <div className={styles.footer}>
        <ElementWrapperContainer
          style={{
            padding: "30px 0px"
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