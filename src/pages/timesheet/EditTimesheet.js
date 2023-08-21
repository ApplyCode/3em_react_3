import * as React from 'react';
import TimesheetTable from 'components/TimesheetTable';
import ExpenseTable from 'components/ExpenseTable';
import AttachmentFile from 'components/AttachmentFile';
import { TextField, Stack, Box, Button} from '@mui/material';

export default function editTable() {
  return (
    <>
      <TimesheetTable />
      <Stack mt={2}>
        <ExpenseTable />
      </Stack>
      <Stack mt={2}>
        <AttachmentFile />
      </Stack>
      <Stack mt={2}>
        <TextField id="note" label="Note" multiline rows={4} fullWidth />
      </Stack>
      <Stack direction="row" spacing={2} m={2}>
        <Button variant="contained">Save</Button>
        <Button variant="outlined">Expert</Button>
      </Stack>
    </>
  );
}
