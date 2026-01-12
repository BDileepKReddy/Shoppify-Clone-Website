import {
  TextField,
  IndexTable,
  LegacyCard,
  IndexFilters,
  useSetIndexFiltersMode,
  useIndexResourceState,
  Text,
  Divider,
  Spinner,
  Box,
  Button,
  ButtonGroup,
  Icon,
} from '@shopify/polaris';
import { useState, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import SideBar from './Sidebar';
import MainNavbar from './MainNavbar';
import { FiSearch } from 'react-icons/fi';
import { MdSort } from 'react-icons/md';
import CsvImportModal from './CSVImportPopUp';
import { createPortal } from 'react-dom';
import { supabase } from '../config/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { ProductPage } from './ProductsPage';
import { HideIcon, IconsIcon } from '@shopify/polaris-icons';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const SIDEBAR_WIDTH = 240; // adjust if your sidebar is a different width
const NAVBAR_HEIGHT = 44; // adjust if your navbar is a different height

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

const TableWrapper = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 0.5rem 0.5rem 1.2rem 0.5rem;
  border: 1px solid #e3e3e3;
  /* overflow-x: auto; */
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
  min-width: 240px;
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
  color: ${({ status }) => (status && status.toLowerCase() === 'active') ? '#1a7f37' : '#d32f2f'};
  background: ${({ status }) => (status && status.toLowerCase() === 'active') ? '#e6f4ea' : '#fdecea'};
`;

const InventoryText = styled.span`
  color: ${({ low }) => low ? '#d32f2f' : 'inherit'};
  font-weight: ${({ low }) => low ? 600 : 400};
`;

const CardWrapper = styled.div`
  margin-bottom: 3.2rem;
  margin-top: 2.2rem;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.1rem 1.5rem 1.5rem 1.5rem;
  background: #fff;
  border-bottom: 1px solid #e3e3e3;
  transition: all 0.3s ease;
  opacity: ${props => props.isVisible ? '1' : '0'};
  height: ${props => props.isVisible ? 'auto' : '0'};
  overflow: hidden;
  position: relative;
  margin-bottom: ${props => props.isVisible ? '1rem' : '0'};
`;

const SortContainer = styled.div`
  position: absolute;
  right: 0;
  background: #fff;
  border: 1px solid #e3e3e3;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  width: 170px;
  z-index: 100;
  display: ${props => props.isVisible ? 'block' : 'none'};
  padding: 0.08rem 0 0.05rem 0;
`;

const SortFieldList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const SortFieldOption = styled.button`
  background: none;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.13rem 0.5rem;
  font-size: 0.89rem;
  color: #202223;
  cursor: pointer;
  transition: background 0.15s;
  font-weight: ${props => props.active ? 600 : 400};
  &:hover {
    background: #f6f6f7;
  }
`;

const RadioCircle = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid #babfc3;
  border-radius: 50%;
  margin-right: 0.4rem;
  background: #fff;
  position: relative;
  flex-shrink: 0;
  &::after {
    content: '';
    display: ${props => props.active ? 'block' : 'none'};
    width: 7px;
    height: 7px;
    background: #202223;
    border-radius: 50%;
    position: absolute;
    top: 1.5px;
    left: 1.5px;
  }
`;

const SortDivider = styled.div`
  height: 1px;
  background: #e3e3e3;
  margin: 0.2rem 0 0.2rem 0;
`;

const SortDirectionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  padding-bottom: 0.2rem;
`;

const SortDirectionOption = styled.button`
  background: ${props => props.active ? '#f6f6f7' : 'none'};
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.13rem 0.5rem;
  font-size: 0.89rem;
  color: #202223;
  cursor: pointer;
  font-weight: ${props => props.active ? 600 : 400};
  transition: background 0.15s;
  &:hover {
    background: #f6f6f7;
  }
`;

const SortLabel = styled.div`
  font-size: 0.92rem;
  font-weight: 500;
  color: #6d7175;
  padding: 0.1rem 0.5rem 0.2rem 0.5rem;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #e3e3e3;
  border-radius: 12px;
  padding: 0.4rem 0.7rem;
  flex: 1;
  transition: all 0.3s ease;
  box-shadow: 0 1px 2px rgba(0,0,0,0.03);
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: 0.9rem;
  color: #000 !important;
  margin-left: 0.5rem;
  background-color: #ffffff !important;
  &::placeholder {
    color: #8c9196;
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
    -webkit-text-fill-color: #000 !important;
  }
  input[type="text"] {
    color: #000 !important;
  }
`;

const FilterButtonsContainer = styled.div`
  display: flex;
  gap: 0.7rem;
  margin-left: 0;
  margin-top: 0.2rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  background: #fff;
  border: 1px solid #e3e3e3;
  border-radius: 12px;
  padding: 0.4rem 0.7rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #303030;
  &:hover {
    background: #f6f6f7;
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

const TagDropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: #fff;
  border: 1px solid #babfc3;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  width: 180px;
  z-index: 9999;
  padding: 0.2rem 0 0.2rem 0;
  margin-top: 2px;
`;

const TagList = styled.div`
  max-height: 140px;
  overflow-y: auto;
  margin-top: 0.05rem;
`;

const TagOption = styled.div`
  padding: 0.28rem 1rem;
  font-size: 0.97rem;
  color: #202223;
  cursor: pointer;
  background: ${({ active }) => (active ? '#f6f6f7' : '#fff')};
  &:hover {
    background: #f6f6f7;
  }
`;

const StatusDropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: #fff;
  border: 1px solid #babfc3;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  width: 180px;
  z-index: 9999;
  padding: 0.2rem 0 0.2rem 0;
  margin-top: 2px;
`;

const StatusList = styled.div`
  max-height: 140px;
  overflow-y: auto;
  margin-top: 0.05rem;
`;

const StatusOption = styled.label`
  display: flex;
  align-items: center;
  padding: 0.28rem 1rem;
  font-size: 0.97rem;
  color: #202223;
  cursor: pointer;
  background: ${({ active }) => (active ? '#f6f6f7' : '#fff')};
  &:hover {
    background: #f6f6f7;
  }
`;

const StatusCheckbox = styled.input`
  margin-right: 0.7rem;
`;

const StatusClear = styled.div`
  padding: 0.28rem 1rem;
  font-size: 0.97rem;
  color: #8c9196;
  cursor: pointer;
  background: #fff;
  border-top: 1px solid #eee;
  &:hover {
    background: #f6f6f7;
    color: #202223;
  }
`;

async function getCurrentUserId() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    console.log('No user logged in or token expired');
    return null;
  }
  return user.id; // This is the Supabase UID which we use as vendorUid
}

function ProductList() {
  const navigate = useNavigate();
  const [vendorUid, setVendorUid] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isSortVisible, setIsSortVisible] = useState(false);
  const [currentSort, setCurrentSort] = useState({ field: 'title', direction: 'asc' });

  const [itemStrings, setItemStrings] = useState([
    'All',
    'Unpaid',
    'Open',
    'Closed',
    'Local delivery',
    'Local pickup',
  ]);
  const [selected, setSelected] = useState(0);

  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const [tagSearch, setTagSearch] = useState('');
  const tagDropdownRef = useRef(null);
  const tagButtonRef = useRef(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 180 });
  const tagOptions = [
    'Chocolate', 'Ekadashi', 'Gluten free', 'millet', 'noodles', 'Pasta', 'Sattvik', 'Veg', 'Vegan'
  ];
  const filteredTagOptions = tagOptions.filter(tag => tag.toLowerCase().includes(tagSearch.toLowerCase()));

  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const statusButtonRef = useRef(null);
  const [statusDropdownPos, setStatusDropdownPos] = useState({ top: 0, left: 0, width: 180 });
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const statusOptions = ['Active', 'Draft', 'Archived'];

  const [isMoreActionsOpen, setIsMoreActionsOpen] = useState(false);
  const moreActionsRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const id = await getCurrentUserId();
        setVendorUid(id);
      } catch (err) {
        console.error('Error getting Supabase user:', err);
        setVendorUid(null);
      }
    })();
  }, []);

  useEffect(() => {
    if (!vendorUid) {
      return;
    }

    setLoading(true);
    fetch(`https://aniyor-backend.onrender.com/products?vendorUid=${vendorUid}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error fetching products: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const formattedProducts = data.products || [];
        setProducts(formattedProducts);
      })
      .catch((err) => {
        setError(err.message);
        console.error('Error fetching products:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [vendorUid]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (tagDropdownRef.current && !tagDropdownRef.current.contains(event.target)) {
        setIsTagDropdownOpen(false);
      }
    }
    if (isTagDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isTagDropdownOpen]);

  useEffect(() => {
    if (isTagDropdownOpen && tagButtonRef.current) {
      const rect = tagButtonRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  }, [isTagDropdownOpen]);

  useEffect(() => {
    if (isStatusDropdownOpen && statusButtonRef.current) {
      const rect = statusButtonRef.current.getBoundingClientRect();
      setStatusDropdownPos({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  }, [isStatusDropdownOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target) &&
          statusButtonRef.current && !statusButtonRef.current.contains(event.target)) {
        setIsStatusDropdownOpen(false);
      }
    }
    if (isStatusDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isStatusDropdownOpen]);

  const deleteView = (index) => {
    const newViews = [...itemStrings];
    newViews.splice(index, 1);
    setItemStrings(newViews);
    setSelected(0);
  };

  const duplicateView = async (name) => {
    const newViews = [...itemStrings, name];
    setItemStrings(newViews);
    setSelected(newViews.length - 1);
    await sleep(1);
    return true;
  };

  const renameView = async (index, newName) => {
    const updated = itemStrings.map((item, idx) => (idx === index ? newName : item));
    setItemStrings(updated);
    await sleep(1);
    return true;
  };

  const tabs = itemStrings.map((item, index) => ({
    content: item,
    index,
    id: `${item}-${index}`,
    isLocked: index === 0,
    actions:
      index === 0
        ? []
        : [
            { type: 'rename', onPrimaryAction: (value) => renameView(index, value) },
            { type: 'duplicate', onPrimaryAction: (value) => duplicateView(value) },
            { type: 'delete', onPrimaryAction: () => deleteView(index) },
          ],
  }));

  const onCreateNewView = async (value) => {
    const newViews = [...itemStrings, value];
    setItemStrings(newViews);
    setSelected(newViews.length - 1);
    await sleep(1);
    return true;
  };

  const primaryAction =
    selected === 0
      ? { type: 'save-as', onAction: onCreateNewView }
      : { type: 'save', onAction: () => Promise.resolve(true) };

  const handleSort = (field, direction) => {
    setCurrentSort({ field, direction });
    const sortedProducts = [...products].sort((a, b) => {
      let valueA = a[field] || '';
      let valueB = b[field] || '';

      // Handle numeric values
      if (field === 'totalInventory') {
        valueA = Number(valueA) || 0;
        valueB = Number(valueB) || 0;
      } else {
        // Handle string values
        valueA = String(valueA).toLowerCase();
        valueB = String(valueB).toLowerCase();
      }

      if (direction === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });

    setProducts(sortedProducts);
    setIsSortVisible(false);
  };

  const sortOptions = [
    { field: 'title', label: 'Product name', directions: ['A-Z', 'Z-A'] },
    { field: 'status', label: 'Status', directions: ['A-Z', 'Z-A'] },
    { field: 'totalInventory', label: 'Inventory', directions: ['Low to high', 'High to low'] },
    { field: 'productType', label: 'Type', directions: ['A-Z', 'Z-A'] },
    { field: 'vendor', label: 'Vendor', directions: ['A-Z', 'Z-A'] },
  ];

  const { mode, setMode } = useSetIndexFiltersMode();

  const [taggedWith, setTaggedWith] = useState('');
  const [queryValue, setQueryValue] = useState('');

  const handleTaggedWithChange = useCallback((value) => setTaggedWith(value), []);
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(''), []);
  const handleFiltersQueryChange = useCallback((value) => setQueryValue(value), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(''), []);
  const handleFiltersClearAll = useCallback(() => {
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [handleTaggedWithRemove, handleQueryValueRemove]);

  const filters = [
    {
      key: 'taggedWith',
      label: 'Tagged with',
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={handleTaggedWithChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },
  ];

  const appliedFilters = taggedWith
    ? [{ key: 'taggedWith', label: `Tagged with ${taggedWith}`, onRemove: handleTaggedWithRemove }]
    : [];

  const resourceName = {
    singular: 'product',
    plural: 'products',
  };

  const {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
  } = useIndexResourceState(products);

  const [tab, setTab] = useState('All');
  const tabOptions = ['All', 'Active','Draft', 'Archived', '➕'];

  const handleTabChange = (selectedTab) => {
    setTab(selectedTab);
    if (selectedTab === 'All') {
      setProducts(products);
    } else {
      const filtered = products.filter(product => 
        product.status?.toLowerCase() === selectedTab.toLowerCase()
      );
      setProducts(filtered);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      // When search is cleared, apply the current tab filter
      if (tab === 'All') {
        setProducts(products);
      } else {
        const filtered = products.filter(product => 
          product.status?.toLowerCase() === tab.toLowerCase()
        );
        setProducts(filtered);
      }
    } else {
      // Apply both search and tab filters
      const filtered = products.filter(product => {
        const matchesSearch = 
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          (product.vendor && product.vendor.toLowerCase().includes(query.toLowerCase())) ||
          (product.productType && product.productType.toLowerCase().includes(query.toLowerCase()));
        
        const matchesTab = tab === 'All' || product.status?.toLowerCase() === tab.toLowerCase();
        
        return matchesSearch && matchesTab;
      });
      setProducts(filtered);
    }
  };

  const rowMarkup = products.map((product, index) => {
    const inventoryValue = product.totalInventory || 0;
    const low = typeof inventoryValue === 'number' ? inventoryValue < 10 : String(inventoryValue).includes('in Stock') && parseInt(String(inventoryValue)) < 10;
    return (
      <IndexTable.Row
        id={product.id}
        key={product.id}
        selected={selectedResources.includes(product.id)}
        position={index}
      >
        <IndexTable.Cell>
          {product.image || product.images ? (
            <img
              src={product.image || (Array.isArray(product.images) ? product.images[0] : product.images)}
              alt={product.title}
              style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover', marginRight: 8 }}
            />
          ) : null}
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="semibold">{product.title}</Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <StatusPill status={product.status}>{product.status ?? '—'}</StatusPill>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <InventoryText low={low}>{inventoryValue}{typeof inventoryValue === 'string' && inventoryValue.includes('in Stock') ? '' : ' in Stock'}</InventoryText>
        </IndexTable.Cell>
        <IndexTable.Cell>{product.salesChannels ?? 5}</IndexTable.Cell>
        <IndexTable.Cell>{product.markets ?? 2}</IndexTable.Cell>
        <IndexTable.Cell>{product.productCategory ?? '—'}</IndexTable.Cell>
        <IndexTable.Cell>{product.productType || '—'}</IndexTable.Cell>
        <IndexTable.Cell>{product.vendor || '—'}</IndexTable.Cell>
      </IndexTable.Row>
    );
  });

  const [activeFilters, setActiveFilters] = useState([]);

  const handleCancel = () => {
    setIsSearchVisible(false);
    setSearchQuery('');
    setProducts(products);
    setActiveFilters([]);
  };

  const toggleFilter = (filter) => {
    setActiveFilters(prev => 
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const sortFields = [
    { field: 'title', label: 'Product title' },
    { field: 'createdAt', label: 'Created' },
    { field: 'updatedAt', label: 'Updated' },
    { field: 'totalInventory', label: 'Inventory' },
    { field: 'productType', label: 'Producttype' },
    { field: 'publishingError', label: 'Publishing erroe' },
    { field: 'vendor', label: 'Vendor' },
  ];

  const sortDirections = [
    { direction: 'asc', label: 'A-Z', icon: <span style={{marginRight: 8}}>↑</span> },
    { direction: 'desc', label: 'Z-A', icon: <span style={{marginRight: 8}}>↓</span> },
  ];

  const handleSortField = (field) => {
    setCurrentSort(prev => ({ ...prev, field }));
  };

  const handleSortDirection = (direction) => {
    setCurrentSort(prev => ({ ...prev, direction }));
    // Actually sort when direction is chosen
    const sortedProducts = [...products].sort((a, b) => {
      let valueA = a[currentSort.field] || '';
      let valueB = b[currentSort.field] || '';
      if (currentSort.field === 'totalInventory') {
        valueA = Number(valueA) || 0;
        valueB = Number(valueB) || 0;
      } else {
        valueA = String(valueA).toLowerCase();
        valueB = String(valueB).toLowerCase();
      }
      if (direction === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
    setProducts(sortedProducts);
    setIsSortVisible(false);
  };

  const handleTagSelect = (tag) => {
    setTaggedWith(tag);
    setIsTagDropdownOpen(false);
  };

  const handleStatusChange = (status) => {
    setSelectedStatuses(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const handleStatusClear = () => {
    setSelectedStatuses([]);
    setIsStatusDropdownOpen(false);
  };

  const handleAddProduct = () => {
    navigate('/vendors/addproducts', { state: { from: location.pathname } });
  };

  // Dropdown menu actions with Polaris icons
  const moreActions = [
    { icon: <Icon source={HideIcon} color="base" />, label: 'Hide analytics bar', onClick: () => alert('Hide analytics bar') },
    { icon: <Icon source={IconsIcon} color="base" />, label: 'Create email campaign', onClick: () => alert('Create email campaign') },
    { icon: <Icon source={IconsIcon} color="base" />, label: 'All product reviews', onClick: () => alert('All product reviews') },
    { icon: <Icon source={IconsIcon} color="base" />, label: 'All product reviews to curate', onClick: () => alert('All product reviews to curate') },
    { icon: <Icon source={IconsIcon} color="base" />, label: 'All product reviews', onClick: () => alert('All product reviews') },
  ];

  if (loading) {
    return (
      <Box padding="400" minHeight="200px" display="flex" alignItems="center" justifyContent="center">
        <Spinner accessibilityLabel="Loading products" size="large" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box padding="400">
        <Text color="critical">Error: {error}</Text>
      </Box>
    );
  }

  if (!loading && (!products || products.length === 0)) {
    return <ProductPage />;
  }

  return (
    <PageWrapper>
      <SideBar />
      <MainNavbar />
      <ContentWrapper>
        <HeadingRow>
          <HeadingWrapper>
            Products
          </HeadingWrapper>
          <ActionsWrapper>
            <ButtonGroupWrapper>
              <CustomButton onClick={() => console.log('Export')}>Export</CustomButton>
              <CustomButton onClick={() => setIsImportModalOpen(true)}>Import</CustomButton>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <CustomButton
                  ref={moreActionsRef}
                  onClick={() => setIsMoreActionsOpen((open) => !open)}
                  style={{ position: 'relative', zIndex: 2 }}
                >
                  More actions <MoreActionsArrow>▼</MoreActionsArrow>
                </CustomButton>
                {isMoreActionsOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '110%',
                      right: 0,
                      minWidth: '260px',
                      background: '#fff',
                      borderRadius: '16px',
                      boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                      padding: '8px 0',
                      zIndex: 10,
                      border: '1px solid #ececec',
                    }}
                  >
                    {moreActions.map((action, idx) => (
                      <div
                        key={idx}
                        onClick={() => { setIsMoreActionsOpen(false); action.onClick(); }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '9px 15px',
                          fontSize: '1rem',
                          color: '#222',
                          cursor: 'pointer',
                          borderBottom: idx !== moreActions.length - 1 ? '1px solid #f3f3f3' : 'none',
                          transition: 'background 0.15s',
                        }}
                        onMouseDown={e => e.preventDefault()}
                        onMouseEnter={e => e.currentTarget.style.background = '#f6f6f7'}
                        onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                      >
                        <span style={{ fontSize: '1.2em', opacity: 0.7 }}>{action.icon}</span>
                        {action.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ButtonGroupWrapper>
            <PrimaryButton onClick={handleAddProduct}>Add Products</PrimaryButton>
          </ActionsWrapper>
        </HeadingRow>
        <TitleSummaryGap />
        <CsvImportModal 
          open={isImportModalOpen} 
          onClose={() => setIsImportModalOpen(false)} 
        />
        <SummaryCardsRow>
          <SummaryCard>
            <Text variant="bodyMd" color="subdued">Products by sell-through rate</Text>
            <Text variant="headingMd">8.2% · 31%</Text>
          </SummaryCard>
          <SummaryCard>
            <Text variant="bodyMd" color="subdued">Products by days of inventory remaining</Text>
            <Text variant="headingMd">31.9+ days</Text>
          </SummaryCard>
          <SummaryCard>
            <Text variant="bodyMd" color="subdued">ABC product analysis</Text>
            <Text variant="headingMd">₹4.8K A-grade  ₹3.5K B-grade  ₹19.0K C-grade</Text>
          </SummaryCard>
        </SummaryCardsRow>
        <CardWrapper>
          <LegacyCard>
            <TabRow isSearchVisible={isSearchVisible}>
              {!isSearchVisible && (
                <>
                  {tabOptions.map(option => (
                    <TabButton
                      key={option}
                      active={tab === option}
                      onClick={() => handleTabChange(option)}
                    >
                      {option}
                    </TabButton>
                  ))}
                  <div style={{ display: 'flex', gap: '0.5rem', marginLeft: 'auto', marginRight: 20, position: 'relative' }}>
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
                    <div style={{ position: 'relative' }}>
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
                        onClick={() => setIsSortVisible(!isSortVisible)}
                      >
                        <MdSort size={20} color="#303030" />
                      </button>
                      <SortContainer isVisible={isSortVisible}>
                        <SortLabel>Sort by</SortLabel>
                        <SortFieldList>
                          {sortFields.map(option => (
                            <SortFieldOption
                              key={option.field}
                              active={currentSort.field === option.field}
                              onClick={() => handleSortField(option.field)}
                            >
                              <RadioCircle active={currentSort.field === option.field} />
                              {option.label}
                            </SortFieldOption>
                          ))}
                        </SortFieldList>
                        <SortDivider />
                        <SortDirectionList>
                          {sortDirections.map(opt => (
                            <SortDirectionOption
                              key={opt.direction}
                              active={currentSort.direction === opt.direction}
                              onClick={() => handleSortDirection(opt.direction)}
                            >
                              {opt.icon}{opt.label}
                            </SortDirectionOption>
                          ))}
                        </SortDirectionList>
                      </SortContainer>
                    </div>
                  </div>
                </>
              )}
            </TabRow>
            <div style={{ padding: isSearchVisible ? '0 1.5rem 0.5rem 1.5rem' : '0' }}>
              <SearchContainer isVisible={isSearchVisible}>
                <SearchBarWrapper>
                  <SearchBar>
                    <FiSearch size={20} color="#303030" />
                    <SearchInput
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      autoFocus
                    />
                  </SearchBar>
                  <CancelButton onClick={handleCancel}>Cancel</CancelButton>
                </SearchBarWrapper>
                <FilterButtonsContainer>
                  <FilterButton onClick={() => toggleFilter('status')}>
                    Product Vendor
                    {activeFilters.includes('status') && ' ✓'}
                  </FilterButton>
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <FilterButton ref={tagButtonRef} onClick={() => setIsTagDropdownOpen((v) => !v)}>
                      Tagged With
                      {activeFilters.includes('inventory') && ' ✓'}
                    </FilterButton>
                    {isTagDropdownOpen && createPortal(
                      <TagDropdownContainer
                        style={{
                          position: 'absolute',
                          top: dropdownPos.top,
                          left: dropdownPos.left,
                          width: dropdownPos.width,
                        }}
                        ref={tagDropdownRef}
                      >
                        <TagList>
                          {tagOptions.length === 0 ? (
                            <TagOption style={{ color: '#8c9196', cursor: 'default' }}>
                              No tags found
                            </TagOption>
                          ) : (
                            tagOptions.map(tag => (
                              <TagOption
                                key={tag}
                                active={taggedWith === tag}
                                onClick={() => handleTagSelect(tag)}
                              >
                                {tag}
                              </TagOption>
                            ))
                         )}
                        </TagList>
                      </TagDropdownContainer>,
                      document.body
                    )}
                  </div>
                </FilterButtonsContainer>
              </SearchContainer>
            </div>
            <TableContainer isSearchVisible={isSearchVisible}>
              <StyledIndexTable
                resourceName={resourceName}
                itemCount={products.length}
                selectedItemsCount={allResourcesSelected ? 'All' : selectedResources.length}
                onSelectionChange={handleSelectionChange}
                headings={[
                  { title: '' },
                  { title: 'Product' },
                  { title: 'Status' },
                  { title: 'Inventory' },
                  { title: 'Sales channels' },
                  { title: 'Markets' },
                  { title: 'Category' },
                  { title: 'Type' },
                  { title: 'Vendor' },
                ]}
              >
                {rowMarkup}
              </StyledIndexTable>
            </TableContainer>
          </LegacyCard>
        </CardWrapper>
      </ContentWrapper>
    </PageWrapper>
  );
}

export default ProductList;