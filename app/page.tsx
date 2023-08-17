import styles from './page.module.css'
import Grid from '@mui/material/Grid'
import Item from '@mui/material/Grid'

export default function Home() {
  return (
    <main className={styles.main}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
      </Grid>
    </main>
  )
}
