import React from 'react';
import {Box, Container, Skeleton, Stack} from "@mui/material";

export const WordDataSkeleton: React.FC = () => (
  <Container maxWidth='sm'>
    <Skeleton variant="text" height={100}/>

    <Box marginLeft={2}>
      <Stack>
        {[0, 1, 2].map((v) => (
          <Skeleton variant="text" key={`phone-${v}`}/>
        ))}
      </Stack>
    </Box>

    <Box marginLeft={2}>
      <Stack>
        {[0, 1, 2].map((v) => (
          <Skeleton
            variant="text"
            width='100%'
            height={250}
            key={`meaning-${v}`}
          />
        ))}
      </Stack>
    </Box>
  </Container>
)
