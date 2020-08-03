import styled from "styled-components";
import FipRadio from "./indexPage/FipRadio";

const IndexPage = () => (
  <Layout>
    <FipRadio />
  </Layout>
);

export default IndexPage;

const Layout = styled.div`
  margin: auto;
  display: flex;
  padding: 1rem;
  height: 100vh;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 768px) {
    max-width: 100%;
    height: auto;
  }
  @media (orientation: landscape) and (max-width: 768px) {
    width: 100%;
  }
`;
