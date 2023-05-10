import styled from 'styled-components';

export const Background = styled.div`
  background-color: rgba(201, 192, 211);
  width: 100%;
  height: 100vh;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
`;

export const Backbutton = styled.div`
  position: absolute;
  top: 8%;
  left: 120px;
  font-size: 25px;
  font-weight: 800;
`;

export const Body = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  width: 800px;
  height: 550px;
  z-index: 10;
  border: solid 2px #7a7281;
  border-radius: 10px;
  @media screen and (max-width: 807px) {
    width: 700px;
    bottom: 550px;
  }
`;
export const Edit = styled.div`
  margin-left: 580px;
  margin-top: 3px;
  @media screen and (max-width: 807px) {
    margin-left: 500px;
    margin-top: 3px;
  }
  @media screen and (max-width: 813px) {
    margin-left: 450px;
    margin-top: 3px;
  }
  @media screen and (max-width: 632px) {
    margin-left: 300px;
    margin-top: 3px;
  }
`;

export const Editbutton = styled.button`
  background-color: #c4e1e1;
  width: 80px;
  height: 30px;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  font-weight: bold;
  font-family: serif;
  cursor: pointer;
  @media screen and (max-width: 632px) {
    width: 60px;
    height: 30px;
  }
`;

export const Title = styled.div`
  width: 500px;
  height: 50px;
  margin-left: 10px;
  padding: 10px;
  font-size: 40px;
  text-align: center;
  color: #484891;
  font-family: serif;
`;

export const Label = styled.div`
  margin-top: -10px;
  font-size: 20px;
  border-radius: 10px;
  width: 150px;
  //   text-align: center;
  font-family: serif;
  border: none;
`;

export const Bodyword = styled.div`
  width: 400px;
  height: 400px;
  margin: 40px 20px;
  font-size: 18px;
  font-family: serif;
`;

export const InputTitle = styled.input`
  width: 500px;
  height: 50px;
  border: solid 1px #9d9d9d;
  margin-left: 20px;
  padding: 10px;
  font-size: 40px;
  text-align: center;
  border-radius: 5px;
  background-color: transparent;
`;

export const Select = styled.select`
  margin: 5px 20px;
  font-size: 18px;
  border: solid 1px #9d9d9d;
  border-radius: 10px;
  width: 120px;
  text-align: center;
  background-color: transparent;
`;

export const InputBody = styled.textarea`
  width: 500px;
  height: 300px;
  border: solid 1px #9d9d9d;
  margin: 10px 20px;
  border-radius: 5px;
  background-color: transparent;
`;

export const Popup = styled.div`
  width: 300px;
  height: 150px;
  border: solid 2px #408080;
  background-color: #d1e9e9;
  border-radius: 5px;
  top: 40%;
  bottom: 60%;
  margin: 0 auto;
  position: absolute;
  right: 0;
  left: 0;
`;
