import { Grid, Typography, Button } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <div>
      <Grid
        className="mt-10 text-center text-white bg-black"
        container
        sx={{ bgcolor: "black", color: "white", py: 3 }}
      >
        <Grid item xs={12} sm={6} md={3}>
          {/* Solution Section */}
          <Typography className="pb-5" variant="h6">
            Solution
          </Typography>
          <div>
            <Button className="pb-5" variant="h6">
              Marketing
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6">
              Analytics
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {/* Documentation Section */}
          <Typography className="pb-5" variant="h6">
            Documentation
          </Typography>
          <div>
            <Button className="pb-5" variant="h6">
              Guides
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6">
              API status
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {/* Legal Section */}
          <Typography className="pb-5" variant="h6">
            Legal
          </Typography>
          <div>
            <Button className="pb-5" variant="h6">
              Claim
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6">
              Privacy
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6"></Button>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {/* Headquarters Section */}
          <Typography className="pb-3" variant="h6">
            Headquarters
          </Typography>
          <div>
            <Button className="pb-5" variant="h6"></Button>
          </div>
          <Typography className="pb-3" variant="body2" color="silver">
            Office Address: Shivalik-8 Rajkot
          </Typography>
          <Typography variant="body2" color="silver">
            Phone: +91 96647-99190
          </Typography>
        </Grid>

        {/* Centered All Rights Reserved */}
        <Grid item xs={12}>
          <Typography variant="body2" color="grey">
            &copy; 2024 PST STORE. All Rights Reserved.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
