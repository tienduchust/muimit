import React from "react";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";
import QueueAnim from "rc-queue-anim";
import TweenOne from "rc-tween-one";
import { FormattedMessage } from "react-intl";
import Carousel from "./Carousel";

const First = ({ tweenAnim }) => {
  return (
    <div className="home-page-wrapper first">
      <OverPack playScale={0.6} className="page vh" id="first">
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
            Thời gian vẫn còn ở CT5 Yên Xá, 2 vợ chồng cùng nhau đi làm ở
            TOPICA, thời gian vô lo vô nghĩ !<br/> ĐI LÀM ** ĐI ĂN ** ĐI CHƠI ** ĐI TẬP GYM
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
          <Carousel />
        </TweenOne>
      </OverPack>
    </div>
  );
};
export default React.memo(First);
