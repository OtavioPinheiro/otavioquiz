import styled from 'styled-components';

const ExtraContainer = styled.div`
  width: 100%;
  max-width: 490px;
  position: absolute;
  top: 65px;
  padding: 45px 70px;
  margin: auto 40%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default ExtraContainer;