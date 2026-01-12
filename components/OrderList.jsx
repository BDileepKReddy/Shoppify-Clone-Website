import {
  Card,
  Text,
  Button,
  ButtonGroup,
  LegacyCard,
  IndexTable,
  useIndexResourceState,
  Divider,
  Spinner,
  Box,
} from '@shopify/polaris';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import SideBar from './Sidebar';
import MainNavbar from './MainNavbar';
import { FiSearch } from 'react-icons/fi';
import { MdSort } from 'react-icons/md';
import { createPortal } from 'react-dom';

// --- ProductList-style layout and components ---
const SIDEBAR_WIDTH = 240;
const NAVBAR_HEIGHT = 44;

const PageWrapper = styled.div`
  padding: 0;
  background-color: #f6f6f7;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin-left: ${SIDEBAR_WIDTH + 24}px;
  margin-top: ${NAVBAR_HEIGHT + 24}px;
  margin-right: auto;
  margin-bottom: 0;
  width: calc(100vw - ${SIDEBAR_WIDTH + 48}px);
  box-sizing: border-box;
  padding-left: 12px;
  padding-right: 12px;
`;

const CustomButton = styled.button`
  background: #E3E3E3;
  color: #202223;
  border: 1px solid #babfc3;
  border-radius: 12px;
  padding: 0.25rem 1.1rem;
  font-size: 0.97rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border 0.2s;
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  height: 32px;
  &:hover {
    background: #f1f2f3;
    border-color: #aeb4b9;
  }
`;

const PrimaryButton = styled.button`
  background: #303030;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 0.25rem 1.3rem;
  font-size: 0.97rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  margin-left: 0.7rem;
  height: 32px;
  &:hover {
    background: #393c40;
  }
`;

const ButtonGroupWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const MoreActionsArrow = styled.span`
  display: inline-block;
  margin-left: 0.4em;
  font-size: 1em;
`;

const HeadingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
`;

const HeadingWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
  font-weight: 700;
  color: #202223;
  margin-left: 0;
  margin-bottom: 0;
  margin-top: 0;
`;

const ActionsWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 0;
`;

const TitleSummaryGap = styled.div`
  height: 2.2rem;
`;

const CardWrapper = styled.div`
  margin-bottom: 3.2rem;
  margin-top: 2.2rem;
`;

const SummaryCardsRow = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-bottom: 1.3rem;
`;

const SummaryCard = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  padding: 0.9rem 1.3rem;
  min-width: 180px;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const TabRow = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: ${props => props.isSearchVisible ? '0.7rem' : '0.0rem'};
  margin-left: 0.5rem;
  position: relative;
  min-height: 48px;
`;

const TabButton = styled.button`
  background: ${({ active }) => (active ? '#fff' : 'transparent')};
  color: ${({ active }) => (active ? '#202223' : '#6d7175')};
  border: 1px solid ${({ active }) => (active ? '#babfc3' : 'transparent')};
  border-radius: 8px;
  padding: 0.45rem 1.3rem;
  font-size: 0.93rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 0.9rem;
  margin-right: 0.5rem;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #f1f2f3;
    color: #202223;
  }
`;

const StatusPill = styled.span`
  display: inline-block;
  padding: 2px 12px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
  color: ${props => (props.status && (props.status.toLowerCase() === 'fulfilled' || props.status.toLowerCase() === 'paid')) ? '#1a7f37' : '#d32f2f'};
  background: ${props => (props.status && (props.status.toLowerCase() === 'fulfilled' || props.status.toLowerCase() === 'paid')) ? '#e6f4ea' : '#fdecea'};
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.1rem 1.5rem 1.5rem 1.5rem;
  background: #fff;
  border-bottom: 1px solid #e3e3e3;
  transition: all 0.3s ease;
  opacity: 1;
  height: auto;
  overflow: visible;
  position: relative;
  margin-bottom: 0.5rem;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const SearchInput = styled.input`
  border: 1px solid #e3e3e3;
  outline: none;
  width: 100%;
  font-size: 0.97rem;
  color: #000 !important;
  border-radius: 8px;
  padding: 0.7rem 1rem;
  background-color: #fff !important;
  &::placeholder {
    color: #8c9196;
  }
`;

const CancelButton = styled.button`
  background: #fff;
  border: 1px solid #e3e3e3;
  border-radius: 12px;
  padding: 0.4rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: #303030;
  &:hover {
    background: #f6f6f7;
  }
`;

const TableContainer = styled.div`
  transition: margin-top 0.3s ease;
  margin-top: ${props => props.isSearchVisible ? '0' : '0'};
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
`;

const StyledIndexTable = styled(IndexTable)`
  .Polaris-IndexTable__Table {
    border-spacing: 0 2px !important;
  }
  .Polaris-IndexTable__TableRow {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.03);
    margin-bottom: 2px;
    min-height: 44px;
  }
  .Polaris-IndexTable__TableCell {
    padding-top: 7px !important;
    padding-bottom: 7px !important;
    font-size: 1rem;
    vertical-align: middle;
  }
`;

const SortPopupContainer = styled.div`
  position: absolute;
  top: 110%;
  right: 0;
  background: #fff;
  border: 1px solid #e3e3e3;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.10);
  width: 170px;
  z-index: 9999;
  padding: 0.18rem 0.5rem 0.18rem 0.5rem;
  font-size: 0.9rem;
  max-height: 90vh;
  overflow-y: auto;
`;

const SortPopupTitle = styled.div`
  font-weight: 600;
  color: #303030;
  padding: 0.2rem 0 0.1rem 0;
  font-size: 0.92rem;
  line-height: 1.2;
`;

const SortOption = styled.label`
  display: flex;
  align-items: center;
  padding: 0.18rem 0;
  font-size: 0.9rem;
  color: #202223;
  cursor: pointer;
  background: ${({ active }) => (active ? '#f6f6f7' : '#fff')};
  border-radius: 6px;
  margin-bottom: 0.02rem;
  transition: background 0.15s;
  &:hover {
    background: #f1f2f3;
  }
`;

const SortRadio = styled.input`
  margin-right: 0.7rem;
`;

const SortDivider = styled.div`
  height: 1px;
  background: #e3e3e3;
  margin: 0.18rem 0 0.18rem 0;
`;

const SortDirectionOption = styled.button`
  background: ${props => props.active ? '#f6f6f7' : 'none'};
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.18rem 0;
  font-size: 0.9rem;
  color: #202223;
  cursor: pointer;
  font-weight: ${props => props.active ? 600 : 400};
  border-radius: 6px;
  margin-bottom: 0.02rem;
  transition: background 0.15s;
  &:hover {
    background: #f1f2f3;
  }
`;

// --- Main component logic ---
function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(0);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [isSortPopupOpen, setIsSortPopupOpen] = useState(false);
  const sortButtonRef = useRef(null);
  const sortPopupRef = useRef(null);
  const [sortPopupPos, setSortPopupPos] = useState({ top: 0, left: 0, width: 240 });
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');

  const filterTabs = [
    'All',
    'Unfulfilled',
    'Unpaid',
    'Open',
    'Archived',
    'Local Delivery',
  ];

  const sortFields = [
    { value: 'name', label: 'Order number' },
    { value: 'date', label: 'Date' },
    { value: 'items', label: 'Items' },
    { value: 'destination', label: 'Destination' },
    { value: 'customer', label: 'Customer name' },
    { value: 'paymentStatus', label: 'Payment status' },
    { value: 'fulfillmentStatus', label: 'Fulfillment status' },
    { value: 'total', label: 'Total' },
    { value: 'channel', label: 'Channel' },
  ];

  useEffect(() => {
    let didCancel = false;
    const controller = new AbortController();

    async function fetchOrders() {
      try {
        const res = await fetch('https://aniyor-backend.onrender.com/orders', { signal: controller.signal });
        if (!res.ok) throw new Error('Failed to fetch orders');
        const data = await res.json();
        if (!didCancel) {
          setOrders(data.orders || []);
          setLoading(false);
        }
      } catch (err) {
        if (!didCancel) {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    fetchOrders();

    return () => {
      didCancel = true;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (isSortPopupOpen && sortButtonRef.current) {
      const rect = sortButtonRef.current.getBoundingClientRect();
      setSortPopupPos({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX - 120 + rect.width, // right align
        width: 240
      });
    }
  }, [isSortPopupOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sortPopupRef.current && !sortPopupRef.current.contains(event.target) &&
          sortButtonRef.current && !sortButtonRef.current.contains(event.target)) {
        setIsSortPopupOpen(false);
      }
    }
    if (isSortPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSortPopupOpen]);

  const handleSortField = (field) => setSortField(field);
  const handleSortDirection = (dir) => setSortDirection(dir);

  const getSortedOrders = (orders) => {
    let sorted = [...orders];
    sorted.sort((a, b) => {
      let aValue = a[sortField] || '';
      let bValue = b[sortField] || '';
      if (sortField === 'date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else if (sortField === 'items') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      } else if (sortField === 'total') {
        aValue = parseFloat((aValue + '').replace(/[^\d.]/g, ''));
        bValue = parseFloat((bValue + '').replace(/[^\d.]/g, ''));
      } else {
        aValue = (aValue + '').toLowerCase();
        bValue = (bValue + '').toLowerCase();
      }
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    return sorted;
  };

  const getFilteredOrders = () => {
    let filtered = orders;
    // If searching, filter by order id or name
    if (searchQuery.trim() !== '') {
      const q = searchQuery.trim().toLowerCase();
      filtered = filtered.filter(order =>
        (order.name && order.name.toLowerCase().includes(q)) ||
        (order.id && order.id.toLowerCase().includes(q))
      );
    } else {
      switch (filterTabs[selected]) {
        case 'Unfulfilled':
          filtered = orders.filter(order => order.fulfillmentStatus && order.fulfillmentStatus.toLowerCase() !== 'fulfilled');
          break;
        case 'Unpaid':
          filtered = orders.filter(order => order.paymentStatus && order.paymentStatus.toLowerCase() !== 'paid');
          break;
        case 'Open':
          filtered = orders.filter(order =>
            (!order.closed_at && !order.cancelled_at && !order.archived)
          );
          break;
        case 'Archived':
          filtered = orders.filter(order => order.archived === true);
          break;
        case 'Local Delivery':
          filtered = orders.filter(order => {
            if (order.shipping_lines && order.shipping_lines.length > 0) {
              return order.shipping_lines[0].title && order.shipping_lines[0].title.toLowerCase().includes('local delivery');
            }
            return order.deliveryMethod && order.deliveryMethod.toLowerCase() === 'local delivery';
          });
          break;
        case 'All':
        default:
          filtered = orders;
      }
    }
    return getSortedOrders(filtered);
  };

  const filteredOrders = getFilteredOrders();

  const summaryCards = [
    { title: 'Today', value: '-' },
    { title: 'Total orders', value: orders.length },
    { title: 'Ordered items over time', value: '-' },
    { title: 'Returns', value: '-' },
    { title: 'Fulfilled orders over time', value: '-' },
    { title: 'Delivered orders over time', value: '-' },
  ];

  const resourceName = { singular: 'order', plural: 'orders' };
  const { selectedResources, allResourcesSelected, handleSelectionChange } = useIndexResourceState(orders);

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Add search functionality here
  };

  const handleCancel = () => {
    setIsSearchVisible(false);
    setSearchQuery('');
    setActiveFilters([]);
  };

  const toggleFilter = (filter) => {
    setActiveFilters(prev => 
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const rowMarkup = filteredOrders.map((order, index) => {
    // Extract delivery method from shipping_lines or fallback
    let deliveryMethod = '-';
    if (order.shipping_lines && order.shipping_lines.length > 0 && order.shipping_lines[0].title) {
      deliveryMethod = order.shipping_lines[0].title;
    } else if (order.deliveryMethod) {
      deliveryMethod = order.deliveryMethod;
    }
    return (
      <IndexTable.Row
        id={order.id}
        key={order.id}
        selected={selectedResources.includes(order.id)}
        position={index}
      >
        <IndexTable.Cell>{order.name || order.id}</IndexTable.Cell>
        <IndexTable.Cell>{order.date ? new Date(order.date).toLocaleString('en-IN', { weekday: 'long', hour: '2-digit', minute: '2-digit', hour12: false }) : '—'}</IndexTable.Cell>
        <IndexTable.Cell>{order.customer}</IndexTable.Cell>
        <IndexTable.Cell>{order.channel}</IndexTable.Cell>
        <IndexTable.Cell>{order.total}</IndexTable.Cell>
        <IndexTable.Cell><StatusPill status={order.paymentStatus}>{order.paymentStatus}</StatusPill></IndexTable.Cell>
        <IndexTable.Cell><StatusPill status={order.fulfillmentStatus}>{order.fulfillmentStatus}</StatusPill></IndexTable.Cell>
        <IndexTable.Cell>{order.items} items</IndexTable.Cell>
        <IndexTable.Cell>{order.deliveryStatus}</IndexTable.Cell>
        <IndexTable.Cell>{deliveryMethod}</IndexTable.Cell>
      </IndexTable.Row>
    );
  });

  if (loading) {
    // Remove loading spinner, just render nothing or a blank area
    return null;
  }

  return (
    <PageWrapper>
      <SideBar />
      <MainNavbar />
      <ContentWrapper>
        <HeadingRow>
          <HeadingWrapper>
            Orders: All locations
          </HeadingWrapper>
          <ActionsWrapper>
            <ButtonGroupWrapper>
              <CustomButton onClick={() => console.log('Export')}>Export</CustomButton>
              <CustomButton onClick={() => console.log('More actions')}>
                More actions <MoreActionsArrow>▼</MoreActionsArrow>
              </CustomButton>
            </ButtonGroupWrapper>
            <PrimaryButton onClick={() => console.log('Create order')}>Create order</PrimaryButton>
          </ActionsWrapper>
        </HeadingRow>
        <TitleSummaryGap />
        <SummaryCardsRow>
          {summaryCards.map((card, idx) => (
            <SummaryCard key={idx}>
              <Text variant="bodyMd" color="subdued">{card.title}</Text>
              <Text variant="headingMd">{card.value}</Text>
            </SummaryCard>
          ))}
        </SummaryCardsRow>
        <CardWrapper>
          <LegacyCard>
            <TabRow isSearchVisible={isSearchVisible}>
              {filterTabs.map((tab, idx) => (
                <TabButton
                  key={tab}
                  active={selected === idx}
                  onClick={() => setSelected(idx)}
                >
                  {tab}
                </TabButton>
              ))}
              <div style={{ display: 'flex', gap: '0.5rem', marginLeft: 'auto', marginRight: 20, position: 'relative' }}>
                {!isSearchVisible && (
                  <>
                    <button
                      style={{
                        background: '#fff',
                        border: '1px solid #e3e3e3',
                        borderRadius: '12px',
                        padding: '0.4rem 0.7rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                      }}
                      onClick={() => setIsSearchVisible(true)}
                    >
                      <FiSearch size={20} color="#303030" />
                    </button>
                    <button
                      ref={sortButtonRef}
                      style={{
                        background: '#fff',
                        border: '1px solid #e3e3e3',
                        borderRadius: '12px',
                        padding: '0.4rem 0.7rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                      }}
                      onClick={() => setIsSortPopupOpen(v => !v)}
                    >
                      <MdSort size={20} color="#303030" />
                    </button>
                    {isSortPopupOpen && createPortal(
                      <SortPopupContainer
                        ref={sortPopupRef}
                        style={{
                          position: 'absolute',
                          top: sortPopupPos.top,
                          left: sortPopupPos.left,
                          width: sortPopupPos.width,
                        }}
                      >
                        <SortPopupTitle>Sort by</SortPopupTitle>
                        {sortFields.map(opt => (
                          <SortOption key={opt.value} active={sortField === opt.value}>
                            <SortRadio
                              type="radio"
                              name="sortField"
                              checked={sortField === opt.value}
                              onChange={() => handleSortField(opt.value)}
                            />
                            {opt.label}
                          </SortOption>
                        ))}
                        <SortDivider />
                        <SortDirectionOption
                          active={sortDirection === 'asc'}
                          onClick={() => handleSortDirection('asc')}
                        >
                          <span style={{ marginRight: 8 }}>↑</span> Oldest to newest
                        </SortDirectionOption>
                        <SortDirectionOption
                          active={sortDirection === 'desc'}
                          onClick={() => handleSortDirection('desc')}
                        >
                          <span style={{ marginRight: 8 }}>↓</span> Newest to oldest
                        </SortDirectionOption>
                      </SortPopupContainer>,
                      document.body
                    )}
                  </>
                )}
              </div>
            </TabRow>
            <div style={{ padding: isSearchVisible ? '0 1.5rem 0.5rem 1.5rem' : '0' }}>
              <SearchContainer>
                {isSearchVisible ? (
                  <SearchBarWrapper>
                    <SearchInput
                      type="text"
                      placeholder="Search orders..."
                      value={searchQuery}
                      onChange={e => handleSearch(e.target.value)}
                      autoFocus
                    />
                    <CancelButton onClick={handleCancel} style={{ marginLeft: 12 }}>Cancel</CancelButton>
                  </SearchBarWrapper>
                ) : null}
              </SearchContainer>
            </div>
            <TableContainer isSearchVisible={isSearchVisible}>
              {error ? (
                <Box padding="400"><Text color="critical">Error: {error}</Text></Box>
              ) : (
                <StyledIndexTable
                  resourceName={resourceName}
                  itemCount={orders.length}
                  selectedItemsCount={allResourcesSelected ? 'All' : selectedResources.length}
                  onSelectionChange={handleSelectionChange}
                  headings={[
                    { title: 'Order' },
                    { title: 'Date' },
                    { title: 'Customer' },
                    { title: 'Channel' },
                    { title: 'Total' },
                    { title: 'Payment status' },
                    { title: 'Fulfillment status' },
                    { title: 'Items' },
                    { title: 'Delivery Status' },
                    { title: 'Delivery Method' },
                  ]}
                >
                  {rowMarkup}
                </StyledIndexTable>
              )}
            </TableContainer>
          </LegacyCard>
        </CardWrapper>
      </ContentWrapper>
    </PageWrapper>
  );
}

export default OrderList;