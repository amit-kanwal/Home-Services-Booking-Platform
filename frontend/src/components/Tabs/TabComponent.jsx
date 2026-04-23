import { Tabs, Tab, Box, useMediaQuery, Select, MenuItem } from "@mui/material";

function TabComponent({ tab, setTab }) {
  const isSmallMobile = useMediaQuery("(max-width:400px)");

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleDropdownChange = (e) => {
    setTab(e.target.value);
  };

  const tabStyle = {
    textTransform: "none",
    fontSize: "14px",
    fontWeight: 500,
    borderRadius: "12px",
    padding: "8px 14px",
    "&.Mui-selected": {
      color: "#1976d2",
      backgroundColor: "#e3f2fd",
    },
  };

  return (
    <Box sx={{ width: "100%", mt: 3, ml: 2 }}>
      {isSmallMobile ? (
        <Select
          value={tab}
          onChange={handleDropdownChange}
          size="small"
          fullWidth
          displayEmpty
          sx={{
            width: { xs: "100%", sm: "400px" },
            maxWidth: "90%",
            borderRadius: "10px",
            backgroundColor: "#fff",
            "& .MuiSelect-select": {
              padding: "10px 14px",
            },
          }}
        >
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
        </Select>
      ) : (
        <Tabs
          value={tab}
          onChange={handleChange}
          TabIndicatorProps={{
            style: { height: "4px", borderRadius: "2px" },
          }}
        >
          <Tab label="Active" value="active" sx={tabStyle} />
          <Tab label="Completed" value="completed" sx={tabStyle} />
          <Tab label="Cancelled" value="cancelled" sx={tabStyle} />
        </Tabs>
      )}
    </Box>
  );
}

export default TabComponent;
