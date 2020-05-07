import React from "react";
import _ from "lodash";
import BannerAnim from "rc-banner-anim";
import TweenOne from "rc-tween-one";
import IMG_01 from "images/Eighth/IMG_01.JPG";
const { Element } = BannerAnim;
const BgElement = Element.BgElement;
const Carousel = ({ imgArray }) => {
  return (
    <BannerAnim
      type={["verticalOverlay", "acrossOverlay", "across"]}
      autoPlay
      ease="easeInOutExpo"
      autoPlaySpeed={4000}
      prefixCls="custom-arrow-thumb"
    >
      {_.map(imgArray, (img, imgId) => {
        return (
          <Element key={imgId} prefixCls="banner-user-elem">
            <BgElement
              key="bg"
              className="bg"
              // style={{
              //   backgroundImage: `url(${img.src})`,
              //   backgroundSize: "cover",
              //   backgroundPosition: "center",
              // }}
            >
              <img src={IMG_01}  alt="IMG"/>
            </BgElement>
            <TweenOne
              className="banner-user-title"
              animation={{ delay: 200, y: 30, opacity: 0, type: "from" }}
            >
              {img.title}
            </TweenOne>
          </Element>
        );
      })}
    </BannerAnim>
  );
};
export default React.memo(Carousel);
