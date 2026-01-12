import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from "react-icons/fa"; 
import { supabase } from '../config/supabaseClient'; // make sure to update path
import AniyorLogo from "../assets/AniyorLogo.png";
import DefaultAvatar from "../assets/LoginAvatar.png"; // fallback avatar

const Navbar = styled.div`
  background-color: #1A1A1A;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw; /* Ensures it spans entire viewport width */
  box-sizing: border-box;
  position: fixed; /* Optional: makes navbar sticky at top */
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

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: #303030;
  border-radius: 8px;
  padding: 6px 12px;
  width: 400px;
  position: relative;
  gap: 8px;
  justify-content: space-between;
`;

const SearchIcon = styled(FaSearch)`
  color: #ccc;
  font-size: 14px;
  flex-shrink: 0;
`;

const ShortcutText = styled.span`
  color: #999;
  font-size: 12px;
  font-family: monospace;
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
  margin-right: 20px;

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

const MainNavbar = () => {
  const searchRef = useRef(null);
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Ctrl + K search shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Fetch current user
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload(); // or navigate to login
  };

  return (
    <Navbar>
      <LogoContainer>
        <Logo src={AniyorLogo} alt="Aniyor Logo" />
      </LogoContainer>

      <SearchContainer>
        <SearchIcon />
        <SearchInput ref={searchRef} placeholder="Search" />
        <ShortcutText>CTRL + K</ShortcutText>
      </SearchContainer>

      <UserBox onClick={() => setDropdownVisible(!dropdownVisible)}>
        <UserText>
          {
            user?.user_metadata?.full_name ||
            user?.user_metadata?.display_name ||
            user?.user_metadata?.username ||
            'Username'
          }
        </UserText>
        <UserAvatar src={user?.user_metadata?.avatar_url || DefaultAvatar} alt="avatar" />
        <Dropdown visible={dropdownVisible}>
          <DropdownItem onClick={() => alert("Edit Profile")}>Edit Profile</DropdownItem>
          <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
        </Dropdown>
      </UserBox>
    </Navbar>
  );
};

export default MainNavbar;
