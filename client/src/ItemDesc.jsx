import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import PropTypes from 'prop-types';
import Header from "./components/layouts/Header.jsx";
import Banner from "./components/layouts/Banner.jsx";
import Shipbanner from "./components/layouts/Shipbanner.jsx";
import Footer from "./components/layouts/Footer.jsx";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { mdiHeartOutline } from '@mdi/js';
import { mdiHeart } from '@mdi/js';
import { mdiExportVariant } from '@mdi/js';
import Icon from '@mdi/react';
import { mdiCubeSend } from '@mdi/js';
import { mdiTruckFast } from '@mdi/js';
import { mdiCheckboxMarkedCircle } from '@mdi/js';
import { mdiAlphaXCircle } from '@mdi/js';


//window.changeWindow = new Event("changeWindow");
export default class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        iconColor: '#0471AF',
        iconHeart: mdiHeartOutline,
        iconTxt: 'SAVE',
        stock: [{
            ID: '',
            Prices: '',
            Descriptions: ''
        }],
        default: '',
        itemDescs: [],
      };
      this.getTask = this.getTask.bind(this);
      this.showDiscount = this.getTask.bind(this);
      this.changeHeart = this.changeHeart.bind(this);
    }

    getTask() {
        axios({
            method: 'get',
            url: '/todo',
        })
        .then(results => {
            this.setState({
                stock: results.data,
                //default: results.data[100],
                itemDescs: results.data[83].Descriptions.split(', '),
                price: results.data[83].Prices.toFixed(2),
                fakePrice: results.data[83].Mockprice.toFixed(2),
                discount: results.data[83].Discount
            });
        });
        
    }

    changeHeart() {
      if (this.state.iconHeart === mdiHeartOutline) {
        this.setState({
            iconHeart: mdiHeart,
            iconColor: '#DD0637',
            iconTxt: 'SAVED'
        });
      } else {
        this.setState({
          iconHeart: mdiHeartOutline,
          iconColor: '#0471AF',
          iconTxt: 'SAVE'
      });
      }
    }

    componentWillMount(){
      this.getTask();
    }
  
    // componentDidMount() {
    
    
    // }

    
  

    render() {
      return (
        <div className="">
            <Paper className="description">
              <Grid container wrap="nowrap">
                <Grid item xs zeroMinWidth>
                  {
                    this.state.discount < 1 ?
                    (<p className="price"><sup className="first-letter">$</sup>{this.state.price}</p>)
                    :
                    (
                      <React.Fragment>
                        <p className="price"><sup className="first-letter">$</sup>{this.state.price}
                        <span className="prevPrice">Was {this.state.fakePrice}</span></p>
                        <p className="save">SAVE {this.state.discount}%</p>
                        </React.Fragment>
                    )
                  }
                </Grid>
              </Grid>
            </Paper>
            <Paper className="">
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item xs zeroMinWidth>
                  <ul className="bullets">
                    {this.state.itemDescs.map(value => (
                    <li key={value} className="bulletpoint">{value}</li>))}
                  </ul>

                  <hr></hr>

                  <div className="number-input cartForm">
                    <button onClick="this.parentNode.querySelector('input[type=number]').stepDown()" ></button>
                    <input className="quantity" min="1" name="quantity" value="1" type="number"></input>
                    <button onClick="this.parentNode.querySelector('input[type=number]').stepUp()" className="plus"></button>
                  </div>

                  <button className="addToCart">
                    <span id="addTxt">ADD TO CART</span>
                  </button>

                  <div className="btngrp">
                  <button className="saveButton" onClick={this.changeHeart}>
                      <Icon path={this.state.iconHeart}
                        title="Favorite"
                        size="14px"
                        color={this.state.iconColor}
                      />
                      <span id="saveTxt">{this.state.iconTxt}</span>
                  </button>
                  <button className="saveButton">
                      <Icon path={mdiExportVariant}
                        title="Favorite"
                        size="14px"
                        color="#0471AF"
                      />
                      <span id="saveTxt">SHARE</span>
                  </button>
                  </div>

                  <hr></hr>
                </Grid>
              </Grid>
            </Paper>
            <Paper className="">
              <Grid container wrap="nowrap" spacing={0}>
                <Grid item xs>
                  <div className="shipAvailContainer">
                    <div className="availIcons">
                    <div>
                      <Icon path={mdiCubeSend}
                            title="Favorite"
                            size="33px"
                      />
                      <h4>Ships to Store FREE</h4>
                    </div>
                    <div>
                      <Icon path={mdiCheckboxMarkedCircle}
                        title="Favorite"
                        size="14px"
                        color="#338700"
                      />
                      <span className="ready4pickup">Ready for pickup: Estimated by 10/30/2019</span>
                    </div>
                    </div>


                    <div className="availIcons">
                    <div>
                      <Icon path={mdiTruckFast} 
                          title="Favorite"
                          size="33px"
                      />
                      <h4>FREE Shipping</h4>
                    </div>
                    <div>
                      <p className="ready4pickup">Ready for delivery: Estimated on 10/30/2019</p>
                    </div>
                    </div>
                  </div>
                  
                </Grid>
              </Grid>
            </Paper>
        </div>
      )
    }
  }

  App.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  ReactDOM.render(<App />, document.getElementById("description"));


  // <Typography>message to the wise and I am just seeing if something of this sort will fir into the space</Typography>