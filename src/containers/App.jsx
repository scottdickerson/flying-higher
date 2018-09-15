import React, { Component, Fragment } from "react";

import "./App.css";

import sites from "../sites/globalSites.json";
import MainScreen from "../components/MainScreen/MainScreen";
import TopTitle from "../components/TopTitle/TopTitle";
import PullScreen from "../components/PullScreen/PullScreen";
import SiteDetails from "../components/SiteDetails/SiteDetails";

class App extends Component {
  state = {
    selectedSite: sites[0],
    isPullShowing: true,
    isSiteOpen: false
  };

  componentDidMount() {
    this.clickListener = document.addEventListener("click", this.waitForIdle);
    this.tapListener = document.addEventListener("touchEnd", this.waitForIdle);
    this.waitForIdle();
  }

  componentWillUnmount() {
    if (this.idleTimeout) {
      clearTimeout(this.idleTimeout);
      clearTimeout(this.resetTimeout);
    }
    document.removeEventListener(this.clickListener);
    document.removeEventListener(this.tapListener);
  }

  waitForIdle = () => {
    if (this.idleTimeout) {
      clearTimeout(this.idleTimeout);
      clearTimeout(this.resetTimeout);
    }
    this.idleTimeout = setTimeout(this.resetState, 180000);
    this.resetTimeout = setTimeout(() => window.location.reload(true), 360000);
  };

  resetState = () => {
    this.setState({ isSiteOpen: false, isPullShowing: true });
  };

  handleSiteToggle = () => {
    setTimeout(
      () => this.setState(state => ({ isSiteOpen: !state.isSiteOpen })),
      !this.state.isSiteOpen ? 1000 : 0 // trigger with slight delay when opening
    );
  };

  handleSiteChanged = (oldSite, site) => {
    this.setState({ selectedSite: sites[site] });
  };

  handleTogglePull = () => {
    this.setState(state => ({ isPullShowing: !state.isPullShowing }));
  };

  render() {
    const { isPullShowing, isSiteOpen, selectedSite } = this.state;
    return (
      <div className="app">
        {isPullShowing ? (
          <PullScreen onClick={this.handleTogglePull} />
        ) : (
          <Fragment>
            <TopTitle />
            {!isSiteOpen ? (
              <MainScreen
                sites={sites}
                selectedSite={selectedSite}
                onSiteTapped={this.handleSiteToggle}
                onSiteChanged={this.handleSiteChanged}
              />
            ) : null}
            <SiteDetails
              isOpen={isSiteOpen}
              onCloseSite={this.handleSiteToggle}
              selectedSite={selectedSite}
            />
          </Fragment>
        )}
      </div>
    );
  }
}

export default App;
