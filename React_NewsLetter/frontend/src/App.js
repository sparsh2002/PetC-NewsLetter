import React, { Component } from 'react';
import './App.css';
import { Row, Col } from 'antd';
import NewsletterForm from './NewsletterForm';
import Loading from './shared/Loading';
import axios from 'axios';
import { apiUrl, notify } from './helpers';


//images import
import doodle from './assets/doodle.png'
import logo from './assets/logo.png'
// icon import
// import InstagramIcon from '@mui/icons-material/Instagram';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      loading: false
    }
  }

  handleLoadingState = loading => {
    //Set loading flag
    this.setState({ loading: loading });
  }

  handleSendEmail = email => {
    this.handleLoadingState(true);
    axios.post(`${apiUrl}/subscribe`, {
      email: email
    }).then(res => {
      if(res.data.success) {
        //If the response from MailChimp is good...
        notify('success', 'Subscribed!', res.data.success);
        this.setState({ email: '' });
        this.handleLoadingState(false);
      } else {
        //Handle the bad MailChimp response...
        notify('error', 'Unable to subscribe!', res.data.error);
        this.handleLoadingState(false);
      }
    }).catch(error => {
      //This catch block returns an error if Node API returns an error
      notify('error', 'Error. Please try again later.', error.message);
      this.handleLoadingState(false);
    });
  }

  handleOnChangeEmail = email => {
    this.setState({
      email: email
    })
  }
  
  render() {
    return (
      <div className="App">
        <div className='main-container'>
        <div className='left-side'>
          <img src={doodle} alt='doodle' className='doodle' />
        </div>

        <div className='right-side'>
        <img src={logo} alt='logo' />
        <h1 className='header-meow'>meow-coming soon</h1>
        <section className="newsletter-content">
          <Row>
            <Col span={24}>
              {this.state.loading
                ? <Loading message="Working on it..." />
                : <NewsletterForm handleSendEmail={this.handleSendEmail} handleOnChangeEmail={this.handleOnChangeEmail} email={this.state.email} />
              }
            </Col>
          </Row>
        </section>
        <div className='text'>
              <h4 className='subscribe'>Subscribe to stay tuned for new Updates</h4>
              <br/>
              <p className='main-text'>Got kitties and puppies or big fat bunnies!!! &#x1F430; </p>
              <p className='main-text'>   We are the one stop solution for all you need for your pets!!! </p>
              <br/>
              <p className='main-text'>If your bunny is sick or maybe you need some dog food for your doggo,&#x1F415; </p>
              <p className='main-text'> Have some plans for weekend but still can’t find someone to take care of your
                 kittu &#x1F496;</p>
              <p className='main-text'>   Or maybe you wanna connect someone with tommy!!!</p>
              <br/>
              <p className='main-text'> All you need is HERE!!! &#x1F607;</p>
              <p className='main-text'>PetC : Caring loved Ones!!!</p>

        <div className='newsletter-footer'>
              Follow us on
              <div>
                  <a href='https://www.instagram.com/__petc__/'> Insta</a>  <a>Fb</a> <a>LinkedIn</a> <a>Twitter</a>
              </div>
        </div>
        </div>
        </div>
        
        </div>
        
      </div>
    );
  }
}

export default App;
