import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";
import QueueAnim from "rc-queue-anim";
import TweenOne from "rc-tween-one";
import { FormattedMessage } from "react-intl";
import Carsorel from "./Carsorel";
import ReactPlayer from "react-player";

const LastYear = ({ tweenAnim }) => {
  console.log("render");
  return (
    <div className="home-page-wrapper jan">
      <OverPack playScale={0.6} className="page vh" id="page1">
        <QueueAnim
          className="page-text"
          key="text"
          type="bottom"
          leaveReverse
          delay={100}
        >
          <h1 key="h1">
            <FormattedMessage id="app.home.jan.title" />
          </h1>
          <p key="p">
            VÂN ANH đón sinh nhật 25 tuổi ở Bắc Cạn. Mẹ Toàn đã chuẩn bị một
            chiếc bánh sinh nhật và một món quá rất đặt biệt. Mọi người đều chúc
            mừng VÂN ANH lần đầu tiên đón sinh nhật ở đây
          </p>
        </QueueAnim>
        <TweenOne
          className="code-wrapper"
          animation={{
            ...tweenAnim,
            delay: 200,
          }}
          key="code"
        >
          <Carsorel />
        </TweenOne>
      </OverPack>
    </div>
  );
};
export default React.memo(LastYear);
