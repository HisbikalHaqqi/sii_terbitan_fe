// MUI Imports
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

const ProductAddHeader = () => {
  return (
    <Grid container xs={12} spacing={5}>
      <Grid item xs={12}>
        <Typography variant="h4" className="mbe-1">
          Add a new submission
        </Typography>
        <Typography>Submit your paper here</Typography>
      </Grid>
    </Grid>
  );
};

export default ProductAddHeader;
