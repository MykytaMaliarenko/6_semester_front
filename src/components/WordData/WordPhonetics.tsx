import React from 'react';
import {tExtendedWordPhonetic} from "../../store/types";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import {Stack, Typography} from "@mui/material";

export const WordPhonetics: React.FC<{ phonetics: tExtendedWordPhonetic }> = ({
  phonetics
}) => {
  const audio = React.useMemo(
      () => phonetics.audio ? new Audio(phonetics.audio) : null,
      [phonetics.audio]
  );

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={1}
    >
      {audio && (
          <VolumeUpIcon onClick={() => audio.play()} style={{cursor: 'pointer'}} />
      )}
      <Typography variant='subtitle1' color='dimgrey'>
        {phonetics.text}
      </Typography>
    </Stack>
  )
}
