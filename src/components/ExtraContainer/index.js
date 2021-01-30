import styled from 'styled-components';

const ExtraContainer = styled.div`
  width: 100%;
  max-width: 490px;
  position: absolute;
  top: 65px;
  padding: 45px 70px;
  margin: auto 30%;
  @media screen and (max-width: 500px) {
    position: relative;
    top: -40px;
    left: -15px;
    margin: auto;
    padding: 15px;
    width: 350px;
    max-width: 350px;
  }
`;

export default ExtraContainer;