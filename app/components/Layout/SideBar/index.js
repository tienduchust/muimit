/**
 *
 * SideBar
 *
 */

import React, {memo, useCallback} from 'react';
import {Drawer, List} from "antd-mobile";
// import PropTypes from 'prop-types';
import Texty from 'rc-texty';
import QueueAnim from 'rc-queue-anim';
import styled from 'styled-components';

const sides = [
  {
    key: 1,
    name: "Gia đình Múi mít"
  },
  {
    key: 2,
    name: "Ảnh"
  }
];

function SideBar({className, open}) {
  return (
    <List>
      {open && _.map(sides, side => {
        return (
          <List.Item key={side.key}
                     multipleLine
          >
            <Texty
              type="left"
              mode="smooth"
            >
              {side.name}
            </Texty>
          </List.Item>
        )
      })}
    </List>
  );
}

SideBar.propTypes = {};

export default styled(memo(SideBar))`
`;
