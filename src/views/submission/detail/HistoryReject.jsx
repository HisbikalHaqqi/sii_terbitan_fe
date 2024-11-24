import React from 'react';
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Divider } from '@mui/material';
import Grid from '@mui/material/Grid'

const HistoryReject = ({ data }) => {
  const parsedData = typeof data === 'string' ? JSON.parse(data) : data;

  return (
    <Accordion>
      <AccordionSummary id="panel-header-1" aria-controls="panel-content-1">
        <Typography>History Penolakan Persetujuan</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {parsedData && parsedData.length > 0 ? (
          parsedData.map((getData, index) => (
            <Grid key={index} padding={2}>
              <Typography variant="h6" >
                {getData.name} - {getData.role_name}
              </Typography>
              <Typography variant="body2">
                {getData.entry_time}
              </Typography>
              <Typography variant="body2">
                {getData.entry_note}
              </Typography>
              <Divider/>
            </Grid>
          ))
        ) : (
          <Typography variant="body2">No rejection history available.</Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default HistoryReject;
