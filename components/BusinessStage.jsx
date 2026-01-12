import React, { useState } from 'react';
import styled from 'styled-components';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import PlansBackGround from '../assets/PlansBackGround.png';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  background-image: url(${PlansBackGround});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  background: white;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.08);
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 600;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
`;

const OptionWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

const Option = styled.button`
  flex: 1;
  padding: 3 px;
  border-radius: 8px;
  border: ${({ selected }) => (selected ? 'none' : '1px solid #d9d9d9')};
  background-color: ${({ selected }) => (selected ? '#1a1a1a' : '#f6f6f7')};
  color: ${({ selected }) => (selected ? 'white' : '#1c1c1c')};
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #000000;
  }
`;

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const NextButton = styled.button`
  background: none;
  border: none;
  color: #333;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const options = [
  {
    label: "I'm just starting",
    value: 'starting',
  },
  {
    label: "I'm already selling online or in person",
    value: 'selling',
  },
];

const BusinessStageSelector = () => {
  const [selected, setSelected] = useState('starting');
  const navigate = useNavigate();

  return (
    <Container>
      <Card>
        <div>
          <Title>Which of these best describes you?</Title><br/>
          <Subtitle>We’ll help you get set up based on your business needs.</Subtitle>
        </div>

        <OptionWrapper>
          {options.map((option) => (
            <Option
              key={option.value}
              selected={selected === option.value}
              onClick={() => setSelected(option.value)}
            >
              {option.label}
            </Option>
          ))}
        </OptionWrapper>

        <Navigation>
          <NavButton>
            <FiChevronLeft /> Back
          </NavButton>
          <NextButton onClick={() => navigate('/what-do-you-sell')}>
            Next <FiChevronRight />
          </NextButton>
        </Navigation>
      </Card>
    </Container>
  );
};

export default BusinessStageSelector;
