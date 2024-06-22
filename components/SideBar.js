import * as React from 'react';
import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import List from '@mui/joy/List';
import Divider from '@mui/joy/Divider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/joy/IconButton';
import Link from 'next/link';

export default function SideBar() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (inOpen) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setOpen(inOpen);
    };

    return (
        <Box className="header-button" sx={{ display: 'flex' }}>
            <IconButton variant="plain" onClick={toggleDrawer(true)}>
                <MenuIcon style={{ color: 'white' }} />
            </IconButton>
            <Drawer color="primary" open={open} onClose={toggleDrawer(false)}>
                <Box
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <List>
                        <Link href="/">
                            <ListItem>
                                <ListItemButton className="sidebar-button">
                                    Tuition Viewer
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link href="/calculator">
                            <ListItem>
                                <ListItemButton className="sidebar-button">
                                    Tuition Calculator
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    </List>
                    <Divider />
                </Box>
            </Drawer>
        </Box>
    );
}
