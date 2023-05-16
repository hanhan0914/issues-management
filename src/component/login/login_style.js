import styled from 'styled-components';

export const Title = styled.div`
  font-family: Comic Sans MS;
  font-size: 90px;
  font-weight: bolder;
  margin: 50px;
  color: #000000;
  height: 80px;
  line-height: 0.8;

  width: 900px;
  @media screen and (max-width: 825px) {
    height: 130px;
    // word-wrap: break-word;
    font-size: 80px;
    line-height: 0.8;
  }

  @media screen and (max-width: 506px) {
    height: 200px;
    font-size: 80px;
    margin: 45px;
    line-height: 0.8;
  }
`;

export const LoginButton = styled.button`
  width: 240px;
  height: 80px;
  position: relative;
  left: 50%;
  transform: translate(-50%, 510%);
  cursor: pointer;
  z-index: 2;
  &:hover {
    transition-timing-function: ease;
    transition-delay: 0.3s;
    width: 280px;
    height: 80px;
    font-size: 42px;
  }

  // button 屬性修改
  font-weight: border;
  background-color: transparent;
  font-size: 35px;
  font-family: Comic Sans MS;
  color: white;
  border: none;
  border-radius: 15px;
`;

export const Background = styled.div`
  background-image: linear-gradient(to right, #1f1c2c, #928dab);
  height: 500px;
`;

//linear-gradient(to right, #283048, #859398)
// linear-gradient(to right, #2bc0e4, #eaecc6);
// linear-gradient(to right, #085078, #85d8ce);
