import styled from 'styled-components';

export const Input = styled.input`
  border-radius: 200px 0 0 200px;
  border: none;
  width: 400px;
  height: 30px;
  outline: none;
`;

export const SearchBox = styled.div`
  margin: auto;
  display: flex;
`;

export const Background = styled.div`
  background-color: #d8d8eb;
  width: 100%;
  height: 100%;
`;

export const SearchInput = styled.input`
  border-radius: 200px;
  margin: 10px 10px 10px 100px;
  width: 450px;
  height: 40px;
  type: text;
  border: solid 2px #8e8e8e;
  @media screen and (max-width: 635px) {
    margin: 10px 10px 10px 30px;
  }
`;

export const Filter = styled.select`
  margin-left: 250px;
  width: 95px;
  height: 30px;
  fontfamily: serif;
  background-color: #f0f0f0;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  @media screen and (max-width: 1400px) {
    margin-left: 150px;
  }
  @media screen and (max-width: 1290px) {
    margin-left: 100px;
  }

  @media screen and (max-width: 840px) {
    margin-left: 50px;
  }

  @media screen and (max-width: 778px) {
    margin-left: 100px;
  }
`;

export const DirectionButton = styled.button`
  background-color: rgba(0, 0, 0, 0);
  border: none;
  cursor: pointer;
  margin-left: 20px;
  border-radius: 200px;
  @media screen and (max-width: 840px) {
    margin-left: 5px;
  }
`;

export const FormBackground = styled.div`
  background-color: #a3d1d1;
  border-color: #3d7878;
  position: absolute;
  width: 550px;
  height: 500px;
  margin: 0 auto;
  right: 0;
  left: 0;
  top: 100px;
  border-radius: 5px;
  padding: 10px;
  z-index: 4;
`;

export const HintWord = styled.p`
  color: red;
  font-weight: 500;
  font-size: 15px;
`;

export const CreateButton = styled.button`
  font-family: serif;
  font-size: 23px;
  border: none;
  width: 120px;
  border-radius: 50%;
  background-color: #95caca;
  color: white;
  font-weight: 900;
  position: fixed;
  right: 100px;
  bottom: 160px;
  cursor: pointer;
  @media screen and (max-width: 1180px) {
    width: 80px;
    bottom: 120px;
  }
  @media screen and (max-width: 635px) {
    bottom: 110px;
  }
`;

export const Img = styled.img`
  position: fixed;
  right: 100px;
  bottom: 20px;
  width: 300px;
  @media screen and (max-width: 1180px) {
    width: 200px;
  }
  @media screen and (max-width: 635px) {
    width: 150px;
  }
`;

export const ListBackground = styled.div`
  font-family: serif;
  font-size: 18px;
  font-weight: 800;
  margin: 3px 80px;
  margin-right: 350px;
  @media screen and (max-width: 635px) {
    margin: 3px 40px;
  }
`;

export const ListCard = styled.div`
  border: solid 3px #b8b8dc;
  background: white;
  border-radius: 5px;
  height: 200px;
  width: 920px;
  padding: 15px;
  @media screen and (max-width: 1400px) {
    width: 800px;
    padding: 15px;
  }
  @media screen and (max-width: 1290px) {
    width: 700px;
    padding: 15px;
  }

  @media screen and (max-width: 790px) {
    width: 550px;
    padding: 15px;
  }
  @media screen and (max-width: 635px) {
    width: 450px;
  }
`;

export const ListWord = styled.b`
  margin: 8px;
  font-size: 25px;
  font-weight: 900;
`;

export const ListBody = styled.div`
  margin: 10px 10px;
  font-size: 15px;
  max-width: 600px;
  line-height: 18px;
  max-height: 36px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Label = styled.button`
  margin: 3px 8px;
  font-size: 20px;
  border: none;
  border-radius: 10px;
  background-color: transparent;
`;

export const SearchHint = styled.div`
  background-color: transparent;
  border: none;
  font-size: 18px;
  font-weight: 600;
  margin: 10px 80px;
`;
