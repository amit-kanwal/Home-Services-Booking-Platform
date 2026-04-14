import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

function MySheet({children}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button  onClick={() => setOpen(true)}>
        {children}
      </Button>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={{ width: "400px", padding: "20px" }}>
          <h2>Sheet Content</h2>
          <p>Your content here</p>
        </div>
      </Drawer>
    </>
  );
}

export default MySheet;