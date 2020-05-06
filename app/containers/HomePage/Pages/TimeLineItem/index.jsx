import React from "react";
import classnames from "classnames";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";
import QueueAnim from "rc-queue-anim";
import TweenOne from "rc-tween-one";
import { FormattedMessage } from "react-intl";
import Carousel from "./Carousel";
import CarouselVideo from "./CarouselVideo";

const TimeLineItem = ({
  tweenAnim,
  imgArray,
  title,
  info,
  timeLineId,
  isActive,
  hasVideo,
  videos,
}) => {
  return (
    <div
      className={classnames({
        "home-page-wrapper timeLine": true,
        active: isActive,
      })}
    >
      <OverPack
        playScale={0.6}
        className={classnames({
          "page vh": true,
          hasVideo: hasVideo,
        })}
        id={timeLineId}
      >
        <QueueAnim
          className="page-text"
          key="text"
          type="bottom"
          leaveReverse
          delay={100}
        >
          <h1 key="h1">
            <FormattedMessage id={title} />
          </h1>
          <p key="p">{info}</p>
        </QueueAnim>
        <TweenOne
          className="carousel"
          animation={{
            ...tweenAnim,
            delay: 200,
          }}
          key="code"
        >
          <Carousel imgArray={imgArray} />
        </TweenOne>
        {hasVideo && (
          <TweenOne
            className="carousel"
            animation={{
              ...tweenAnim,
              delay: 200,
            }}
            key="code"
          >
            <CarouselVideo videos={videos} />
          </TweenOne>
        )}
      </OverPack>
    </div>
  );
};
export default React.memo(TimeLineItem);
