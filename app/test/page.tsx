'use client'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}


export default function VerticalTabs() {
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ bgcolor: 'background.paper' }}>
            <Tabs
                variant="fullWidth"
                value={value}
                onChange={handleChange}
                scrollButtons="auto"
                aria-label="Vertical tabs example"
                sx={{
                    borderRight: 5,
                    borderColor: 'divider',
                    alignItems: 'center',
                    maxWidth: '100%',
                }}
            >
                <Tab label="Menu Builder" {...a11yProps(0)} />
                <Tab label="QR" {...a11yProps(1)} />
            </Tabs>
        </Box>
    );
}
