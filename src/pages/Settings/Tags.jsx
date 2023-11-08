import * as React from 'react'
import Chip from '@mui/material/Chip'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'

export default function Tags() {
  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        multiple
        id='tags-outlined'
        options={top100Films}
        getOptionLabel={(option) => option.title}
        defaultValue={[top100Films[2]]}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label='filterSelectedOptions'
            placeholder='Favorites'
          />
        )}
      />
    </Stack>
  )
}

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
]
