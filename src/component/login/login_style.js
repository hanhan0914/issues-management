import styled from 'styled-components';

export const Title = styled.div`
  font-family: serif;
  font-size: 100px;
  font-weight: bolder;
  margin: 50px;
  margin-left: 100px;
  color: #000000;
`;

export const LoginButton = styled.button`
  width: 240px;
  height: 80px;
  position: relative;
  left: 50%;
  transform: translate(-50%, -50%);

  // button 屬性修改
  font-weight: 900;
  background-color: transparent;
  font-size: 35px;
  font-family: serif;
  color: white;
  border: none;
  // background-image: linear-gradient(to right, #003973, #e5e5be);

  border-radius: 15px;
`;

export const Background = styled.div`
  background-image: linear-gradient(to right, #1f1c2c, #928dab);
  height: 100%;
`;

export const Word = styled.p`
  //   // 水平置中
  position: relative;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 100px;
`;

//linear-gradient(to right, #283048, #859398)
// linear-gradient(to right, #2bc0e4, #eaecc6);

// linear-gradient(to right, #085078, #85d8ce);
