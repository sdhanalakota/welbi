import { css } from "@emotion/css";

export const cardStyle = (width) => css`
  background-color: #f1f1f1;
  width: ${width};
  margin: 0.5rem;
  border-radius: 5%;
  transition: width 2s, height 4s;

  &:hover {
    transition-delay: 0.2s;
    transform: translateY(0) scale(1.05);
  }
`;

export const primaryText = () => css`
  font-size: 0.6rem;
  color: darkslategray;
  font-weight: 600;
  opacity: 0.7;
  margin-bottom: 0;
  padding-top: 0;
`;

export const secondaryText = () => css`
  font-size: 0.8rem;
  color: black;
  font-weight: 500;
  margin-top: 0;
  padding-top: 0;
`;

export const badgeEnabled = (backgroundColor) => css`
  background-color: ${backgroundColor};
  color: #ffffff;
  font-weight: 700;
  font-size: 0.65rem;
  padding: 0.35rem;
`;

export const secondaryBtn = () => css`
  padding: 0.15rem 0.7rem;
  font-size: 0.75rem;
  font-weight: 500;
  text-align: center;
  border-radius: 4px;
  outline: none;
  border: none;
  transition: width 3s, height 6s;
  background-color: #0d324d;

  &:hover {
    background-color: #1a237e;
    background-image: linear-gradient(315deg, #bdd4e7 0%, #8693ab 74%);
    color: #0d324d;
    padding: 0.15rem 0.65rem;
  }

  &:focus {
    background-color: #0d324d;
  }
`;

export const primaryBtn = () => css`
  padding: 0.3rem 2.6rem;
  background-color: #0d324d;
  outline: none;
  border: none;

  &:hover {
    color: #0d324d;
    background-color: #1a237e;
    background-image: linear-gradient(315deg, #bdd4e7 0%, #8693ab 74%);
  }

  &:focus {
    background-color: #0d324d;
  }
`;

export const errorWarningStyle = () => css`
  //fontSize: "0.7rem", color: "red", marginTop: "5px"
  font-size: 0.7rem;
  color: #d70000;
  margin-top: 5px;
`;

export const formInputStyle = (props) => css`
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  border-color: ${props ? "#D70000" : "#0d324d"};

  &::placeholder {
    color: #c0c0c0;
    font-size: 0.8rem;
  }

  &:focus {
    border-color: ${props ? "#FF0000" : "#87ceeb"};
    outline-width: 0px;
  }
`;

export const cardHeaderStyle = () => css`
  font-weight: 700;
  opacity: 0.9;
  font-size: 0.85rem;
`;
