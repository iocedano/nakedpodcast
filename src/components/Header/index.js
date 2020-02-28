import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import * as styled from './style';

const Header = ({ siteTitle }) => (
  <header css={styled.containerClass}>
    <div>
      <h1>
        <Link
          to="/"
          css={styled.linkClass}
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
