import React from 'react';
import {tWordMeaning} from "../../store/types";
import {Box, Typography} from "@mui/material";

export const WordMeaning: React.FC<{ meaning: tWordMeaning }> = ({meaning}) => (
  <Box>
    <Typography>{meaning.partOfSpeech}</Typography>
    <ul>
      {meaning.definitions.map((definition) => (
        <li key={definition.definition}>
          <Typography>{definition.definition}</Typography>
        </li>
      ))}
    </ul>
  </Box>
)
