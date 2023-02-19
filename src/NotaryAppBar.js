import * as React from 'react';
import { AppBar } from 'react-admin';
import Typography from '@mui/material/Typography';


export const NotaryAppBar = (props) => (
    <AppBar
    sx={{
        "& .RaAppBar-title": {
            flex: 1,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
        },
    }}
    {...props}
    title = 'Notary'
>
  
<Typography
            variant="h6"
            color="inherit"
            className={"ASD"}
            id="react-admin-title"
        />
</AppBar>
);