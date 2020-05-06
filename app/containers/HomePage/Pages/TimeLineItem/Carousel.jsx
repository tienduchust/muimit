import React from "react";
import _ from "lodash";
import BannerAnim from "rc-banner-anim";
import TweenOne from "rc-tween-one";
import ReactPlayer from "react-player";
const { Element } = BannerAnim;
const BgElement = Element.BgElement;
export default class Carsorel extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      intShow: 0,
      prevEnter: false,
      nextEnter: false,
      thumbEnter: false,
    };
    [
      "onChange",
      "prevEnter",
      "prevLeave",
      "nextEnter",
      "nextLeave",
      "onMouseEnter",
      "onMouseLeave",
    ].forEach((method) => (this[method] = this[method].bind(this)));
  }

  onChange(type, int) {
    if (type === "before") {
      this.setState({
        intShow: int,
      });
    }
  }

  getNextPrevNumber() {
    let nextInt = this.state.intShow + 1;
    let prevInt = this.state.intShow - 1;
    if (nextInt >= this.props.imgArray.length) {
      nextInt = 0;
    }
    if (prevInt < 0) {
      prevInt = this.props.imgArray.length - 1;
    }

    return [prevInt, nextInt];
  }

  prevEnter() {
    this.setState({
      prevEnter: true,
    });
  }

  prevLeave() {
    this.setState({
      prevEnter: false,
    });
  }

  nextEnter() {
    this.setState({
      nextEnter: true,
    });
  }

  nextLeave() {
    this.setState({
      nextEnter: false,
    });
  }

  onMouseEnter() {
    this.setState({
      thumbEnter: true,
    });
  }

  onMouseLeave() {
    this.setState({
      thumbEnter: false,
    });
  }

  render() {
    return (
      <BannerAnim
        autoPlay
        autoPlaySpeed={5000}
        onChange={this.onChange}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        prefixCls="custom-arrow-thumb"
      >
        {_.map(this.props.imgArray, (img, imgId) => {
          return (
            <Element key={imgId} prefixCls="banner-user-elem">
              <BgElement
                key="bg"
                className="bg"
                style={{
                  backgroundImage: `url(${img.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <TweenOne
                className="banner-user-title"
                animation={{ y: 30, opacity: 0, type: "from" }}
              >
                {img.title}
              </TweenOne>
              <TweenOne
                className="banner-user-text"
                animation={{ y: 30, opacity: 0, type: "from", delay: 100 }}
              >
                {img.description}
              </TweenOne>
            </Element>
          );
        })}
      </BannerAnim>
    );
  }
}
