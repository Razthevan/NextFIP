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
  padding: 1rem;
  max-width: 50%;
  margin: auto;
  @media (max-width: 768px) {
    max-width: 100%;
  }
  @media (orientation: landscape) and (max-width: 768px) {
    width: 100%;
  }
`;
