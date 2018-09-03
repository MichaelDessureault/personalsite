import React, { Component } from 'react';
import styles from '../styles/App.css';
import { navigationLinks } from '../../../helpers/navigation'
import images from '../../../images/index'

import FullBackground from './FullBackground';
import BreifBio from './BreifBio';
import AboutModule from './AboutModule';
import BreifSite from './BreifSite';

class App extends Component {
  render() {
    return (
      <div className={styles.App}>

        {/* FullBackground is wrapped in element container */}
        <FullBackground
          title={"Michael's Personal Site"}
          backgroundImageUrl={`url("https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")`}
          />

        <AboutModule title={"About Myself"}>
          <BreifBio
            imgSrc={images.aboutme.mypicture}
            title={"Michael Dessureault"}
            subTitle={"Software Developer"}
            bio={`I have graudated from Software Development and Network Engineering at Sheridan College.`}
            navigationObj={navigationLinks.about}
            linkClicked={(e) => this.props.dispatchAboutStartPoint(true)}
            // linkOnClick={(e) => this.props.dispatchAboutStartPoint(false)} -- this is for about site...
            linkText={"Learn more..."}
          />
        </AboutModule>

        <div className={styles.seperator}/> 

        <AboutModule title={"About Site"}>
          <BreifSite />
        </AboutModule>

      </div>
    );
  }
}

export default App;
