import React, { useState, useCallback } from 'react';
import { Text, Tag, LegacyStack, ActionList, Popover, Layout, Card, Select, Page, FormLayout, IndexTable, Divider, Button, TextField, BlockStack, Link, InlineStack, Badge, Box, LegacyCard, Avatar, Checkbox, Tabs, Form, DropZone, Scrollable, useIndexResourceState } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import { Icon } from '@shopify/polaris';
import Sidebar from '../Sidebar';
import MainNavbar from '../MainNavbar';
import styled from 'styled-components';
import Leftadd from '../Vendors/leftadd';
import ArrowLeftIcon from '../../assets/ArrowLeftIcon.svg';
import Greybox from '../../assets/greybox.png';
import Vroom from '../../assets/vroom.png';
import Tdots from '../../assets/tdots.png';
import Rupee from '../../assets/rupee.png';
import Pasta from '../../assets/pasta.png';
import vdicon from '../../assets/vdicon.png';
import Dbox from '../Vendors/dbox';

const Addservices = () => {
    const [selected, setSelected] = useState(0);
    const [popoverActive, setPopoverActive] = useState(true);
    const [status, setStatus] = useState('active');
    const [vendor, setVendor] = useState('');
    const [type, setType] = useState('product');
    const [publicationIds, setPublicationIds] = useState([]);
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');

    const togglePopoverActive = useCallback(
        () => setPopoverActive((popoverActive) => !popoverActive),
        []
    );
    const categoryOptions = [

        { label: "Grocery Store", value: "grocery" },
        { label: "", value: "" },
        { label: "Restaurant", value: "restaurant" },
        { label: "Clothing", value: "clothing" },
        { label: "Other", value: "other" },
    ];


    const activator = (
        <Button onClick={togglePopoverActive} disclosure>
            More actions
        </Button>
    );
    const [comment, setComment] = useState('');

    const timelineData = [
        { text: 'This order was archived', time: '8:22 AM' },
        { text: 'Delhivery fulfilled 4 items from Juhu Koliwada.', time: '8:22 AM' },
        {
            text: 'Order confirmation email was sent to Kajal Somal (pabarikajal@gmail.com).',
            time: '8:22 AM',
            hasPost: true,
        },
        { text: 'A ₹740.00 INR payment was processed on 1 Razorpay.', time: '8:22 AM' },
        { text: 'Confirmation #FUN3CUCHY was generated for this order', time: '8:22 AM' },
        {
            text: 'Kajal Somai placed this order on Online Store (checkout #37767571407618).',
            time: '8:22 AM',
        },
    ];
    // Mark dirty on any field change
    const handleFieldChange = (setter) => (value) => {
        setter(value);
        setIsDirty(true);
    };
    const handleDropZoneDrop = useCallback(
        (_dropFiles, acceptedFiles, _rejectedFiles) =>

            setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]),
        [],
    );
    const dropZoneOverlay = (

        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',      // Horizontal center
                justifyContent: 'center',  // Vertical center
                height: '120px',           // Or whatever height you want
                textAlign: 'center',
            }}
        >


            <InlineStack align="center" gap="200">
                <Button variant="primary">Upload new</Button>
                <Text as="span" variant="bodyMd">
                    Select existing
                </Text>
            </InlineStack>
            <Text as="p" tone="subdued">
                Accepts images, videos or, 3d models
            </Text>
        </div>


    );
    const [price, setPrice] = useState('');
    const [comparePrice, setComparePrice] = useState('');
    const [changeTax, setChangeTax] = useState(false);
    const [cost, setCost] = useState('');
    const [profit, setProfit] = useState('');
    const [margin, setMargin] = useState('1');

    const [locationType, setLocationType] = useState('onsite');
    const [address, setAddress] = useState('');
    const [clientAddress, setClientAddress] = useState('');

    const clientAddressOptions = [
        { label: 'Client Address', value: 'client' },
        { label: 'Office Address', value: 'office' },
        { label: 'Other Address', value: 'other' }
    ];

    const [meetingLink, setMeetingLink] = useState('');

    const [fromTime, setFromTime] = useState('9:00 AM');
    const [toTime, setToTime] = useState('6:00 PM');
    const [slotTime, setSlotTime] = useState('1:00');
    const [slotUnit, setSlotUnit] = useState('Hr');
    const [maxPeople, setMaxPeople] = useState('5');
    const [ml, setMl] = useState('');
    const [selectedSlots, setSelectedSlots] = useState({});
    const [syncCalendar, setSyncCalendar] = useState(true);
    const [calendarEmail, setCalendarEmail] = useState('malharagencies@gmail.com');
    const [requireConfirmation, setRequireConfirmation] = useState(true);

    const timeSlots = [
        '9:00 AM', '10:00 AM', '11:00 AM', '12:00 noon',
        '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
    ];
    const days = ['MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT', 'SUN'];

    const toggleSlot = (day, time) => {
        const key = `${day}-${time}`;
        setSelectedSlots((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const [enabled, setEnabled] = useState(true);
    const [refundDays, setRefundDays] = useState('7');
    const [showDescriptionInput, setShowDescriptionInput] = useState(false);

    const refundOptions = [
        { label: '1 Day', value: '1' },
        { label: '3 Days', value: '3' },
        { label: '5 Days', value: '5' },
        { label: '7 Days', value: '7' },
        { label: '14 Days', value: '14' },
    ];









    return (
        <Background>
            <Page narrowWidth>

                <Sidebar />
                <MainNavbar />
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    width: '100%',
                    marginTop: '1px',
                    flexShrink: 0
                }}>
                    

                    <InlineStack wrap={false} blockAlign="start" gap="0">
                        <div style={{ marginRight: 0 }}>

                            <Box>
                                <div style={{ marginTop: 50, marginBottom: 25, minWidth: 800 }}>
                                    <InlineStack align='space-between' blockAlign='center'>

                                        <div>
                                            <InlineStack gap={400}>



                                                <img src={ArrowLeftIcon} alt="Close" width={30} />
                                                <Text alignment='start' variant='headingLg'>Yoga Class</Text>


                                            </InlineStack>
                                        </div>
                                        <div >


                                        </div>
                                    </InlineStack>
                                </div>

                            </Box>
                            <Box minWidth='750px'>
                                <div style={{ marginBottom: 20 }}>

                                    <Card>



                                        <BlockStack gap="200">
                                            <Text variant="bodyLg" as="h2" fontWeight="semibold" alignment='start'>
                                                Services
                                            </Text>
                                            <InlineStack align="space-between" blockAlign="center" gap="200">
                                                <div style={{ flex: 1 }}>
                                                    <TextField
                                                        value={title}
                                                        onChange={handleFieldChange(setTitle)}
                                                        placeholder="Search"
                                                    />
                                                </div>
                                                <Button>Browse</Button>
                                            </InlineStack>

                                        </BlockStack>
                                    </Card>
                                </div>
                                <Card>


                                    <BlockStack>

                                        <Text variant="bodyLg" as="h2" fontWeight="semibold" alignment='start'>
                                            Title
                                        </Text>


                                        <div style={{ flex: 1 }}>
                                            <TextField
                                                value={title}
                                                onChange={handleFieldChange(setTitle)}
                                                placeholder="Enter product name"
                                            />
                                        </div>
                                        <div style={{ marginTop: 20 }}>



                                            <Dbox setDescription={setDescription} />
                                        </div>


                                    </BlockStack>



                                    <BlockStack>
                                        <Box maxHeight='200px'>


                                            <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                                                <Text variant="bodyLg" as="h2" fontWeight="semibold" alignment='start'>
                                                    Media
                                                </Text>


                                                <DropZone onDrop={handleDropZoneDrop} >
                                                    {dropZoneOverlay}
                                                </DropZone>

                                            </div>

                                        </Box>

                                    </BlockStack>

                                    <Box>
                                        <div style={{ marginTop: 10, marginBottom: 10 }}>

                                            <Text variant="bodyLg" as="h2" fontWeight="semibold" alignment='start'>
                                                Category
                                            </Text>
                                        </div>


                                        <BlockStack gap="200">
                                            <Select

                                                options={categoryOptions}
                                                value={category}
                                                onChange={handleFieldChange(setCategory)}
                                            />
                                        </BlockStack>
                                    </Box>
                                    <div style={{ marginTop: 7, marginBottom: 7 }}>

                                        <Text as="h3" alignment="start" variant="bodyMd">
                                            Countries have different laws for gift card expiry dates.Check the laws for your country before changing this date
                                        </Text>

                                    </div>
                                    <Box>
                                        <div style={{ marginTop: 10, marginBottom: 10 }}>

                                            <Text variant="bodyLg" as="h2" fontWeight="semibold" alignment='start'>
                                                Sub-Category
                                            </Text>
                                        </div>


                                        <BlockStack gap="200">
                                            <Select

                                                options={categoryOptions}
                                                value={category}
                                                onChange={handleFieldChange(setCategory)}
                                            />
                                        </BlockStack>

                                    </Box>
                                    <div style={{ marginTop: 7, marginBottom: 7 }}>

                                        <Text as="h3" alignment="start" variant="bodyMd">
                                            Countries have different laws for gift card expiry dates.Check the laws for your country before changing this date
                                        </Text>

                                    </div>
                                    <Box>
                                        <div style={{ marginTop: 10, marginBottom: 10 }}>

                                            <Text variant="bodyLg" as="h2" fontWeight="semibold" alignment='start'>
                                                Assign Team Members
                                            </Text>
                                        </div>


                                        <BlockStack gap="200">
                                            <Select

                                                options={categoryOptions}
                                                value={category}
                                                onChange={handleFieldChange(setCategory)}
                                            />
                                        </BlockStack>
                                        <div style={{ marginTop: 7, marginBottom: 7 }}>

                                            <Text as="h3" alignment="start" variant="bodyMd">
                                                You can assign team member for the service you are providing.
                                            </Text>

                                        </div>

                                    </Box>
                                </Card>
                            </Box>
                            <div style={{ marginTop: 20 }} >


                                <Box>
                                    <Card title="Pricing" sectioned>
                                        <div style={{ marginBottom: 5 }}>
                                            <Text variant='headingMd' fontWeight='semibold'>
                                                Pricing
                                            </Text>
                                        </div>
                                        <FormLayout>
                                            <FormLayout.Group>
                                                <TextField
                                                    label="Price"
                                                    type="number"
                                                    prefix="₹"
                                                    value={price}
                                                    onChange={setPrice}
                                                    autoComplete="off"
                                                />
                                                <TextField
                                                    label="Compare –at Price"
                                                    type="number"
                                                    prefix="₹"
                                                    value={comparePrice}
                                                    onChange={setComparePrice}
                                                    autoComplete="off"
                                                />
                                            </FormLayout.Group>

                                            <Checkbox
                                                label="Change tax on this product"
                                                checked={changeTax}
                                                onChange={setChangeTax}
                                            />

                                            <FormLayout.Group>
                                                <TextField
                                                    label="Cost per Hrs"
                                                    type="number"
                                                    prefix="₹"
                                                    value={cost}
                                                    onChange={setCost}
                                                    autoComplete="off"
                                                />
                                                <TextField
                                                    label="Profit"
                                                    type="number"
                                                    value={profit}
                                                    onChange={setProfit}
                                                    autoComplete="off"
                                                />
                                                <TextField
                                                    label="Margin"
                                                    type="number"
                                                    value={margin}
                                                    onChange={setMargin}
                                                    autoComplete="off"
                                                />
                                            </FormLayout.Group>
                                        </FormLayout>
                                    </Card>
                                </Box>
                            </div>
                            <div style={{ marginTop: 20 }}>


                                <Box>

                                    <Card title="Select Service Type" sectioned>
                                        <div style={{ marginBottom: 5 }}>
                                            <Text variant='headindMd' fontWeight='semibold'>
                                                Select service type
                                            </Text>
                                        </div>
                                        <InlineStack gap="400" wrap={false}>
                                            {[
                                                { label: 'Enquiry Form', value: 'enquiry' },
                                                { label: 'Booking', value: 'booking' },
                                            ].map(({ label, value }) => (
                                                <div
                                                    key={value}
                                                    onClick={() => setSelected(value)}
                                                    style={{
                                                        flex: 1,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        padding: '12px 16px',
                                                        border: '1px solid #D9D9D9',
                                                        borderRadius: '6px',
                                                        boxShadow: selected === value ? '0 2px 5px rgba(0,0,0,0.1)' : 'none',
                                                        cursor: 'pointer',
                                                        backgroundColor: selected === value ? '#F1F1F1' : 'white',
                                                    }}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="serviceType"
                                                        checked={selected === value}
                                                        onChange={() => setSelected(value)}
                                                        style={{ marginRight: 10 }}
                                                    />
                                                    <Text as="span" variant="bodyMd" fontWeight="medium">{label}</Text>
                                                </div>
                                            ))}
                                        </InlineStack>
                                    </Card>
                                </Box>
                            </div>

                            <div style={{ marginTop: 20 }}>

                                <Card title="Location" sectioned>

                                    {/* Radio Buttons */}
                                    <div style={{ marginBottom: 5 }}>
                                        <Text variant='headingMd' fontWeight='semibold'>Location</Text>
                                    </div>
                                    <div style={{ marginBottom: 5 }}>


                                        <InlineStack gap="400" blockAlign="center">
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="location"
                                                    value="onsite"
                                                    checked={locationType === 'onsite'}
                                                    onChange={() => setLocationType('onsite')}
                                                    style={{ marginRight: 8 }}
                                                />
                                                <Text as="span" variant="bodyMd" fontWeight="medium">Onsite</Text>
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="location"
                                                    value="online"
                                                    checked={locationType === 'online'}
                                                    onChange={() => setLocationType('online')}
                                                    style={{ marginRight: 8 }}
                                                />
                                                <Text as="span" variant="bodyMd" fontWeight="medium">Online</Text>
                                            </label>
                                        </InlineStack>
                                    </div>

                                    {/* Dropdown */}
                                    <div className="mt-4">
                                        <Select
                                            disabled={locationType === 'online'}
                                            options={clientAddressOptions}
                                            value={clientAddress}
                                            onChange={setClientAddress}
                                        />
                                    </div>

                                    {/* Address Input */}
                                    <div style={{ marginBottom: 5, marginTop: 5 }}>

                                        <div className="mt-4">
                                            <TextField
                                                label="Address"
                                                placeholder="Insert Address"
                                                value={address}
                                                onChange={setAddress}
                                            />
                                        </div>
                                    </div>
                                </Card>

                            </div>
                            <div style={{ marginTop: 20 }}>



                                <Card title="Location" sectioned>

                                    {/* Radio Buttons */}
                                    <div style={{ marginBottom: 10 }}>
                                        <Text variant='headingMd' fontWeight='semibold'>
                                            Location

                                        </Text>
                                    </div>

                                    <InlineStack gap="400" blockAlign="start">
                                        <label>
                                            <input
                                                type="radio"
                                                name="location"
                                                value="onsite"
                                                checked={locationType === 'onsite'}
                                                onChange={() => setLocationType('onsite')}
                                                style={{ marginRight: 8 }}
                                            />
                                            <Text as="span" variant="bodyMd" fontWeight="medium">Onsite</Text>
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="location"
                                                value="online"
                                                checked={locationType === 'online'}
                                                onChange={() => setLocationType('online')}
                                                style={{ marginRight: 8 }}
                                            />
                                            <Text as="span" variant="bodyMd" fontWeight="medium">Online</Text>
                                        </label>
                                    </InlineStack>
                                    <div style={{ marginTop: 5 }}>
                                        <TextField

                                            placeholder="Meeting Link"
                                            value={address}
                                            onChange={setMl}
                                        />

                                    </div>


                                    {/* Description (always visible) */}
                                    <div style={{ marginTop: 5 }}>

                                        <div className="mt-4">
                                            <TextField
                                                label="Description"
                                                placeholder="Write a welcome message for participants"
                                                value={description}
                                                onChange={setDescription}
                                                multiline={4}
                                            />
                                        </div>
                                    </div>
                                </Card>
                            </div>


                            <div style={{ marginTop: 20 }}>



                                <Card title="Business Hours" sectioned>
                                    <div style={{ marginTop: 3 }}>
                                        <Text variant='headingMd' fontWeight='semibold'>
                                            Business Hours

                                        </Text>

                                    </div>
                                    <div style={{ marginTop: 10 }}>

                                        <InlineStack gap="400" wrap={false}>
                                            <div style={{ flex: 1 }}>
                                                <Text variant="bodySm" fontWeight="medium">From</Text>
                                                <Select
                                                    options={timeSlots.map(t => ({ label: t, value: t }))}
                                                    value={fromTime}
                                                    onChange={setFromTime}
                                                />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <Text variant="bodySm" fontWeight="medium">To</Text>
                                                <Select
                                                    options={timeSlots.map(t => ({ label: t, value: t }))}
                                                    value={toTime}
                                                    onChange={setToTime}
                                                />
                                            </div>
                                        </InlineStack>
                                    </div>

                                    <div style={{ marginTop: 20 }}>

                                        <InlineStack gap="400" wrap={false} className="mt-4">
                                            <div style={{ flex: 1 }}>
                                                <Text variant="bodySm" fontWeight="medium">Timing for Each Slot (Minimum Time)</Text>
                                                <InlineStack gap="200">
                                                    <TextField
                                                        value={slotTime}
                                                        onChange={setSlotTime}
                                                        type="text"
                                                        autoComplete="off"
                                                    />
                                                    <Select
                                                        options={[{ label: 'Hr', value: 'Hr' }, { label: 'Min', value: 'Min' }]}
                                                        value={slotUnit}
                                                        onChange={setSlotUnit}
                                                    />
                                                </InlineStack>
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <Text variant="bodySm" fontWeight="medium">Number of Person per Slot</Text>
                                                <TextField
                                                    value={maxPeople}
                                                    onChange={setMaxPeople}
                                                    type="number"
                                                    autoComplete="off"
                                                />
                                            </div>
                                        </InlineStack>
                                    </div>

                                    {/* Availability Grid */}
                                    <Box paddingBlockStart="400">
                                        <Text variant="headingSm" fontWeight="semibold">Select Your Availability</Text>
                                        <div style={{ marginBottom: 5 }}>
                                            <Card>

                                                <div className="overflow-x-auto mt-4">
                                                    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                                                        <thead>
                                                            <tr>
                                                                {days.map((day) => (
                                                                    <th key={day} style={{ padding: '8px', fontWeight: '500', fontSize: '14px' }}>{day}</th>
                                                                ))}

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {timeSlots.map((time) => (
                                                                <tr key={time}>
                                                                    {days.map((day) => {
                                                                        const key = `${day}-${time}`;
                                                                        const selected = selectedSlots[key];
                                                                        return (
                                                                            <td key={key} style={{ padding: '4px' }}>
                                                                                <div
                                                                                    onClick={() => toggleSlot(day, time)}
                                                                                    style={{
                                                                                        textAlign: 'center',
                                                                                        padding: '6px 10px',
                                                                                        borderRadius: '6px',
                                                                                        backgroundColor: selected ? '#E0F7FA' : '#F4F6F8',
                                                                                        cursor: 'pointer',
                                                                                        fontSize: '13px',
                                                                                        border: selected ? '1px solid #0D9488' : '1px solid #D9D9D9',
                                                                                    }}
                                                                                >
                                                                                    {time}
                                                                                </div>
                                                                            </td>
                                                                        );
                                                                    })}
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </Card>
                                        </div>
                                    </Box>

                                    {/* Calendar and Confirmation */}
                                    <Box paddingBlockStart="400">
                                        <Checkbox
                                            label="Sync with my Google Calendar"
                                            checked={syncCalendar}
                                            onChange={setSyncCalendar}
                                        />
                                        {syncCalendar && (
                                            <Select
                                                label=""
                                                value={calendarEmail}
                                                onChange={setCalendarEmail}
                                                options={[{ label: calendarEmail, value: calendarEmail }]}
                                            />
                                        )}
                                    </Box>

                                    <Box paddingBlockStart="300">
                                        <div style={{ marginTop: 3 }}>

                                            <Checkbox
                                                label="Accept booking after confirmation by seller"
                                                checked={requireConfirmation}
                                                onChange={setRequireConfirmation}
                                            />
                                        </div>
                                    </Box>
                                </Card>
                            </div>

                            <div style={{ marginTop: 20 }}>
                                <Card>
                                    <div style={{ marginBottom: 8 }}>
                                        <div style={{ marginBottom: 10 }}>

                                            <Text variant='headingMd' fontWeight='semibold'>Cancellation Policy</Text>
                                        </div>
                                        <div style={{ marginTop: 5 }}>
                                            <Dbox />
                                        </div>

                                    </div>

                                    <div style={{ marginTop: 8 }}>
                                        <div style={{ marginBottom: 10 }}>
                                            <Text variant='headingMd' fontWeight='semibold'>
                                                Refund Policy against service
                                            </Text>
                                        </div>
                                        <Dbox />
                                    </div>

                                    <div style={{ marginTop: 8 }}>
                                        <div style={{ marginBottom: 10 }}>

                                            <Text variant='headingMd' fontWeight='semibold'>
                                                Inclusion in service
                                            </Text>
                                        </div>
                                        <Dbox />
                                    </div>

                                    <div style={{ marginTop: 8 }}>
                                        <div style={{ marginBottom: 10 }}>

                                            <Text variant='headingMd' fontWeight='semibold'>
                                                Exclusion in service
                                            </Text>
                                        </div>
                                        <Dbox />
                                    </div>

                                    <div style={{ marginTop: 8 }}>
                                        <div style={{ marginBottom: 10 }}>
                                            <Text variant='headingMd' fontWeight='semibold'>

                                                Preparation Tips for Customers
                                            </Text>
                                        </div>
                                        <Dbox />
                                    </div>
                                </Card>
                            </div>
                            <div style={{ marginTop: 20 }}>


                                <Card title="Service Guarantee" sectioned>
                                    <div style={{ marginBottom: 5 }}>

                                        <Text variant="headingMd" fontWeight='semibold'>
                                            Service Gurantee

                                        </Text>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Checkbox
                                            label="We will Provide service Guaranty"
                                            checked={enabled}
                                            onChange={setEnabled}
                                        />
                                    </div>

                                    <div style={{ marginTop: '12px', fontSize: '14px' }}>
                                        Refund against Complaint of Inappropriate Service will provide before
                                    </div>

                                    <div style={{ marginTop: '8px', width: '120px' }}>
                                        <Select
                                            options={refundOptions}
                                            value={refundDays}
                                            onChange={setRefundDays}
                                            disabled={!enabled}
                                        />
                                    </div>

                                    <div style={{ marginTop: '12px' }}>
                                        <Text variant='bodyMd'>


                                            Add Description
                                        </Text>

                                    </div>
                                </Card>
                            </div>
                            <div style={{ marginTop: 20 }}>


                                <Card>
                                    {/* Header with title and icon */}
                                    <InlineStack align="space-between" blockAlign="center" padding="400">
                                        <div style={{ marginBottom: 8, marginTop: 2 }}>

                                            <Text variant="headingMd" fontWeight="semibold">Search engine listing</Text>
                                        </div>

                                    </InlineStack>


                                    <Text variant="bodyMd" tone="subdued">
                                        Add a title and description to see how this product might appear in a search engine listing
                                    </Text>

                                    <div style={{ marginTop: '16px' }}>
                                        <TextField
                                            label=""
                                            placeholder="Title"
                                            value={title}
                                            onChange={setTitle}
                                            autoComplete="off"
                                        />
                                    </div>

                                    <div style={{ marginTop: '12px' }}>
                                        <TextField
                                            label=""
                                            placeholder="Description"
                                            value={description}
                                            onChange={setDescription}
                                            multiline={4}
                                            autoComplete="off"
                                        />
                                    </div>


                                    {/* Save button bottom right */}
                                </Card>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px' }}>
                                <Button variant="primary">Save</Button>
                            </div>

                        </div>

                        <div style={{ marginRight: 200 }}>



                            <Box>
                                <div style={{ marginRight: 200, marginTop: 110, minWidth: 300 }}>
                                    <Leftadd
                                        status={status}
                                        setStatus={setStatus}
                                        vendor={vendor}
                                        setVendor={setVendor}
                                        type={type}
                                        setType={setType}
                                        setPublicationIds={setPublicationIds}
                                    />
                                </div>
                            </Box>
                        </div>
                    </InlineStack>
                </div>

            </Page >

        </Background >
    );
};

export default Addservices;




const Background = styled.div`
   height: 100vh;
   width: 100vw;
   display: flex;
   flex-direction: column;
   overflow-y: auto;
   background-size: cover;
   background-position: center;
   background-repeat: no-repeat;
   `;
const DividerContainer = styled.div`
   display: flex;
   align-items: center;
   margin: 24px 0;
   `;

const Line = styled.div`
    flex-grow: 1;
    height: 1px;
    background: #d1d1d1;
    `;

const OrText = styled(Text).attrs({ as: 'span', variant: 'bodyMd', alignment: 'center' })`
    margin: 0 12px;
    color: #9e9e9e;
    `;

const Footer = styled.div`
    text-align: center;
    margin-top: 12px;
    `;

// const InputText = styled.div`
// width: 370;
// height: 61;
// padding-top: 20px;
// padding-right: 32px;
// padding-bottom: 20px;
// padding-left: 32px;
// border-radius: 6px;
// border-width: 1px;
// `

const IconCSS = styled(Icon)`
   color: #3377FF;
   `;

const StyledCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  margin-bottom: 24px;
  padding: 24px;
`;