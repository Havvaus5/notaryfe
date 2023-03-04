import * as React from 'react';
import { memo } from 'react';
import { AppBar, Layout, InspectorButton, Title, UserMenu } from 'react-admin';
import { Typography } from '@mui/material';
import { Header, HeaderContent } from 'semantic-ui-react';

export const NotaryAppBar = memo(props => (
    <AppBar 
    {...props} userMenu={UserMenu}>
    <Typography
        variant='h6'
        id="react-admin-title"
        align='center'
        
   ><div style={{'margin-right': '1650px'}}>Blokzinciri Tabanlı Garyimenkül Yönetimi</div></Typography>
   
</AppBar>
));