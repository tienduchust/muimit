import React, { useCallback, useState } from "react";
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
  const [mode, setMode] = useState("leave");
  const _handleChangeOverPack = useCallback(
    (type) => {
      setTimeout(() => {
        setMode(type.mode);
      }, 100);
    },
    [setMode]
  );
  return (
    <div
      className={classnames({
        "home-page-wrapper timeLine": true,
        active: isActive,
      })}
    >
      <OverPack
        onChange={_handleChangeOverPack}
        playScale={0.6}
        className={classnames({
          "page vh": true,
          hasVideo: hasVideo,
        })}
        id={timeLineId}
      >
        {mode === "enter" && (
          <>
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
          </>
        )}
      </OverPack>
      <div
        style={{
          bottom: 0,
          backgroundImage: "url(https://fleur.qodeinteractive.com/wp-content/uploads/2016/05/h1-parallax-1.jpg)",
          color: "#656565",
        }}
      >
        CHÚC MỪNG SINH NHẬT VỢ YÊU. <br />
        <small>LUÔN XINH ĐẸP, LUÔN TƯƠI CƯỜI VÀ LUÔN BÊN CANH ANH NHÉ</small>
      </div>
    </div>
  );
};
export default React.memo(TimeLineItem);
