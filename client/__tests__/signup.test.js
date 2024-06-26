import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../src/components/login'
import Signup from '../src/components/signup'; // Import your SignUp component
import '@testing-library/jest-dom';

// Frontend Test: Successful Account Creation

global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ success: true }),
    })
  );

test('User can successfully create an account', async () => {
    render(
    <Router>
            <Signup />
    </Router>
);

    // Fill out the form fields
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Firstname'), { target: { value: 'firstname' } });
    fireEvent.change(screen.getByPlaceholderText('Lastname'), { target: { value: 'lastname' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'testuser@example.com' } });

    
    // Clicking & Submitting 
    fireEvent.click(screen.getByText('Sign Up'));
   
    // Check for the success message
    const successMessage = await screen.findByText('Successfully Created Account');
    expect(successMessage).toBeInTheDocument();
});