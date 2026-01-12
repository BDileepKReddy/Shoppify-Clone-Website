import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa"; 
import AniyorLogo from "../assets/AniyorLogo.png";
import photo from "../assets/FirstPagePhoto.png";
import LoginAvatar from "../assets/LoginAvatar.png";
import { useNavigate } from "react-router-dom";

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #2f2f2f;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Navbar = styled.nav`
  width: 100vw;
  height: 50px;
  background: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Logo = styled.img`
  width: 118px;
  height: 50px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 75px;
  flex: 1;
  justify-content: center;
`;

const NavItem = styled.a`
  color: white;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
  margin-right: 80px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: #303030;
  border-radius: 8px;
  padding: 6px 12px;
  width: 280px;
  position: relative;
  gap: 8px;
  justify-content: space-between;
`;

const SearchIcon = styled(FaSearch)`
  color: #ccc;
  font-size: 14px;
  flex-shrink: 0;
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  color: #ccc;
  font-size: 14px;
  width: 100%;
  outline: none;
`;

const ShortcutText = styled.span`
  color: #999;
  font-size: 12px;
  font-family: monospace;
  flex-shrink: 0;
`;

const LoginButton = styled.button`
  background: #303030;
  color: white;
  font-weight: 600;
  border-radius: 8px;
  padding: 8px 18px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #4a4a4a;
  }
`;

const MainContainer = styled.section`
  flex-grow: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 32px;
  background: #f2f2f5;
  margin-top: 30px;
  overflow: hidden;
`;

const BackgroundWave = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  line-height: 0;
  transform: rotate(180deg);
  z-index: 0;

  svg {
    position: relative;
    display: block;
    width: calc(179% + 1.3px);
    height: 500px;
  }

  .shape-fill {
    fill: #ebebf0;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  width: 100%;
  z-index: 1;
`;

const TextContainer = styled.div`
  max-width: 600px;
`;

const Heading = styled.h1`
  color: #1f2431;
  font-weight: 800;
  font-size: 46px;
  margin-bottom: 16px;
`;

const Description = styled.p`
  color: #1f2431;
  font-size: 18px;
  margin-bottom: 24px;
`;

const StartSellingButton = styled.button`
  background: #3a3a3a;
  color: white;
  font-weight: 600;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 18px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #4a4a4a;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SellerImage = styled.img`
  width: 400px;
  height: 400px;
`;

const FirstPage = () => {
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <PageWrapper>
      <Navbar>
        <LogoContainer>
          <Logo src={AniyorLogo} alt="Aniyor Logo" />
        </LogoContainer>

        <NavLinks>
          <NavItem href="#">Start</NavItem>
          <NavItem href="#">Grow</NavItem>
          <NavItem href="#">Pricing</NavItem>
          <NavItem href="#">Resources</NavItem>
        </NavLinks>

        <RightSection>
          <SearchContainer>
            <SearchIcon />
            <SearchInput ref={searchInputRef} placeholder="Search" />
            <ShortcutText>CTRL + K</ShortcutText>
          </SearchContainer>

          <LoginButton onClick={() => navigate("/login")}>
            Login
            <img
              src={LoginAvatar}
              alt="Avatar"
              style={{ width: "20px", height: "20px", borderRadius: "10%" }}
            />
          </LoginButton>
        </RightSection>
      </Navbar>

      <MainContainer>
        <BackgroundWave>
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39
              -57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8
              C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="shape-fill"
            />
          </svg>
        </BackgroundWave>

        <ContentWrapper>
          <TextContainer>
            <Heading>Become an Aniyor seller</Heading>
            <Description>Sell on Aniyor.in, India’s best shopping destination</Description>
            <StartSellingButton onClick={() => navigate("/body")}>Start Selling</StartSellingButton>
          </TextContainer>
          <ImageContainer>
            <SellerImage src={photo} alt="Seller" />
          </ImageContainer>
        </ContentWrapper>
      </MainContainer>
    </PageWrapper>
  );
};

export default FirstPage;
