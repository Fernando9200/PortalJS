import React from 'react';
import styled from 'styled-components';

const StyledNav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavLink = styled.a`
  margin: 0 8px;
  color: #f5f5f5;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s, transform 0.2s;

  &:hover {
    color: #007BFF;
    transform: scale(1.05);
  }
`;

const Navbar = () => {
  return (
    <StyledNav>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/about">About</NavLink>
      <NavLink href="/contact">Contact</NavLink>
    </StyledNav>
  );
};

export default Navbar;