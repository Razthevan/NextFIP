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
`;
