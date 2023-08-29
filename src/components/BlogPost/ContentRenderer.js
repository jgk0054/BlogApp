import React from 'react';
import { Typography, Button, CardMedia, IconButton } from '@mui/material';

const ContentRenderer = ({ content }) => {
    const renderContent = (contentItem) => {
        switch (contentItem.type) {
            case 'paragraph':
                return (
                    <Typography variant="body1" style={{ margin: '10px 0' }}>
                        {contentItem.data.split(/(<.*?>)/).map((segment, index) => {
                            if (contentItem.emphasis && contentItem.emphasis.includes(segment.replace(/<|>/g, ''))) {
                                return <strong key={index}>{segment.replace(/<|>/g, '')}</strong>;
                            }
                            return segment.replace(/<|>/g, '');
                        })}
                    </Typography>
                );
            case 'image':
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                        <CardMedia
                            component="img"
                            image={contentItem.data}
                            alt={contentItem.alt}
                            style={{ maxWidth: '50%', height: 'auto' }}
                        />
                    </div>
                );
            case 'figure':
                return (
                    <figure style={{ margin: '10px 0', textAlign: 'center' }}>
                        <CardMedia
                            component="img"
                            image={contentItem.src}
                            alt={contentItem.alt}
                            style={{ maxWidth: '100%', height: 'auto' }}
                        />
                        <figcaption><Typography variant="caption">{contentItem.caption}</Typography></figcaption>
                    </figure>
                );
            case 'button':
                return (
                    <Button variant="contained" color="primary" style={{ margin: '10px 0' }} onClick={() => eval(contentItem.action)}>
                        {contentItem.text}
                    </Button>
                );
            case 'social-links':
                return (
                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                        {contentItem.links.map((link, index) => (
                            <IconButton key={index} href={link.url} target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px' }}>
                                {/* Replace this with actual icons based on link.icon */}
                                {link.label}
                            </IconButton>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };
    return (
        <div>
            {content.map((contentItem, index) => (
                <div key={index}>
                    {renderContent(contentItem)}
                </div>
            ))}
        </div>
    );
}

export default ContentRenderer;
