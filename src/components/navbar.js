import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Logo from "../images/nav-logo.png";

const Nav = styled.nav`
  background: #ffffff;
  height: 64px;
  width: 100%;
  position: fixed;
  top: ${props => (props.isShow ? "0" : "-64px")};
  left: 0;
  transition: 0.2s ease-in-out;
  box-shadow: ${props =>
    props.isShow && !props.isTop ? "0 0 3px 3px rgba(0, 0, 0, 0.1)" : "none"};
`;

const NavContent = styled.div`
  max-width: 720px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const NavLogo = styled.div`
  img {
    filter: grayscale(100%);
    transition: filter 0.2s ease-in-out;

    &:hover {
      filter: none;
    }
  }
`;

const NavLink = styled.div`
  width: 50%;
  display: flex;
  margin-left: 8px;

  a {
    display: block;
    font-weight: bold;
    font-size: 24px;
    color: #aaa;
    margin: 0 12px;
  }

  svg {
    height: 24px;
    fill: #aaa;
    transition: fill 0.2s ease-in-out;

    &:hover {
      fill: #0e96da;
    }
  }
`;

export default function Navbar() {
  const [isShow, setShow] = useState(true);
  const [isTop, setTop] = useState(true);

  useEffect(() => {
    let prevPosition = window.pageYOffset || document.documentElement.scrollTop;

    const handler = () => {
      let currentPosition =
        window.pageYOffset || document.documentElement.scrollTop;

      setShow(prevPosition > currentPosition);
      setTop(window.scrollY === 0);

      prevPosition = currentPosition;
    };

    window.addEventListener("scroll", handler);

    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  return (
    <Nav isShow={isShow} isTop={isTop}>
      <NavContent>
        <NavLogo>
          <Link to="/">
            <img src={Logo} alt="nav logo" />
          </Link>
        </NavLogo>
        <NavLink>
          <a href="https://gagahpangeran.com/">
            <UserIcon />
          </a>
          <a href="https://github.com/gagahpangeran">
            <GithubIcon />
          </a>
        </NavLink>
      </NavContent>
    </Nav>
  );
}

const UserIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" />
    </svg>
  );
};

const GithubIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
      <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
    </svg>
  );
};
