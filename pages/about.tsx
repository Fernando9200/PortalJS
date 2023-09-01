import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/navbar';

const Container = styled.div`
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 15px;
  color: #34495E;  // Dark blue
  text-align: center;  // Centers the title
`;

const Text = styled.p`
  font-size: 1em;
  color: #2C3E50;  // Slightly lighter for normal text
  line-height: 1.6;
  margin-left: 250px;
  max-width: 900px;
`;

const About = () => {
  return (
    <Container>
      <Navbar />
      <Title>About Us</Title>
      <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
    </Container>
  );
};

export default About;
