import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Button } from '@shopify/polaris';
import { FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import PlansBackGround from '../assets/PlansBackGround.png';
import basicLogo from '../assets/basiclogo.png';
import regularLogo from '../assets/regularlogo.png';
import advancedLogo from '../assets/advancedlogo.png';

const GlobalStyle = createGlobalStyle`
  .dark-button .Polaris-Button--primary {
    background-color: #303030 !important;
    border-color: #303030 !important;
  }

  .dark-button .Polaris-Button--primary:hover {
    background-color: #303030 !important;
    border-color: #303030 !important;
  }
`;

const plans = [
  {
    title: 'Basic',
    subtitle: 'For solo entrepreneurs',
    badge: 'Most Popular',
    originalPrice: '₹594',
    discountedPrice: '₹20',
    logo: basicLogo,
    features: [
      '2% 3rd-party payment providers',
      '2% Platform Fee',
      '5% Commission on Sale of Services',
      '9% Commission on Sale of Products',
    ],
  },
  {
    title: 'Regular',
    subtitle: 'For small teams',
    originalPrice: '₹1094',
    discountedPrice: '₹20',
    logo: regularLogo,
    features: [
      '2% 3rd-party payment providers',
      '2% Platform Fee',
      '3.5% Commission on Sale of Services',
      '7.5% on Sale of Products',
    ],
  },
  {
    title: 'Advanced',
    subtitle: 'As your business scales',
    originalPrice: '₹3994',
    discountedPrice: '₹20',
    logo: advancedLogo,
    features: [
      '2% 3rd-party payment providers',
      '1% Platform Fee',
      '2% Commission on Sale of Services',
      '5% on Sale of Products',
      '2% rd-party payment providers',
    ],
  },
];

const Background = styled.div`
  background-image: url(${PlansBackGround});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const CardWrapper = styled.div`
  position: relative;
  max-width: 1000px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  text-align: left;
  margin-bottom: 32px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin: 0;
  font-weight: 600;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 14px;
`;

const PlanList = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
`;

const PlanCard = styled.div`
  flex: 1;
  border: 1px solid #eee;
  border-radius: 10px;
  overflow: hidden;
  min-width: 280px;
  background: #f9fafb;
  display: flex;
  flex-direction: column;
`;

const PlanHeader = styled.div`
  background-color: #E3EDFF;
  padding: 10px;
  text-align: left;
`;

const PlanTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PlanTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
`;

const PlanIcon = styled.img`
  width: 30px;
  height: 50px;
  margin-left: 8px;
`;

const PlanSubtitle = styled.div`
  font-size: 13px;
  color: #555;
`;

const Badge = styled.span`
  background-color: #008060;
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 6px;
  margin-left: 8px;
`;

const PlanContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const PriceSection = styled.div`
  padding: 16px;
`;

const OldPrice = styled.span`
  text-decoration: line-through;
  color: #888;
  font-size: 20px;
  margin-right: 8px;
`;

const NewPrice = styled.span`
  font-size: 24px;
  font-weight: bold;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0 16px;
  margin: 16px 0;
  flex: 1;
`;

const FeatureItem = styled.li`
  font-size: 14px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;

  &::before {
    content: '✔';
    color: #008060;
    margin-right: 8px;
  }
`;

const PlanFooter = styled.div`
  padding: 0 16px 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const PriceNote = styled.div`
  font-size: 12px;
  color: #666;
`;

const FooterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
`;

const LinkText = styled.a`
  color: #007aff;
  cursor: pointer;
  text-decoration: none;
  font-size: 14px;
  line-height: 1;
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: underline;
  }
`;

const NextButton = styled.button`
  background: none;
  border: none;
  color: #333;
  font-size: 14px;
  line-height: 1;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const PricingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <GlobalStyle />
      <Background>
        <CardWrapper>
          <Header>
            <Title>Which plan do you want to try?</Title>
            <br />
            <Subtitle>We’ll make sure you’re set up to sell in these places.</Subtitle>
          </Header>

          <PlanList>
            {plans.map((plan, index) => (
              <PlanCard key={index}>
                <PlanHeader>
                  <PlanTitleContainer>
                    <PlanTitle>
                      {plan.title}
                      {plan.badge && <Badge>{plan.badge}</Badge>}
                    </PlanTitle>
                    <PlanIcon src={plan.logo} alt={`${plan.title} Logo`} />
                  </PlanTitleContainer>
                  <PlanSubtitle>{plan.subtitle}</PlanSubtitle>
                </PlanHeader>

                <PlanContent>
                  <PriceSection>
                    <OldPrice>{plan.originalPrice}</OldPrice>
                    <NewPrice>{plan.discountedPrice} INR</NewPrice>
                  </PriceSection>

                  <FeatureList>
                    {plan.features.map((f, i) => (
                      <FeatureItem key={i}>{f}</FeatureItem>
                    ))}
                  </FeatureList>
                </PlanContent>

                <PlanFooter>
                  <div className="dark-button">
                    <Button variant="primary" size="large">
                      Activate {plan.title}
                    </Button>
                  </div>
                  <PriceNote>Free for 3 days, then ₹20 for 1 month</PriceNote>
                </PlanFooter>
              </PlanCard>
            ))}
          </PlanList>

          <FooterSection>
            <LinkText>+ verify plan details</LinkText>
            <NextButton onClick={() => navigate('/onboarding')}>
              Next <FiChevronRight />
            </NextButton>
          </FooterSection>
        </CardWrapper>
      </Background>
    </>
  );
};

export default PricingPage;
