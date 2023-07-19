import styled from 'styled-components';

export const Nav = styled.div`
  margin: auto;
  width: 100%;
  height: 35px;
  background: linear-gradient(#408080, #81c0c0);
  display: flex;
  align-items: center;
  box-sizing: border-box;
`;

export const User = styled.button`
  cursor: pointer;
  margin: 5px;
  margin-left: 20%;
  width: 200px;
  height: 25px;
  background-color: #e6f1ed;
  border-radius: 5px;
  border: none;
  font-family: Comic Sans MS;
`;

export const Dropdown = styled.div`
  position: relative;
  margin: 5px;
  margin-left: 80%;
  display: flex;
  align-items: center;
`;

export const Ul = styled.ul`
  position: absolute;
  bottom: -90px;
  left: 75px;
  margin: 10px 0;
  padding: 0;
  background-color: #e6f1ed;
  border-radius: 5px;
  width: 150px;
  height: 80px;
`;

export const Li = styled.li`
  margin: 10px;
  background-color: white;
  list-style: none;
  font-family: Comic Sans MS;
`;

export const LogoutButton = styled.button`
  width: 100%;
  height: 100%;
  text-align: center;

  background: none;
  color: inherit;
  border: none;
  padding: 5px;
  margin: 0;
  font: inherit;
  cursor: pointer;
`;
