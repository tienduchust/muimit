/**
 *
 * Layout
 *
 */

import React, { memo, useCallback, useState } from "react";
import TopBar from "./TopBar";
import MainContent from "./MainContent";
// import PropTypes from 'prop-types';
import styled from "styled-components";
import classnames from "classnames";
import SideBar from "./SideBar";
import { Drawer } from "antd-mobile";

function Layout({ className, location, children }) {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const _handleOpenChange = useCallback(() => {
    setSideBarOpen((prevState) => !prevState);
  }, [setSideBarOpen]);
  return (
    <div
      className={classnames({
        [className]: true,
        home: true,
      })}
    >
      <TopBar setSideBarOpen={setSideBarOpen} />
      <MainContent children={children} />
    </div>
  );
}

Layout.propTypes = {};

export default styled(memo(Layout))`
  .layoutWrapper {
    position: relative;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    .am-drawer-sidebar {
      background-color: #fff;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
    .am-drawer-sidebar .am-list {
      width: 250px;
      padding: 0;
    }
  }
`;
