import React, { useState } from 'react';
import styled from 'styled-components';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Icon } from '@shopify/polaris';
import {
  ProductIcon,
  FolderIcon,
  DeliveryIcon,
  CalendarIcon,
  ChannelsIcon,
} from '@shopify/polaris-icons';
import { LuShirt } from 'react-icons/lu';  
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
  padding: 30px ;
  border-radius: 12px;
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.08);
  width: 800px;
  height: 450px;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 24px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 32px;
`;

const Option = styled.div`
  border: 1.5px solid ${({ selected }) => (selected ? '#000000' : '#d9d9d9')};
  background: ${({ selected }) => (selected ? '#1a1a1a' : 'white')};
  border-radius: 8px;
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: border 0.2s, background 0.2s;

  &:hover {
    border-color: #000000;
  }
`;

const OptionInner = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  flex: 1;
`;

const OptionText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: ${({ selected }) => (selected ? '#ffffff' : '#1c1c1c')};
`;

const OptionTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
`;

const OptionSubtitle = styled.div`
  font-size: 13px;
  color: ${({ selected }) => (selected ? '#cccccc' : '#6d7175')};
`;

const IconWrapper = styled.div`
  svg {
    width: 20px;
    height: 20px;
    color: ${({ selected }) => (selected ? 'white' : '#303030')};
    margin-top: 8px;
  }
`;

const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
  width: 20px;
  height: 20px;
  appearance: none;
  border: 1.5px solid #8c8c8c;
  border-radius: 4px;
  background-color: white;
  display: grid;
  place-content: center;
  cursor: pointer;

  &:checked {
    background-color: #000000;
    border-color: #000000;
  }

  &:checked::before {
    content: '✔';
    font-size: 14px;
    color: white;
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

const productOptions = [
  {
    title: 'Products I buy or make myself',
    subtitle: 'Shipped by me',
    icon: ProductIcon,
  },
  {
    title: 'Digital products',
    subtitle: 'Music, digital art, NFTs',
    icon: FolderIcon,
  },
  {
    title: 'Dropshipping products',
    subtitle: 'Sourced and shipped by a third party',
    icon: DeliveryIcon,
  },
  {
    title: 'Services',
    subtitle: 'Coaching, housekeeping, consulting',
    icon: CalendarIcon,
  },
  {
    title: 'Print-on-demand products',
    subtitle: 'My designs, printed and shipped by a third party',
    icon: <LuShirt />,
  },
  {
    title: "I'll decide later",
    subtitle: '',
    icon: ChannelsIcon,
  },
];

const Whatdoyousell = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const navigate = useNavigate();
  const toggleSelection = (index) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index]
    );
  };

  return (
    <Container>
      <Card>
        <Title>What do you sell?</Title>
        <Subtitle>We’ll make sure you’re set up to sell in these places.</Subtitle>

        <Grid>
          {productOptions.map((option, idx) => {
            const isSelected = selectedOptions.includes(idx);

            return (
              <Option
                key={idx}
                selected={isSelected}
                onClick={() => toggleSelection(idx)}
              >
                <OptionInner>
                  <IconWrapper selected={isSelected}>
                    {typeof option.icon === 'function' ? (
                      <Icon source={option.icon} tone={isSelected ? 'inverse' : 'base'} />
                    ) : (
                      option.icon
                    )}
                  </IconWrapper>

                  <OptionText selected={isSelected}>
                    <OptionTitle>{option.title}</OptionTitle>
                    {option.subtitle && (
                      <OptionSubtitle selected={isSelected}>
                        {option.subtitle}
                      </OptionSubtitle>
                    )}
                  </OptionText>
                </OptionInner>

                <StyledCheckbox checked={isSelected} readOnly />
              </Option>
            );
          })}
        </Grid>

        <Navigation>
          <NavButton>
            <FiChevronLeft /> Back
          </NavButton>
          <NextButton onClick={() => navigate('/available-plans')}>
            Next <FiChevronRight />
          </NextButton>
        </Navigation>
      </Card>
    </Container>
  );
};

export default Whatdoyousell;


