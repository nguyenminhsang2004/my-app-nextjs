import { authApi } from '@/api/index';
import React from 'react';

export default function LoginPage () {
  async function handleLogin() {
    try {
      await authApi.login({
        email:'sangnm.it@gmail.com',
        password:'74423245'
      })
    } catch (error) {
      console.log("Failed to login")
    }
  }
  async function handleGetProfile() {
    try {
      await authApi.getProfile()
    } catch (error) {
      console.log("Failed to login")
    }
  }
  async function handleLogout() {
    try {
      await authApi.logout()
    } catch (error) {
      console.log("Failed to login")
    }
  }
  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleGetProfile}>Profile</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
