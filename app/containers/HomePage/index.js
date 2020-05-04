/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from "react";
import classnames from "classnames";
import styled from "styled-components";
import DocumentTitle from "react-document-title";
import ScrollLink from "rc-scroll-anim/lib/ScrollLink";
import Banner from "./Banner";
import LastYear from "./Pages/LastYear";
import Jan from "./Pages/Jan";

const tweenAnim = {
  y: 30,
  opacity: 0,
  duration: 650,
  type: "from",
  ease: "easeOutQuad",
};

const HomePage = ({ className }) => {
  return (
    <DocumentTitle title="Múi Mít - Gia đình của Beer">
      <div
        className={classnames({
          "home-wrapper": true,
          [className]: true,
        })}
      >
        <div className="nav-wrapper">
          <ScrollLink
            to="banner"
            showHeightActive={["100%", "30%"]}
            toHash={false}
          />
          <ScrollLink to="page1" showHeightActive="30%" toHash={false} />
          <ScrollLink
            to="page2"
            showHeightActive={["30%", "70%"]}
            toHash={false}
          />
          <ScrollLink to="page3" showHeightActive="70%" toHash={false} />
        </div>
        <Banner />
        <LastYear tweenAnim={tweenAnim} />
        <Jan tweenAnim={tweenAnim} />
      </div>
    </DocumentTitle>
  );
};
export default styled(HomePage)``;
