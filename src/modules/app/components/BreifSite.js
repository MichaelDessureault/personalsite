import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Language from './Language';
import images from '../../../images/index'
import styles from '../styles/BreifSite.css'
import { navigationLinks } from '../../../helpers/navigation';


const Languages = ({ title, languages }) => {
  return (
    <div className={styles.languagesContainer}>
      <h2 className={styles.languagesTitle}> {title} </h2>
      <div className={styles.languages} >
        {languages.map((element, index) =>
          <Language
            key={index}
            imgSrc={element.imgSrc}
            name={element.name}
            details={element.details}
            offsetLink={element.offsiteLink}
            navigationObj={element.navigationObj}
            linkOnClick={element.linkOnClick}
            navigationLinkText={element.navigationLinkText}
            absoluteBottomSeeMore={element.absoluteBottomSeeMore}
          />
        )}
      </div>
    </div>
  )
}

class BreifSite extends Component {
  static propTypes = {
    // info: PropTypes.string,
    // navigationObj: PropTypes.object, // Navigation Object
    // linkOnClick: PropTypes.func,
    // linkText: PropTypes.string,3
  }

  // https://www.npmjs.com/package/react-simple-chatbot
  // 

  render() {
    return (
      <div className={styles.container}>
        <Languages
          title={"Core Lanaguages"}
          languages={[
            {
              imgSrc: images.languages.javascriptIcon,
              name: "Javascript",
              offsiteLink: "http://devdocs.io/javascript/",
            },
            {
              imgSrc: images.languages.reactIcon,
              name: "React",
              offsiteLink: "https://reactjs.org/docs/hello-world.html",
            },
            {
              imgSrc: images.languages.reduxIcon,
              name: "Redux",
              offsiteLink: "https://redux.js.org/",
            },
          ]}
        />

        <Languages
          title={"Site Features"}
          languages={[
            {
              imgSrc: images.languages.chatbot,
              name: "React Simpe Chatbot",
              details: "This is feature that allows the user to interact with a robot to ask questions, it's an alternivate way of doing a form",
              offsiteLink: "https://lucasbassetti.com.br/react-simple-chatbot/",
              navigationObj: navigationLinks.chatbot,
              navigationLinkText: "Learn more...",
              absoluteBottomSeeMore: true,
            },
            {
              imgSrc: images.languages.googlemaps,
              name: "Google Maps Api",
              details: "Google maps api allows the users to access google map's within the site",
              offsiteLink: "https://cloud.google.com/maps-platform/",
              navigationObj: navigationLinks.api.submenu.googlemaps,
              navigationLinkText: "Learn more...",
              absoluteBottomSeeMore: true,
            },
            {
              imgSrc: images.languages.giphy,
              name: "Giphy Api",
              details: "An api to look up different gifs or images",
              offsiteLink: "https://developers.giphy.com/",
              navigationObj: navigationLinks.api.submenu.giphy,
              navigationLinkText: "Learn more...",
              absoluteBottomSeeMore: true,
            },
          ]}
        />
      </div>
    )
  }
}

export default BreifSite