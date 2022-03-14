import guardian from "../../images/Guardian.png";
import LogoutButton from "../auth/LogoutButton";
import UserSettingsButton from "../User/UserSettingsButton";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGear,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
const ProfileButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;
const ButtonWrapper = styled.div`
  width: 170px;
`;
const IconWrapper = styled.div`
  margin-left: 10px;
`;
function Profile({ profileDrop, profile, setShowDiv, showDiv }) {
  const session = useSelector((state) => state.session.user);
  return (
    <li
      className="profile"
      onClick={(e) => {
        e.stopPropagation();
        profile.current.classList.toggle("profileStick");
        profileDrop.current.classList.toggle("displayNun");
        profileDrop.current.classList.toggle("profileDrop");
      }}
      ref={profile}
    >
      <div className="profileMeta">
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={guardian}
            width="30px"
            alt=""
            style={{ marginRight: "5px" }}
          ></img>
          <div>{session && session.username}</div>
        </div>
        <i className="fas fa-chevron-down"></i>
      </div>
      <div
        className="displayNun"
        onClick={(e) => {
          e.stopPropagation();
        }}
        ref={profileDrop}
      >
        <ProfileButtonContainer>
          <ButtonContainer>
            <IconWrapper>
              <FontAwesomeIcon icon={faUserGear}></FontAwesomeIcon>
            </IconWrapper>
            <ButtonWrapper>
              <UserSettingsButton></UserSettingsButton>
            </ButtonWrapper>
          </ButtonContainer>

          <ButtonContainer>
            <IconWrapper>
              <FontAwesomeIcon icon={faArrowRightFromBracket}></FontAwesomeIcon>
            </IconWrapper>
            <ButtonWrapper>
              <LogoutButton setShowDiv={setShowDiv} showDiv={showDiv} />
            </ButtonWrapper>
          </ButtonContainer>
        </ProfileButtonContainer>
      </div>
    </li>
  );
}

export default Profile;
