import { Grid, Typography, Button, IconButton } from "@mui/material";
import { Facebook, Twitter, LinkedIn } from "@mui/icons-material";
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
          <div>
            <IconButton color="primary">
              <Facebook />
            </IconButton>
            <IconButton color="primary">
              <Twitter />
            </IconButton>
            <IconButton color="primary">
              <LinkedIn />
            </IconButton>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
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
            <Button className="pb-5" variant="h6">
              Terms
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
