import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const ParagraphBlock = ({ content, onContentChange, editing, onEditToggle }) => {
    const [tempContent, setTempContent] = useState(content);
    
    const handleSave = () => {
        onContentChange(tempContent);
        onEditToggle();
    };

    const handleCancel = () => {
        setTempContent(content);
        onEditToggle();
    };

    return (
        <div style={{ marginBottom: '20px' }}>
            {editing ? (
                <>
                    <TextField
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={tempContent}
                        onChange={(e) => setTempContent(e.target.value)}
                        placeholder="Write your paragraph here..."
                    />
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </>
            ) : (
                <>
                    <p>{content}</p>
                    <Button onClick={onEditToggle}>Edit</Button>
                </>
            )}
        </div>
    );
};

export default ParagraphBlock;
