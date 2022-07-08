import { Box, Typography } from "@mui/material";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
// TabPanel function from tab examples: https://github.com/mui/material-ui/blob/v5.8.7/docs/data/material/components/tabs/BasicTabs.tsx


export function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box sx={{ p: 3 }}>
            <Typography component={'div'}>{children}</Typography>
            </Box>
        )}
        </div>
    );
}
