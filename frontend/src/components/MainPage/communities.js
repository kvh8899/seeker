import styled from "styled-components";

function Communities() {
  const ComList = styled.div`
    height: 300px;
    width: 100%;
    background-color: white;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  `;
  const Banner = styled.div`
    width: 100%;
    height: 75px;
    background-image: url("https://64.media.tumblr.com/b790ba39f071ed0a831028bd5b68e7bb/6500bd25966cc789-5f/s1280x1920/571876b6f49e2128dd06714ae8bc08b71020c51b.jpg");
    background-size: cover;
    background-position: top -20px;
    border-radius: 3px 3px 0px 0px;
  `;

  return (
    <ComList>
      <Banner></Banner>
    </ComList>
  );
}

export default Communities;
