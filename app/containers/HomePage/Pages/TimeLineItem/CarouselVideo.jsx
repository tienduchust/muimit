import React from "react";
import _ from "lodash";
import BannerAnim from "rc-banner-anim";
import ReactPlayer from "react-player";
const { Element } = BannerAnim;
const BgElement = Element.BgElement;
const CarouselVideo = ({ videos }) => {
  return (
    <BannerAnim type="across" ease="easeInSine" prefixCls="custom-arrow-thumb">
      {_.map(videos, (video, videoId) => {
        return (
          <Element key={videoId} prefixCls="banner-user-elem">
            <BgElement
              key="bg"
              className="bg"
            >
              <ReactPlayer
                volume={1}
                title={video.title}
                controls
                width="100%"
                height="100%"
                url={video.url}
              />
            </BgElement>
          </Element>
        );
      })}
    </BannerAnim>
  );
};
export default React.memo(CarouselVideo);
