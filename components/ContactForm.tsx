import React, { useState } from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background-color: #fff;
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  font-size: 16px;
  color: #333;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007BFF;
    outline: none;
  }
`;

const StyledTextarea = styled(StyledInput).attrs({ as: 'textarea' })`
  resize: vertical;
  height: 100px;
`;

const StyledButton = styled.button`
  padding: 12px 20px;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <FormField>
        <Label>Name:</Label>
        <StyledInput 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
      </FormField>
      <FormField>
        <Label>Email:</Label>
        <StyledInput 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
      </FormField>
      <FormField>
        <Label>Message:</Label>
        <StyledTextarea 
          name="message" 
          value={formData.message} 
          onChange={handleChange} 
          required 
        />
      </FormField>
      <StyledButton type="submit">Submit</StyledButton>
    </StyledForm>
  );
};

export default ContactForm;
