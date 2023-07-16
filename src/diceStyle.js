import styled from 'styled-components';

export const DiceFace = styled.span`
  display: block;
  transform: scale(var(--ggs, 2.3));
  position: relative;
  box-sizing: border-box;
  width: 22px;
  height: 22px;
  border: 2px solid transparent;
  border-radius: 3px;

  &::before {
    content: '';
    display: block;
    box-sizing: border-box;
    background: currentColor;
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 4px;
    left: ${props => (props.value === 1 ? '7px' : '2px')};
    top: ${props => (props.value === 1 ? '7px' : '2px')};
    box-shadow: ${props => props.value === 1 && 'none'}
      ${props => props.value === 2 && '10px 10px 0'}
      ${props => props.value === 3 && '5px 5px 0, 10px 10px 0'}
      ${props => props.value === 4 && '0 10px 0, 10px 0 0, 10px 10px 0'}
      ${props =>
        props.value === 5 && '0 10px 0, 10px 0 0, 10px 10px 0, 5px 5px 0'}
      ${props =>
        props.value === 6 &&
        '0 5px 0, 0 10px 0, 10px 0 0, 10px 5px 0, 10px 10px 0'};
  }
`;
