import React from 'react';
import Navbar from '../components/navbar';
import ContactForm from '../components/ContactForm';
import styled from 'styled-components';

const ContactContainer = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f7f7f7;
`;

const Contact = () => {
  return (
    <ContactContainer>
      <Navbar />
      <ContactForm />
    </ContactContainer>
  );
};

export default Contact;