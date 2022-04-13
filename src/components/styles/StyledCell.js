import styled from 'styled-components';

export const StyledCell = styled.div`
  width: auto;
  border-radius: 0.5vw;
  background-color: rgba(${props => props.color});
  border: ${props => (props.type === 0 ? '0vw solid' : '0.15vw solid')};
  border-color: rgba(${props => props.border_color});
`;
