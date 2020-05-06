import React from "react";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";
import QueueAnim from "rc-queue-anim";
import TweenOne from "rc-tween-one";
import { FormattedMessage } from "react-intl";
import ReactPlayer from "react-player";
import classnames from "classnames";

const LastYear = ({ tweenAnim }) => {
  return (
    <div
      className={classnames({
        "home-page-wrapper timeLine": true,
      })}
    >
      <OverPack playScale={0.6} className="page vh" id="lastYear">
        <QueueAnim
          className="page-text"
          key="text"
          type="bottom"
          leaveReverse
          delay={100}
        >
          <h1 key="h1">
            <FormattedMessage id="app.home.lastYear.title" />
          </h1>
          <p key="p">
            VÂN ANH đón sinh nhật 25 tuổi ở Bắc Cạn. Mẹ Toàn đã chuẩn bị một
            chiếc bánh sinh nhật và một món quá rất đặc biệt. Mọi người đều chúc
            mừng VÂN ANH lần đầu tiên đón sinh nhật ở đây
          </p>
        </QueueAnim>
        <TweenOne
          className="carousel"
          animation={{
            ...tweenAnim,
            delay: 200,
          }}
          key="code"
        >
          <ReactPlayer
            autoPlay
            muted={true}
            volume={1}
            title="Sinh nhật Vân Anh"
            controls
            width="100%"
            height="100%"
            url="https://www.youtube.com/embed/_EyimSxAuWw"
            playing
          />
        </TweenOne>
      </OverPack>
    </div>
  );
};
export default React.memo(LastYear);
