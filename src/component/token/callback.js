import React, { useEffect } from 'react';
import Cookie from 'universal-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const cookies = new Cookie();

function Callback() {
  // eslint-disable-next-line no-undef
  const client_id = process.env.REACT_APP_GITHUB_CLIENT_ID;
  // eslint-disable-next-line no-undef
  const client_secret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
  const navigate = useNavigate();

  useEffect(() => {
    const code =
      window.location.href.match(/\?code=(.*)/) && window.location.href.match(/\?code=(.*)/)[1];

    const tokenResponse = async () => {
      const res = await axios({
        method: 'post',

        url: `https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`,
        headers: {
          accept: 'application/json',
        },
      });

      cookies.set('authToken', `${res.data['access_token']}`, { path: '/' });
      navigate('/list');
    };

    tokenResponse();
  }, []);

  return (
    <>
      <div
        style={{ backgroundColor: '#9D9D9D', width: '100%', height: '100vh', textAlign: 'center' }}
      >
        <div
          style={{
            fontWeight: '700',
            fontSize: '50px',
            fontFamily: 'serif',
            width: '300px',
            height: '20px',
            margin: '0 auto',
            position: 'relative',
            top: '50%',
            transform: 'translate(0, -50%)',
          }}
        >
          Loading...
        </div>
      </div>
    </>
  );
}

export default Callback;
