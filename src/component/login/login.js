import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { LoginButton, Background, Title } from './login_style';

function Login() {
  // eslint-disable-next-line no-undef
  const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
  const REDIRECT_URI = 'http://localhost:3000/loading';
  //點選login後 跳轉到github授權後會先跳到loading頁拿token存在cookie中後跳轉到REDIRECT_URI(也就是list頁面)

  // 用戶登入github後如何(從輸入的email跟password中)拿到client id and client uri -->目前寫死
  // 拿回後設定scope看要拿取哪些資訊 --> 跳轉回list頁面需要navbar/username/logout

  return (
    <>
      <Title>Issues Management</Title>

      <Background>
        <LoginButton>
          Login Now
          <a
            style={{ textDecoration: 'none' }}
            href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo&redirect_uri=${REDIRECT_URI}`}
          >
            &nbsp;
            <FontAwesomeIcon icon={faRightToBracket} />
          </a>
        </LoginButton>
        <img
          src='images/cat.png'
          width={'300px'}
          style={{ marginLeft: '105px', marginTop: '205px' }}
        />
      </Background>
    </>
  );
}

export default Login;

// //
// dcard project
// @hanhan0914
// hanhan0914 owns this application.

// You can list your application in the GitHub Marketplace so that other users can discover it.
