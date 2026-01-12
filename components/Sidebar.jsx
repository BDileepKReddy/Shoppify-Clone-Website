import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from '@shopify/polaris';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  HomeFilledIcon,
  OrderIcon,
  ProductIcon,
  PersonFilledIcon,
  StoreFilledIcon,
  ContentIcon,
  TargetIcon,
  ChartVerticalFilledIcon,
  MoneyFilledIcon,
  DiscountFilledIcon,
  PersonSegmentIcon,
} from '@shopify/polaris-icons';

const SidebarContainer = styled.div`
  width: 220px;
  background-color: #f4f4f4;
  padding: 20px 0;
  height: calc(100vh - 30px); /* account for top margin */
  margin-top: 30px; /* add top margin */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed; /* Optional: makes it fixed on the left */
  top: 0;
  left: 0;
  `;

const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  margin: 4px 0;
  cursor: pointer;
  padding: 2px 16px;
  border-radius: 8px;
  background-color: ${(props) => (props.$active ? '#ffffff' : 'transparent')};
  font-weight: 500;
  font-size: 14px;
  color: #1c1c1c;

  &:hover {
    background-color: #e6e6e6;
  }
`;

const SubItem = styled(SidebarItem)`
  padding-left: 40px;
  font-size: 13px;
  color: ${(props) => (props.$active ? '#303030' : '#616161')};
  font-weight: ${(props) => (props.$active ? '600' : '500')};
`;

const SidebarIconWrapper = styled.div`
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SettingsSection = styled.div`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #333;
  cursor: pointer;

  &:hover {
    background-color: #e6e6e6;
  }
`;

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('');
  const [isHomeOpen, setIsHomeOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isCustomersOpen, setIsCustomersOpen] = useState(false);
  const [isVendorOpen, setIsVendorOpen] = useState(false);
  const [isContentOpen, setIsContentOpen] = useState(false);
  const [isFinancesOpen, setIsFinancesOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);

  // Set initial active state based on current route
  useEffect(() => {
    const path = location.pathname;
    // Reset all states first
    setIsHomeOpen(false);
    setIsProductsOpen(false);
    setIsOrdersOpen(false);
    setIsServicesOpen(false);
    setIsCustomersOpen(false);
    setIsVendorOpen(false);
    setIsContentOpen(false);
    setIsFinancesOpen(false);
    setIsAnalyticsOpen(false);

    // Set active tab and open subitems based on current path
    if (path === '/') {
      setActiveTab('Home');
      setIsHomeOpen(true);
      navigate('/dashboard');
    } else if (path.startsWith('/orders')) {
      setActiveTab('Orders');
      setIsOrdersOpen(true);
    } else if (path.startsWith('/products')) {
      setActiveTab('Products');
      setIsProductsOpen(true);
    } else if (path.startsWith('/services')) {
      setActiveTab('Services');
      setIsServicesOpen(true);
    } else if (path.startsWith('/customers')) {
      setActiveTab('Customers');
      setIsCustomersOpen(true);
    } else if (path.startsWith('/vendor')) {
      setActiveTab('Vendor');
      setIsVendorOpen(true);
    } else if (path.startsWith('/content')) {
      setActiveTab('Content');
      setIsContentOpen(true);
    } else if (path.startsWith('/finances')) {
      setActiveTab('Finances');
      setIsFinancesOpen(true);
      setActiveTab('Analytics');
      setIsAnalyticsOpen(true);
    } else if (path === '/marketing') {
      setActiveTab('Marketing');
    } else if (path === '/discounts') {
      setActiveTab('Discounts');
    }
  }, [location.pathname, navigate]);

  const handleNavigation = (path, tab) => {
    setActiveTab(tab);
    navigate(path);
  };

  const handleMainItemClick = (section, path) => {
    navigate(path);
    setActiveTab(section);
    toggleSection(section);
  };

  const toggleSection = (section) => {
    setIsHomeOpen(false);
    setIsProductsOpen(false);
    setIsOrdersOpen(false);
    setIsServicesOpen(false);
    setIsCustomersOpen(false);
    setIsVendorOpen(false);
    setIsContentOpen(false);
    setIsFinancesOpen(false);
    setIsAnalyticsOpen(false);
    switch (section) {
      case 'Home':
        setIsHomeOpen(true);
        break;
      case 'Products':
        setIsProductsOpen(true);
        break;
      case 'Orders':
        setIsOrdersOpen(true);
        break;
      case 'Services':
        setIsServicesOpen(true);
        break;
      case 'Customers':
        setIsCustomersOpen(true);
        break;
      case 'Vendor':
        setIsVendorOpen(true);
        break;
      case 'Content':
        setIsContentOpen(true);
        break;
      case 'Finances':
        setIsFinancesOpen(true);
        break;
      case 'Analytics':
        setIsAnalyticsOpen(true);
        break;
      default:
        break;
    }
  };

  const subItemsproducts = [
    { name: 'Collections', path: '/collections' },
    { name: 'Inventory', path: '/inventory' },
    { name: 'Purchase orders', path: '/purchase-orders' },
    { name: 'Transfers', path: '/transfers' },
    { name: 'Gift cards', path: '/gift-cards' },
  ];

  const subItemsorders = [
    { name: 'Drafts', path: '/drafts' },
    { name: 'Shipping labels', path: '/shipping-labels' },
    { name: 'Abandoned checkouts', path: '/abandoned-checkouts' },
  ];

  const subItemsservices = [
    { name: 'My Calendar', path: '/calendar' },
    { name: 'My Booking', path: '/bookings' },
    { name: 'Serviceable Location', path: '/locations' },
    { name: 'My Team', path: '/team' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Tax', path: '/tax' },
  ];

  const subItemscustomers = [
    { name: 'All Customers', path: '/customers' },
    { name: 'Customer Groups', path: '/customers/groups' },
    { name: 'Customer Tags', path: '/customers/tags' },
  ];

  const subItemsvendor = [
    { name: 'All Vendors', path: '/vendor' },
    { name: 'Vendor Requests', path: '/vendor/requests' },
    { name: 'Vendor Payments', path: '/vendor/payments' },
  ];

  const subItemscontent = [
    { name: 'All Content', path: '/content' },
    { name: 'Blogs', path: '/content/blogs' },
    { name: 'Pages', path: '/content/pages' },
  ];

  const subItemsfinances = [
    { name: 'Overview', path: '/finances' },
    { name: 'Transactions', path: '/finances/transactions' },
    { name: 'Reports', path: '/finances/reports' },
  ];

  const subItemsanalytics = [
    { name: 'Overview', path: '/analytics' },
    { name: 'Reports', path: '/analytics/reports' },
    { name: 'Live View', path: '/analytics/live' },
  ];

  return (
    <SidebarContainer>
      <MenuSection>
        <SidebarItem
          $active={activeTab === 'Home'}
          onClick={() => handleMainItemClick('Home', '/dashboard')}
        >
          <SidebarIconWrapper>
            <Icon source={HomeFilledIcon} />
          </SidebarIconWrapper>
          Home
        </SidebarItem>

        <SidebarItem
          $active={activeTab === 'Orders'}
          onClick={() => handleMainItemClick('Orders', '/orders')}
        >
          <SidebarIconWrapper>
            <Icon source={OrderIcon} />
          </SidebarIconWrapper>
          Orders
        </SidebarItem>
        {isOrdersOpen &&
          subItemsorders.map((item) => (
            <SubItem
              key={item.name}
              $active={activeTab === item.name}
              onClick={() => handleNavigation(item.path, item.name)}
            >
              {item.name}
            </SubItem>
          ))}

        <SidebarItem
          $active={activeTab === 'Products'}
          onClick={() => handleMainItemClick('Products', '/products')}
        >
          <SidebarIconWrapper>
            <Icon source={ProductIcon} />
          </SidebarIconWrapper>
          Products
        </SidebarItem>
        {isProductsOpen &&
          subItemsproducts.map((item) => (
            <SubItem
              key={item.name}
              $active={activeTab === item.name}
              onClick={() => handleNavigation(item.path, item.name)}
            >
              {item.name}
            </SubItem>
          ))}

        <SidebarItem
          $active={activeTab === 'Services'}
          onClick={() => handleMainItemClick('Services', '/services')}
        >
          <SidebarIconWrapper>
            <Icon source={PersonSegmentIcon} />
          </SidebarIconWrapper>
          Services
        </SidebarItem>
        {isServicesOpen &&
          subItemsservices.map((item) => (
            <SubItem
              key={item.name}
              $active={activeTab === item.name}
              onClick={() => handleNavigation(item.path, item.name)}
            >
              {item.name}
            </SubItem>
          ))}

        <SidebarItem
          $active={activeTab === 'Customers'}
          onClick={() => handleMainItemClick('Customers', '/customers')}
        >
          <SidebarIconWrapper>
            <Icon source={PersonFilledIcon} />
          </SidebarIconWrapper>
          Customers
        </SidebarItem>
        {isCustomersOpen &&
          subItemscustomers.map((item) => (
            <SubItem
              key={item.name}
              $active={activeTab === item.name}
              onClick={() => handleNavigation(item.path, item.name)}
            >
              {item.name}
            </SubItem>
          ))}

        <SidebarItem
          $active={activeTab === 'Vendor'}
          onClick={() => handleMainItemClick('Vendor', '/vendor')}
        >
          <SidebarIconWrapper>
            <Icon source={StoreFilledIcon} />
          </SidebarIconWrapper>
          Vendor
        </SidebarItem>
        {isVendorOpen &&
          subItemsvendor.map((item) => (
            <SubItem
              key={item.name}
              $active={activeTab === item.name}
              onClick={() => handleNavigation(item.path, item.name)}
            >
              {item.name}
            </SubItem>
          ))}

        <SidebarItem
          $active={activeTab === 'Content'}
          onClick={() => handleMainItemClick('Content', '/content')}
        >
          <SidebarIconWrapper>
            <Icon source={ContentIcon} />
          </SidebarIconWrapper>
          Content
        </SidebarItem>
        {isContentOpen &&
          subItemscontent.map((item) => (
            <SubItem
              key={item.name}
              $active={activeTab === item.name}
              onClick={() => handleNavigation(item.path, item.name)}
            >
              {item.name}
            </SubItem>
          ))}

        <SidebarItem
          $active={activeTab === 'Finances'}
          onClick={() => handleMainItemClick('Finances', '/finances')}
        >
          <SidebarIconWrapper>
            <Icon source={MoneyFilledIcon} />
          </SidebarIconWrapper>
          Finances
        </SidebarItem>
        {isFinancesOpen &&
          subItemsfinances.map((item) => (
            <SubItem
              key={item.name}
              $active={activeTab === item.name}
              onClick={() => handleNavigation(item.path, item.name)}
            >
              {item.name}
            </SubItem>
          ))}

        <SidebarItem
          $active={activeTab === 'Analytics'}
          onClick={() => handleMainItemClick('Analytics', '/analytics')}
        >
          <SidebarIconWrapper>
            <Icon source={ChartVerticalFilledIcon} />
          </SidebarIconWrapper>
          Analytics
        </SidebarItem>
        {isAnalyticsOpen &&
          subItemsanalytics.map((item) => (
            <SubItem
              key={item.name}
              $active={activeTab === item.name}
              onClick={() => handleNavigation(item.path, item.name)}
            >
              {item.name}
            </SubItem>
          ))}

        <SidebarItem
          $active={activeTab === 'Marketing'}
          onClick={() => handleNavigation('/marketing', 'Marketing')}
        >
          <SidebarIconWrapper>
            <Icon source={TargetIcon} />
          </SidebarIconWrapper>
          Marketing
        </SidebarItem>

        <SidebarItem
          $active={activeTab === 'Discounts'}
          onClick={() => handleNavigation('/discounts', 'Discounts')}
        >
          <SidebarIconWrapper>
            <Icon source={DiscountFilledIcon} />
          </SidebarIconWrapper>
          Discounts
        </SidebarItem>
      </MenuSection>

      <SettingsSection>
        <SidebarIconWrapper>
          <Icon source={DiscountFilledIcon} />
        </SidebarIconWrapper>
        Settings
      </SettingsSection>
    </SidebarContainer>
  );
};

export default SideBar;