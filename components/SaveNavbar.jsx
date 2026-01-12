import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from "react-icons/fa";
import { supabase } from '../config/supabaseClient';
import AniyorLogo from "../assets/AniyorLogo.png";
import DefaultAvatar from "../assets/LoginAvatar.png";
import { useNavigate } from "react-router-dom";

const Navbar = styled.div`
  background-color: #1A1A1A;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  height: 50px;
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

const CenterText = styled.div`
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-right: 20px;
`;

const DiscardButton = styled.button`
  background: ${({ active }) => (active ? '#1A1A1A' : '#fff')};
  color: ${({ active }) => (active ? '#fff' : '#1A1A1A')};
  border: ${({ active }) => (active ? '1px solid #fff' : 'none')};
  border-radius: 6px;
  padding: 6px 18px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-right: 4px;
  transition: background 0.2s, color 0.2s, border 0.2s;
  &:hover {
    background: ${({ active }) => (active ? '#303030' : '#f3f3f3')};
    color: #fff;
  }
`;

const SaveButton = styled.button`
  background: ${({ active }) => (active ? '#fff' : '#1A1A1A')};
  color: ${({ active }) => (active ? '#1A1A1A' : '#fff')};
  border: 1px solid #fff;
  border-radius: 6px;
  padding: 6px 18px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: ${({ active }) => (active ? '#f3f3f3' : '#303030')};
    color: ${({ active }) => (active ? '#1A1A1A' : '#fff')};
  }
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
  background-color: #2a2a2a;
  padding: 5px;
  border-radius: 12px;
  cursor: pointer;
  gap: 6px;
  position: relative;
  transition: background 0.2s ease;
  margin-left: 10px;
  &:hover {
    background-color: #333;
  }
`;

const UserText = styled.div`
  font-size: 14px;
  color: white;
  font-weight: 500;
`;

const UserAvatar = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 6px;
  object-fit: cover;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  background-color: #2f2f2f;
  border: 1px solid #444;
  border-radius: 8px;
  padding: 10px 0;
  width: 160px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.5);
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  z-index: 1001;
`;

const DropdownItem = styled.div`
  padding: 10px 16px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-color: #444;
  }
`;

const SaveNavbar = ({ onSave, onDiscard, isDirty }) => {
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    if (onSave) onSave();
    navigate(-1);
  };

  const handleDiscardClick = (e) => {
    e.preventDefault();
    if (onDiscard) onDiscard();
    navigate(-1);
  };

  return (
    <Navbar>
      <LogoContainer>
        <Logo src={AniyorLogo} alt="Aniyor Logo" />
      </LogoContainer>
      <CenterText>
        <span style={{ color: "#fff", fontWeight: 500 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 18, marginRight: 4 }}>⚠</span>
            Unsaved draft order
          </span>
        </span>
      </CenterText>
      <ActionsContainer>
        <DiscardButton onClick={handleDiscardClick} active={isDirty}>Discard</DiscardButton>
        <SaveButton onClick={handleSaveClick} active={isDirty} disabled={!isDirty}>Save</SaveButton>
        <UserBox onClick={() => setDropdownVisible(!dropdownVisible)}>
          <UserText>{user?.user_metadata?.username || 'Username'}</UserText>
          <UserAvatar src={user?.user_metadata?.avatar_url || DefaultAvatar} alt="avatar" />
          <Dropdown visible={dropdownVisible}>
            <DropdownItem onClick={() => alert("Edit Profile")}>Edit Profile</DropdownItem>
            <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
          </Dropdown>
        </UserBox>
      </ActionsContainer>
    </Navbar>
  );
};

export default SaveNavbar;