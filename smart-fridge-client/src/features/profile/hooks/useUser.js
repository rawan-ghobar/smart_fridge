import { useEffect, useState } from 'react';
const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUser({
          name: 'John Doe',
          email: 'johndoe@example.com',
          avatar: require('../../../../assets/avatar-placeholder.png'),
        });
      } catch (error) {
        console.error('Failed to load user', error);
      } finally {
        setLoading(false);
