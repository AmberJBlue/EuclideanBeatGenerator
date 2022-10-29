import '../App.css'
import {
  Card, 
  Slider, 
  Typography, 
  CardActions, 
  Button, 
  CardContent,
  Grid,
  // Item
} from '@material-ui/core'
import { Component } from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class ControlPanel extends Component {
  constructor(props) {
		super(props)
		this.state = {
		  numCards: props.numCards
		}

    // Array(this.state.numCards).keys().map(card => {
    //   console.log(card)
    // })
	}
  
  render() {
    const options = [
      'one', 'two', 'three'
    ]

    return (
      <Grid container className='Controls'>
        <Grid container xs={12} className="playPauseControls">
          <Card className={'mainControl'}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }}  gutterBottom>
                Main Controls
              </Typography>
              <Typography variant="h5" component="div">
                hey
              </Typography>
              <Typography sx={{ mb: 1.5 }} >
                adjective
              </Typography>
              <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid container xs={12} className='instrumentControlPanel'>
          {[...Array(this.state.numCards).keys()].map((key) => (
            <Grid xs={6}> 
              <Card className={'instrumentControl'}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }}  gutterBottom>
                    Instrument {key + 1}
                  </Typography>
                  <Dropdown options={options} value={"Select Instrument"}/>
                  <Slider
                    size="small"
                    defaultValue={2}
                    aria-label={`instrument ${key + 1} number of on notes`}
                    min={0}
                    max={15}
                    valueLabelDisplay="auto"
                  />
                  <Typography sx={{ mb: 1.5 }} >
                    On Notes
                  </Typography>
                  <Slider
                    size="small"
                    defaultValue={2}
                    aria-label={`instrument ${key + 1} number of notes`}
                    min={0}
                    max={15}
                    valueLabelDisplay="auto"
                  />
                  <Typography sx={{ mb: 1.5 }} >
                    Total Notes
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    )
    // (
    //   
    //     {[...Array(this.state.numCards).keys()].map(card => {
          // <Card>
          //   <CardContent>
          //     <Typography sx={{ fontSize: 14 }}  gutterBottom>
          //       Word of the Day
          //     </Typography>
          //     <Typography variant="h5" component="div">
          //       {card}
          //     </Typography>
          //     <Typography sx={{ mb: 1.5 }} >
          //       adjective
          //     </Typography>
          //     <Typography variant="body2">
          //       well meaning and kindly.
          //       <br />
          //       {'"a benevolent smile"'}
          //     </Typography>
          //   </CardContent>
          //   <CardActions>
          //     <Button size="small">Learn More</Button>
          //   </CardActions>
          // </Card>
    //     })}
    //   </div>
    // )
  }
}

export default ControlPanel;
