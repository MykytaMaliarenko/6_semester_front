import React, {useState} from 'react';
import {Container, Typography, Stack, Box} from "@mui/material";
import {WordPhonetics} from "./WordPhonetics";
import {WordMeaning} from "./WordMeaning";
import {useParams} from "react-router-dom";
import {useStoreActions, useStoreState} from "../../store/hooks";
import {WordDataSkeleton} from "./WordDataSkeleton";
import {Search} from "../Search"

export const WordData: React.FC = () => {
  let {word} = useParams();

  const search = useStoreActions((actions) => actions.search);
  const returnToPreviousWord = useStoreActions((actions) => actions.returnToPreviousWord);
  const [loading, setIsLoading] = useState(true);

  const wordData = useStoreState((state) => state.current);
  const history = useStoreState((state) => state.history);
  const error = useStoreState((state) => state.error);

  React.useEffect(() => {
    if (word !== undefined) {
      search({word}).then(() => setIsLoading(false));
    }
  }, [word]);

  const synonyms = React.useMemo(
    () => wordData ? wordData.meanings.map((meaning) => meaning.synonyms).flat() : [],
    [wordData]
  );
  const antonyms = React.useMemo(
    () => wordData ? wordData.meanings.map((meaning) => meaning.antonyms).flat() : [],
    [wordData]
  );

  if (error !== null) {
    return (
      <Container maxWidth='sm'>
        <Box marginTop={5} marginBottom={5}>
          <Search/>
        </Box>

        <Typography sx={{fontWeight: 'bold'}} variant='h5' display='inline'>
          Something went wrong:
        </Typography>
        <Typography variant='h5' display='inline'>{error}</Typography>
      </Container>
    )
  } else if (loading || wordData === null) {
    return <WordDataSkeleton/>;
  }

  return (
    <Container maxWidth='sm'>
      <Box marginTop={5} marginBottom={5}>
        <Search/>
      </Box>

      <Typography variant='h3'>
        {wordData.word}
      </Typography>

      <Box marginLeft={2}>
        <Stack>
          {wordData.phonetics.map((phonetics) => (
            <WordPhonetics phonetics={phonetics} key={phonetics.key}/>
          ))}
        </Stack>
      </Box>

      <ol style={{listStyle: 'decimal'}}>
        {wordData.meanings.map((meaning) => (
          <li key={meaning.partOfSpeech}>
            <WordMeaning meaning={meaning}/>
          </li>
        ))}
      </ol>

      {synonyms.length !== 0 && (
        <Typography sx={{fontWeight: 'bold'}}>
          Synonyms:&nbsp;
          <Typography sx={{fontStyle: 'italic'}} display='inline' component='span'>
            {synonyms.toString()}
          </Typography>
        </Typography>
      )}

      {antonyms.length !== 0 && (
        <Typography sx={{fontWeight: 'bold'}}>
          Antonyms:&nbsp;
          <Typography sx={{fontStyle: 'italic'}} display='inline' component='span'>
            {antonyms.toString()}
          </Typography>
        </Typography>
      )}

      {history.length !== 0 && (
        <Box marginTop={5}>
          <Typography>Your view history:</Typography>
          <ul>
            {history.map((historyEntry) => (
              <li key={historyEntry.word}>
                <p
                  style={{
                    textDecoration: 'underline',
                    color: 'blue',
                    cursor: 'pointer'
                  }}
                  onClick={() => returnToPreviousWord({id: historyEntry.id})}
                >
                  {historyEntry.word}
                </p>
              </li>
            ))}
          </ul>
        </Box>
      )}
    </Container>
  )
}
