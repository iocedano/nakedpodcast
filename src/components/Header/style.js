import { css } from '@emotion/core';

export const containerClass = css`
  padding-right: 16px;
  padding-left: 16px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  align-items: center;
  background-color: #2a2a2a;
  box-shadow: inset 0 -1px 0 0 rgba(255,255,255,0.08);
  display: flex;
  height: 56px;
  justify-content: space-between;
  z-index: 100;
`;

export const linkClass = css`
  color: white;
  text-decoration: none;
`;
