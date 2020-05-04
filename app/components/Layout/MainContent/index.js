/**
 *
 * MainContent
 *
 */

import React, { memo } from "react";
// import PropTypes from 'prop-types';
import styled from "styled-components";
import classnames from "classnames";

function MainContent({ children, className }) {
  return (
    <div
      className={classnames({
        "content-wrapper": true,
        [className]: true,
      })}
    >
      {children}
    </div>
  );
}

MainContent.propTypes = {};

export default styled(memo(MainContent))``;
