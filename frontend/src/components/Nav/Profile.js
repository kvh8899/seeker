import guardian from "../../images/Guardian.png";
import LogoutButton from "../auth/LogoutButton";
import UserSettingsButton from "../User/UserSettingsButton";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
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
  padding: 5px 0px;
  &:hover {
    background-color: rgb(28, 138, 228);
    color: white;
    cursor: pointer;
  }
`;
const ButtonWrapper = styled.div`
  width: 170px;
  color: inherit;
`;
const IconWrapper = styled.div`
  margin-left: 10px;
`;
function Profile({ profileDrop, profile, setShowDiv, showDiv }) {
  const session = useSelector((state) => state.session.user);
  const hist = useHistory();
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    setShowDiv(false);
    await dispatch(logout());
  };
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
          <ButtonContainer
            onClick={(e) => {
              hist.push("/settings");
            }}
          >
            <IconWrapper>
              <FontAwesomeIcon icon={faUserGear}></FontAwesomeIcon>
            </IconWrapper>
            <ButtonWrapper>
              <UserSettingsButton></UserSettingsButton>
            </ButtonWrapper>
          </ButtonContainer>

          <ButtonContainer onClick={onLogout}>
            <IconWrapper>
              <FontAwesomeIcon icon={faArrowRightFromBracket}></FontAwesomeIcon>
            </IconWrapper>
            <ButtonWrapper>
              <LogoutButton />
            </ButtonWrapper>
          </ButtonContainer>
        </ProfileButtonContainer>
      </div>
    </li>
  );
}

export default Profile;
