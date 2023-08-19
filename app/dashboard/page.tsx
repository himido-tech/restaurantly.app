'use client'

import { Box, Button, Container } from "@mui/material";
import Stack from '@mui/material/Stack';
import Item from '@mui/material/Stack';

export default function Dashboard() {

  return (
    <main>
      <Container maxWidth="lg">
        <Stack alignItems="center" spacing={2}>
          <Item>
            <Box m={4}>

            </Box>
          </Item>
          <Item>
            <Box m={2}>
              Menu Builder
            </Box>
          </Item>
          <Item>Item 3</Item>
        </Stack>
      </Container>
    </main >
  );
}