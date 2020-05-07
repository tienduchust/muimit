import React from "react";
import _ from "lodash";
import BannerAnim from "rc-banner-anim";
import TweenOne from "rc-tween-one";
const { Element } = BannerAnim;
const BgElement = Element.BgElement;
const Carousel = ({ imgArray }) => {
  return (
    <BannerAnim
      autoPlay
      ease="easeInOutExpo"
      autoPlaySpeed={8000}
      prefixCls="custom-arrow-thumb"
    >
      {_.map(imgArray, (img, imgId) => {
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
};
export default React.memo(Carousel);
