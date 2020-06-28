import styled from "styled-components";

const SpotifyLink = ({ spotifyLink }) => {
  if (!spotifyLink) {
    return null;
  }
  return (
    <a href={spotifyLink} target="_blank">
      <Logo src={"/spotify.svg"} />
    </a>
  );
};

export default SpotifyLink;

const Logo = styled.img`
  height: 40px;
  margin-left: 20px;
`;
