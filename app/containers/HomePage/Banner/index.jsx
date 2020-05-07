import React from "react";
import classnames from "classnames";
import TweenOne from "rc-tween-one";
import QueueAnim from "rc-queue-anim";
import ScrollElement from "rc-scroll-anim/lib/ScrollElement";
import SvgMorphPlugin from "rc-tween-one/lib/plugin/SvgMorphPlugin";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { DownCircleOutlined } from "@ant-design/icons";
import Title from "./Title";

TweenOne.plugins.push(SvgMorphPlugin);

// CONSTANTS
const bannerClassName = "banner";

const Banner = () => {
  return (
    <ScrollElement
      id="banner"
      className={classnames({
        [`${bannerClassName}-wrapper`]: true,
      })}
    >
      <svg
        className={classnames({
          [`${bannerClassName}-bg-center`]: true,
        })}
        width="100%"
        viewBox="0 0 1200 800"
      >
        <TweenOne
          component="circle"
          fill="rgba(161,174,245,.15)"
          r="130"
          cx="350"
          cy="350"
          animation={{
            y: 30,
            x: -10,
            repeat: -1,
            duration: 3000,
            yoyo: true,
          }}
        />
        <TweenOne
          component="circle"
          fill="rgba(120,172,254,.1)"
          r="80"
          cx="500"
          cy="420"
          animation={{
            y: -30,
            x: 10,
            repeat: -1,
            duration: 3000,
            yoyo: true,
          }}
        />
      </svg>
      <div className="banner">
        <div
          className={classnames({
            [`${bannerClassName}-demo`]: true,
          })}
        >
           <Title />
        </div>
        <QueueAnim
          type="bottom"
          className={classnames({
            [`${bannerClassName}-text`]: true,
          })}
          delay={300}
        >
          <h1 key="h1">BEER'S FAMILY</h1>
          <h3 key="h3">Cùng nhau yêu thương, cùng nhau chia sẻ.</h3>
          <div key="button">
            <Link to="/" className={`${bannerClassName}-text-button`}>
              <FormattedMessage id="app.home.learn-more" />
            </Link>
          </div>
        </QueueAnim>
        <TweenOne
          animation={{ opacity: 0, type: "from", delay: 400 }}
          className={`${bannerClassName}-down-wrapper`}
        >
          <div key="down" className={`${bannerClassName}-down`}>
            <TweenOne
              animation={{
                y: 5,
                yoyo: true,
                repeat: -1,
                duration: 900,
              }}
            >
              <DownCircleOutlined />
            </TweenOne>
          </div>
          <div className={`${bannerClassName}-mouse`} key="mouse">
            <TweenOne
              className="mouse-bar"
              animation={{
                y: 5,
                yoyo: true,
                repeat: -1,
                duration: 900,
              }}
            />
          </div>
        </TweenOne>
      </div>
    </ScrollElement>
  );
};
export default Banner;
