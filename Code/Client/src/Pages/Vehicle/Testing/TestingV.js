import { Button, Container, CssBaseline, Grid, Paper, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Inputprop from '../../../component/Inputs/Input'

export default function TestingV() {
  return (
    <Container component="main" maxWidth="sm">
        <CssBaseline/>
        <Typography>
            Insert New Vehicle
        </Typography>
        <Paper>
            <form>
                <Grid container spacing={4}>
                    <Grid item xs={8} sm={12}>
                        <Inputprop
                            name="vehicle number"
                            label="Vehicle Number"
                        />
                        <Inputprop
                            name="price"
                            label="Price"
                        />
                        <Inputprop
                            name="brand"
                            label="Brand"
                        />
                        <Inputprop
                            name="year of manufacture"
                            label="Year Of Manufacture"
                        />
                        <Inputprop
                            name="milage"
                            label="Milage"
                        />
                        //this is insert image 
                        <Box
                            component="img"
                            sx={{
                            height: 233,
                            width: 350,
                            maxHeight: { xs: 233, md: 167 },
                            maxWidth: { xs: 350, md: 250 },
                            }}
                            alt="The house from the offer."
                            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                        />
                        <Grid item xs={12} sm={12}>
                            <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                            >
                             Insert
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
    
  )
}
