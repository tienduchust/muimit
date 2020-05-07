import React from "react";
import _ from "lodash";
import BannerAnim from "rc-banner-anim";
import ReactPlayer from "react-player";
const { Element } = BannerAnim;
const CarouselVideo = ({ videos }) => {
  return (
    <BannerAnim ease="easeInOutExpo" prefixCls="custom-arrow-thumb">
      {_.map(videos, (video, videoId) => {
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
};
export default React.memo(CarouselVideo);
