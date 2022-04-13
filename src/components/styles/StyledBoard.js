import styled from 'styled-components';

export const StyledBoard = styled.div`
  display: grid;
  grid-template-rows: repeat(
    ${props => props.height},
    calc(26vw / ${props => props.width})
  );
  grid-template-columns: repeat(${props => props.width}, 1fr);
  grid-gap: 0px;
  width: 100%;
  background: #00000033;
  border: 0.15vw solid #00000033;
  border-radius: 0.6vw;
  position: relative;
`;
