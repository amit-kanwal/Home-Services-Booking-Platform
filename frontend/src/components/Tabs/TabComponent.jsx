import { Tabs, Tab, Box } from "@mui/material";

function TabComponent({ tab, setTab }) {

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const tabStyle = {
    textTransform: "none",
    fontSize: "16px",
    fontWeight: 500,
    borderRadius: "20px",
    padding: "8px 20px",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
    "&.Mui-selected": {
      color: "#1976d2",
      backgroundColor: "#e3f2fd",
    },
  };

  return (
    <Box sx={{ width: "100%", mt: 3, ml: 2 }}>
      
      <Tabs
        value={tab}
        onChange={handleChange}
        TabIndicatorProps={{
          style: {
            height: "4px",
            borderRadius: "2px",
          },
        }}
        sx={{
          "& .MuiTabs-flexContainer": {
            gap: "20px",
          },
        }}
      >
        <Tab label="Active" value="active" sx={tabStyle} />
        <Tab label="Completed" value="completed" sx={tabStyle} />
        <Tab label="Cancelled" value="cancelled" sx={tabStyle} />
      </Tabs>

    </Box>
  );
}

export default TabComponent;