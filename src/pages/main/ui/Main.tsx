import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

export const Main = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid size={12}>
          <h1>Hello, World</h1>
        </Grid>
        <Grid size={6}>
          <Button fullWidth variant="outlined">
            Text
          </Button>
        </Grid>
        <Grid size={6}>
          <Button fullWidth variant="outlined">
            Text
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}
