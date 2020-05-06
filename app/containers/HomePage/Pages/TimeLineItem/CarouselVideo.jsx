import React from "react";
import _ from "lodash";
import BannerAnim from "rc-banner-anim";
import TweenOne from "rc-tween-one";
import ReactPlayer from "react-player";
const { Element } = BannerAnim;
const BgElement = Element.BgElement;
export default class CarsorelVideo extends React.Component {
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
        ease="easeOutSine"
        onChange={this.onChange}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        prefixCls="custom-arrow-thumb"
      >
        {_.map(this.props.videos, (video, videoId) => {
          return (
            <Element key={videoId} prefixCls="banner-user-elem">
              <ReactPlayer
                autoPlay
                muted={true}
                volume={1}
                title={video.title}
                controls
                width="100%"
                height="100%"
                url={video.url}
                playing
              />
            </Element>
          );
        })}
      </BannerAnim>
    );
  }
}
