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
        setLoading(false);
        console.log(client.guilds);
      });

      await client.init(token);
    })()
  }, []);

  return (
    <>
      <PreLoader active={loading} />
      <Layout />
    </>
  );
}
