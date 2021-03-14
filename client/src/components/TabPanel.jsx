import React from 'react';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export default function TabPanel(props) {
  const { children, value, index} = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}

    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}