/**
 *
 * TopBar
 *
 */

import React, { memo, useCallback, useState } from "react";
import { NavBar, Icon } from "antd-mobile";
import navArr from "./nav";
import _ from "lodash";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { Button } from "antd";
import classnames from "classnames";
import { Map } from "immutable";
import TweenOne from "rc-tween-one";
import QueueAnim from "rc-queue-anim";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
const topBarClassName = "header";
function TopBar({ headerOpen, isMobile = true, setHeaderOpen, activeKey }) {
  /**
   * Component's States
   */
  const [_state, setState] = useState(
    Map({
      openAnim: null,
      phoneOpen: false,
      barAnim: [],
    })
  );
  //**----------------- */
  const navToRender = _.map(navArr, (item) => {
    const className = activeKey === item.key ? "active" : "";
    return (
      <li key={item.key}>
        <Link to={item.href} className={className} disabled={item.disabled}>
          {item.name}
        </Link>
      </li>
    );
  });
  /**
   * Component's Callbacks
   */

  /**
   *
   */
  const _handleToggleSideBar = useCallback(() => {
    headerOpen((prevState) => !prevState);
  }, [headerOpen]);

  /** */
  const _handleClick = useCallback(() => {
    headerOpen((prevState) => !prevState);
  }, [headerOpen]);

  /** */
  const _handleLangChange = useCallback(() => {
    headerOpen((prevState) => !prevState);
  }, [headerOpen]);

  /* ------------------ */

  navToRender.push(
    <li key="lang" className="lang-btn">
      <Button ghost size="small" onClick={_handleLangChange}>
        <FormattedMessage id="app.header.lang" />
      </Button>
    </li>
  );
  return (
    <header
      className={classnames({
        [`${topBarClassName}-wrapper`]: true,
        open: headerOpen,
      })}
    >
      <div className={topBarClassName}>
        <TweenOne
          className={classnames({
            [`${topBarClassName}-logo`]: true,
          })}
          animation={{ opacity: 0, type: "from" }}
        >
          <Link to="/" key="logo">
            <img
              alt="img"
              height="14"
              src="images/Beer.png"
            />
          </Link>
        </TweenOne>
        {isMobile ? (
          <div className="phone-nav">
            <div
              className="phone-nav-bar"
              onClick={(e) => {
                _handleClick(e, headerOpen);
              }}
            >
              <TweenOne
                component="em"
                animation={_state.getIn(["barAnim", 0])}
              />
              <TweenOne
                component="em"
                animation={_state.getIn(["barAnim", 1])}
              />
              <TweenOne
                component="em"
                animation={_state.getIn(["barAnim", 2])}
              />
            </div>
            <TweenOne
              className="phone-nav-text-wrapper"
              animation={_state.get("openAnim")}
              style={{
                pointerEvents: headerOpen ? "auto" : "none",
              }}
            >
              <QueueAnim
                component="ul"
                duration={150}
                interval={50}
                delay={[200, 0]}
                ease={["easeOutQuad", "easeInQuad"]}
                type="bottom"
                leaveReverse
              >
                {headerOpen && navToRender}
              </QueueAnim>
            </TweenOne>
          </div>
        ) : (
          <TweenOne
            component="nav"
            className="web-nav"
            animation={{ opacity: 0, type: "from" }}
          >
            <ul>{navToRender}</ul>
          </TweenOne>
        )}
      </div>
    </header>
  );
}

TopBar.propTypes = {};

export default memo(TopBar);
