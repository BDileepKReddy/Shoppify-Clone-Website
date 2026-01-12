import {
    Page,
    TextField,
    Card,
    Select,
    DropZone,
    Thumbnail,
    BlockStack,
    Badge,
    Text,
    Box,
    Button,
    Grid,
    Checkbox,
} from '@shopify/polaris';
import { useState, useCallback } from 'react';

export default function add() {
    const [title, setTitle] = useState('Short sleeve t-shirt');
    const [description, setDescription] = useState('');
    const [mediaFiles, setMediaFiles] = useState([]);
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('active');
    const [type, setType] = useState('');
    const [vendor, setVendor] = useState('');
    const [collections, setCollections] = useState('');
    const [tags, setTags] = useState('');

    const handleDropZoneDrop = useCallback((_dropFiles, acceptedFiles) => {
        setMediaFiles((files) => [...files, ...acceptedFiles]);
    }, []);

    const statusOptions = [
        { label: 'Active', value: 'active' },
        { label: 'Draft', value: 'draft' },
    ];

    const categoryOptions = [
        { label: 'Choose a category', value: '' },
        { label: 'T-Shirts', value: 't-shirts' },
        { label: 'Accessories', value: 'accessories' },
    ];

    const mediaMarkup = mediaFiles.length > 0 && (
        <BlockStack gap="200">
            {mediaFiles.map((file, index) => (
                <Thumbnail
                    key={index}
                    size="large"
                    alt={file.name}
                    source={window.URL.createObjectURL(file)}
                />
            ))}
        </BlockStack>
    );

    return (
        <Page title="Add product" backAction={{ content: 'Back' }}>
            <Grid columns={{ lg: 2 }} gap="40">
                {/* Left Side - Main Product Info */}
                <BlockStack gap="400">
                    {/* Title + Description */}
                    <Card>
                        <BlockStack gap="200">
                            <TextField label="Title" value={title} onChange={setTitle} />
                            <TextField
                                label="Description"
                                value={description}
                                onChange={setDescription}
                                multiline={4}
                            />
                        </BlockStack>
                    </Card>

                    {/* Media */}
                    <Card title="Media">
                        <BlockStack gap="200">
                            <DropZone accept="image/*" type="image" onDrop={handleDropZoneDrop}>
                                {mediaMarkup}
                                {!mediaFiles.length && <DropZone.FileUpload actionHint="Add images" />}
                            </DropZone>
                        </BlockStack>
                    </Card>

                    {/* Category */}
                    <Card>
                        <BlockStack gap="200">
                            <Select
                                label="Category"
                                options={categoryOptions}
                                value={category}
                                onChange={setCategory}
                            />
                        </BlockStack>
                    </Card>

                    {/* Pricing */}
                    <Card title="Pricing">
                        <BlockStack gap="200">
                            <Grid columns={{ sm: 1, md: 2 }} gap="200">
                                <TextField label="Price" prefix="₹" value="0.00" />
                                <TextField label="Compare-at price" prefix="₹" value="0.00" />
                            </Grid>
                            <Checkbox label="Charge tax on this product" checked disabled onChange={() => { }} />
                            <Grid columns={{ sm: 1, md: 3 }} gap="200">
                                <TextField label="Cost per item" prefix="₹" value="0.00" />
                                <TextField label="Profit" value="--" disabled />
                                <TextField label="Margin" value="--" disabled />
                            </Grid>
                        </BlockStack>
                    </Card>

                    {/* Inventory */}
                    <Card title="Inventory">
                        <BlockStack gap="200">
                            <Checkbox label="Track quantity" checked disabled onChange={() => { }} />
                            <TextField label="Shop location" type="number" value="0" />
                            <Checkbox label="Continue selling when out of stock" checked={false} onChange={() => { }} />
                            <Checkbox label="This product has a SKU or barcode" checked={false} onChange={() => { }} />
                        </BlockStack>
                    </Card>

                    {/* Shipping */}
                    <Card title="Shipping">
                        <BlockStack gap="200">
                            <Checkbox label="This is a physical product" checked disabled onChange={() => { }} />
                            <Grid columns={{ sm: 2, md: 3 }} gap="200">
                                <TextField label="Weight" value="0.0" />
                                <Select
                                    label="Unit"
                                    options={[
                                        { label: 'kg', value: 'kg' },
                                        { label: 'g', value: 'g' },
                                        { label: 'lb', value: 'lb' },
                                    ]}
                                    value="kg"
                                    onChange={() => { }}
                                />
                            </Grid>
                            <Button variant="plain">Add customs information</Button>
                        </BlockStack>
                    </Card>

                    {/* Variants */}
                    <Card title="Variants">
                        <h2>Variants</h2>
                        <Button variant="secondary">Add options like size or color</Button>
                    </Card>
                    {/* Search Engine Listing  */}
                    <Card title="Search Engine Listing">
                        <h2>Search Engine Listing</h2>
                        <p>Add a title to see how this product might appear in a search engine listing</p>
                    </Card>
                </BlockStack>


                {/* Right Side - Meta Info */}
                <BlockStack gap="400">
                    <Card title="Status">
                        <BlockStack gap="200">
                            <Select
                                label="Status"
                                options={statusOptions}
                                value={status}
                                onChange={setStatus}
                            />
                        </BlockStack>
                    </Card>

                    <Card title="Publishing">
                        <BlockStack gap="100">
                            <Badge>Online Store</Badge>
                            <Badge>Point of Sale</Badge>
                            <Badge>multivendor-service-app</Badge>
                            <Badge>Shopify GraphiQL App</Badge>
                        </BlockStack>
                    </Card>

                    <Card title="Product organization">
                        <BlockStack gap="200">
                            <TextField label="Type" value={type} onChange={setType} />
                            <TextField label="Vendor" value={vendor} onChange={setVendor} />
                            <TextField label="Collections" value={collections} onChange={setCollections} />
                            <TextField label="Tags" value={tags} onChange={setTags} placeholder="Comma separated" />
                        </BlockStack>
                    </Card>
                </BlockStack>
            </Grid>

            {/* Save Button */}
            <Box paddingBlockStart="400" style={{ textAlign: 'right' }}>
                <Button variant="primary" disabled>
                    Save
                </Button>
            </Box>
        </Page>
    );
}