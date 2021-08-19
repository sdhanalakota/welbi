import { css } from "@emotion/css";

export const sideBarRoot = () => css`
  display: flex;
  height: 100vh;
  overflow: scroll initial;
  position: fixed;
  width: 14% !important;
`;

export const sideBarHeader = () => css`
  font-family: "Permanent Marker", cursive;
  font-size: 2vw;
  color: white;

  &:hover {
    text-decoration: none;
    color: white;
  }
`;
