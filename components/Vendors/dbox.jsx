import React, { useRef } from 'react';
import {
  Card,
  Text,
  Box,
  InlineStack,
  Button,
  Tooltip,
} from '@shopify/polaris';
import {
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
  CodeIcon,
  MagicIcon,
  TextColorIcon,
  TextAlignLeftIcon,
  LinkIcon,
  ImageIcon,
  PlayCircleIcon,
} from '@shopify/polaris-icons';

export default function Dbox({ setDescription }) {
  const editorRef = useRef(null);

  const execCommand = (command, value = null) => {
    editorRef.current.focus();
    document.execCommand(command, false, value);
    setDescription?.(editorRef.current.innerHTML); // update parent on format
  };

  const handleInput = () => {
    setDescription?.(editorRef.current.innerHTML);
  };

  return (
    <Box padding="4" width="800px">
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        <Text variant="bodyLg" as="h2" fontWeight="semibold" alignment="start">
          Description
        </Text>
      </div>

      <Card padding="0" roundedAbove="sm">
        <Box background="bg-subdued" padding="2" borderBlockEndWidth="1">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <InlineStack gap="2" align="center">
              <Tooltip content="Generate text" dismissOnMouseOut>
                <Button icon={MagicIcon} disclosure />
              </Tooltip>
              <Tooltip content="Formatting" dismissOnMouseOut>
                <Button disclosure>Paragraph</Button>
              </Tooltip>

              <Tooltip content="Bold" dismissOnMouseOut>
                <Button icon={TextBoldIcon} onClick={() => execCommand('bold')} />
              </Tooltip>
              <Tooltip content="Italic" dismissOnMouseOut>
                <Button icon={TextItalicIcon} onClick={() => execCommand('italic')} />
              </Tooltip>
              <Tooltip content="Underline" dismissOnMouseOut>
                <Button icon={TextUnderlineIcon} onClick={() => execCommand('underline')} />
              </Tooltip>
              <Tooltip content="Text color" dismissOnMouseOut>
                <Button icon={TextColorIcon} onClick={() => execCommand('foreColor', 'red')} />
              </Tooltip>
              <Tooltip content="Align left" dismissOnMouseOut>
                <Button icon={TextAlignLeftIcon} onClick={() => execCommand('justifyLeft')} />
              </Tooltip>
              <Tooltip content="View code (no-op)" dismissOnMouseOut>
                <Button icon={CodeIcon} />
              </Tooltip>
              <Tooltip content="Insert link" dismissOnMouseOut>
                <Button
                  icon={LinkIcon}
                  onClick={() => {
                    const url = prompt('Enter URL:');
                    if (url) execCommand('createLink', url);
                  }}
                />
              </Tooltip>
              <Tooltip content="Insert image" dismissOnMouseOut>
                <Button
                  icon={ImageIcon}
                  onClick={() => {
                    const url = prompt('Enter image URL:');
                    if (url) execCommand('insertImage', url);
                  }}
                />
              </Tooltip>
              <Tooltip content="Insert video (placeholder)" dismissOnMouseOut>
                <Button icon={PlayCircleIcon} />
              </Tooltip>
            </InlineStack>
          </Box>

          {/* Editable content area */}
          <Box
            minHeight="160px"
            padding="4"
            borderColor="border"
            borderWidth="1"
            borderRadius="sm"
            background="bg-surface"
          >
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              onInput={handleInput}
              style={{ minHeight: '100px', outline: 'none' }}
            />
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
