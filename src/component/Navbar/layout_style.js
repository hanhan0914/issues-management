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
  height: 30px;
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
  background-color: white;
  border: 1px solid grey;
  width: 150px;
  height: 80px;
`;

export const Li = styled.li`
  margin: 10px;
  border: solid 1px black;
  background-color: white;
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
