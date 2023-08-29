import React, { useState } from 'react';
import ParagraphBlock from './ParagraphBlock';
import ImageBlock from './ImageBlock';
import { Button, Card, CardContent, CardActions } from '@mui/material';

const BLOCK_COMPONENTS = {
    'paragraph': ParagraphBlock,
    'image': ImageBlock,
    // ... you can add more types here
};

const ContentBlock = ({ block, onUpdate, onRemove }) => {
    const [editing, setEditing] = useState(false);

    const handleContentChange = (newContent) => {
        if (onUpdate) {
            onUpdate({ ...block, data: newContent });
        }
    };

    const handleEditToggle = () => {
        setEditing(!editing);
    };

    const BlockComponent = BLOCK_COMPONENTS[block.type];

    return (
        <Card variant="outlined" style={{ marginBottom: '20px' }}>
            <CardContent>
                <BlockComponent
                    content={block.data}
                    onContentChange={handleContentChange}
                    editing={editing}
                    onEditToggle={handleEditToggle}
                />
            </CardContent>
            <CardActions>
                <Button variant="outlined" color="secondary" onClick={onRemove}>
                    Remove Block
                </Button>
            </CardActions>
        </Card>
    );
};

export default ContentBlock;