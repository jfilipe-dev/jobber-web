import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px;
  border-bottom: 1px solid #ccc;
`;

export const Title = styled.h2`
  font-weight: bold;
  color: #333;
`;

export const Close = styled.button`
  background: transparent;
  border: none;
`;

export const Content = styled.div`
  color: #333;
  font-size: 1.4rem;
  padding: 20px;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 18px;
  border-top: 1px solid #ccc;
  align-items: center;
`;
