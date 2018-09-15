import React, { Component } from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import DetailCarousel from "../DetailCarousel/DetailCarousel";
import Details from "../Details/Details";
import SiteSchema from "../../schemas/site";
import "./SiteDetails.css";

class SiteDetails extends Component {
  static propTypes = {
    selectedSite: SiteSchema.isRequired,
    onCloseSite: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0
      // moreDetails: false
    };
  }
  onImageChanged = image => {
    this.setState({
      imageIndex: image
    });
  };

  /*
  toggleMoreDetails = () => {
    console.log("toggle More Details");
    this.setState({
      moreDetails: false
    });
  }; */

  render() {
    const { selectedSite, onCloseSite, isOpen } = this.props;
    const { imageIndex } = this.state;

    return (
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={isOpen}
        timeout={1000}
        classNames="bottom"
      >
        <div className="siteDetails">
          <div className="siteDetailContent">
            <div className="siteDetailBackground" />
            <DetailCarousel
              detailImages={selectedSite.detailImages}
              onImageChanged={this.onImageChanged}
            />
            <Details
              {...selectedSite}
              {...selectedSite.detailImages[imageIndex]}
              onMoreDetails={this.toggleMoreDetails}
            />
          </div>
          <img
            src="img/site-details/Button-Close-X.png"
            alt="Close"
            className="closeButton"
            onClick={() => onCloseSite(selectedSite.id)}
          />
        </div>
      </CSSTransition>
    );
  }
}

export default SiteDetails;
