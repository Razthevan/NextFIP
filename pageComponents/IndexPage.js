import styled from "styled-components";
import FipRadio from "./indexPage/FipRadio";

const IndexPage = () => (
  <Layout>
    <FipRadio />
  </Layout>
);

export default IndexPage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 1rem;
  margin: auto;
  @media (max-width: 768px) {
    max-width: 100%;
  }
  @media (orientation: landscape) and (max-width: 768px) {
    width: 100%;
  }
`;
