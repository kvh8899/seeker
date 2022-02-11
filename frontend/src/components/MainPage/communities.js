import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrending } from "../../store/trpages";
import banner from "../../images/banner.png";
const ComList = styled.div`
  max-height: 450px;
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
  background-image: url("${banner}");
  background-size: cover;
  background-position: top 0px left -350px;
  border-radius: 3px 3px 0px 0px;
  display: flex;
  align-items: flex-end;
`;
const TrendingList = styled.ol`
  list-style: none;
  padding: 0px;
  margin: 0px;
`;
const TreProfile = styled.img`
  height: 40px;
  width: 40px;
  object-fit: cover;
  border-radius: 100%;
  margin-right: 20px;
  margin-left: 20px;
`;
const TreListItem = styled.div`
  display: flex;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: 20px;
`;
const TreTitle = styled.a`
  margin: 0px;
  color: black;
  max-width: 120px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
export const BannerTitle = styled.p`
  color: white;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  padding-left: 20px;
  margin-bottom: 0px;
  padding-bottom: 5px;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 20%,
    rgba(0, 0, 0, 0.1) 40%,
    rgba(0, 0, 0, 0.2) 70%,
    rgba(0, 0, 0, 0.3) 100%,
    rgba(0, 0, 0, 0.4) 100%
  );
`;
const TreLi = styled.li`
  border-bottom: 1px solid lightgray;
`;
function Communities() {
  const dispatch = useDispatch();
  const sideBarPages = useSelector((state) => state.sideBarPages);
  async function loadData() {
    await dispatch(getTrending());
  }
  useEffect(() => {
    loadData();
  }, []);

  return (
    <ComList>
      <Banner>
        <BannerTitle>Most Followed Communities</BannerTitle>
      </Banner>
      <TrendingList>
        {sideBarPages.map((e, i) => {
          return (
            <TreLi key={e.id}>
              <TreListItem>
                <TreTitle>{i + 1 + "."}</TreTitle>
                <TreProfile src={e.profile_image} alt=""></TreProfile>
                <TreTitle id={e.id} href={`/pages/${e.id}`}>
                  {e.title}
                </TreTitle>
              </TreListItem>
            </TreLi>
          );
        })}
      </TrendingList>
    </ComList>
  );
}

export default Communities;
