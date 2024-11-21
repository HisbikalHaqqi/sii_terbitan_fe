// MUI Imports
import Grid from "@mui/material/Grid";

// Component Imports
import ScriptAddHeader from "@views/tambah/ScriptAddHeader";
import ScriptInformation from "@views/tambah/ScriptInformation";
import ScriptImage from "@views/tambah/ScriptUpload";

const CreateForm = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ScriptAddHeader />
      </Grid>

      <Grid container spacing={6} xs item>
        <Grid item xs={12}>
          <ScriptInformation />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreateForm;
