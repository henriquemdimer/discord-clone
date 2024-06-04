import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import client from '../lib/index';
import PreLoader from '../components/PreLoader';

export default function ChatPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      if (!token) return window.location.replace('/login');

      client.on('ready', () => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });

      try {
        await client.init(token);
      } catch (err) {
        console.log(err)
        return window.location.replace('/login');
      }
    })()
  }, []);

  return (
    <>
      <PreLoader active={loading} />
      <Layout />
    </>
  );
}
