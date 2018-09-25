import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import fetch from "isomorphic-unfetch";
import NProgress from 'nprogress';
import { subscribeToNewsletter } from '../lib/api/public';
import InsightLoader from "./InsightLoader";
import styled, { keyframes } from 'styled-components';
import { bounceInDown, bounceInLeft, bounceInRight } from 'react-animations';
import StarRatingComponent from 'react-star-rating-component';


const Wrapper = styled.div`
  height: 300px;
  padding: 10px 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Title = styled.p`
  font-size: 15px;
  font-weight: bold;
`

const bounceInDownAnimation = keyframes`${bounceInDown}`
const bounceInLeftAnimation = keyframes`${bounceInLeft}`
const bounceInRightAnimation = keyframes`${bounceInRight}`

const BouncyDownDiv = styled.div`
  animation: 1s ${bounceInDownAnimation};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BouncyLeftDiv = styled.div`
  animation: 1s ${bounceInLeftAnimation};
`;

const BouncyRightDiv = styled.div`
  animation: 1s ${bounceInRightAnimation};
`;


const Infotainer = styled.div`
  padding: 5px;
`;

class PageInsightFixes extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      completed: false,
    }
  }

  uniqueWa = () => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }

  onSubmit = async (e) => {

    this.setState({
      uniqueID: this.uniqueWa(),
      loading: true
    });

    console.log(this.state.uniqueID);

    e.preventDefault();
    console.log(this.siteInput.value);
    const email = (this.emailInput && this.emailInput.value) || null;

    const res = await fetch(
        `https://www.googleapis.com/pagespeedonline/v4/runPagespeed?key=${YOUR_KEY_HERE}&url=${this.siteInput.value}`
    );
    const resData = await res.json();

    if (this.emailInput && !email) {
          return;
        }

    NProgress.start();

    try {
      await subscribeToNewsletter({ email });

    if (this.emailInput) {
        this.emailInput.value = '';
      }
      
      NProgress.done();
      console.log('email was successfully added to Mailchimp list');
    } catch (err) {
      console.log(err); //eslint-disable-line
      NProgress.done();
  }

  this.setState({
    loading: false,
    completed: true,
    rating: resData.ruleGroups.SPEED.score/10
  });

  const grades = ['E', 'D', 'C', 'B', 'A'];

  if(Math.floor(this.state.rating)/2 > 0) {
    document.getElementById('grade').innerHTML = grades[(Math.floor(this.state.rating)/2)-1];
  } else {
    document.getElementById('grade').innerHTML = 'E';
  }
  document.getElementById('speed').innerHTML = "Speed: " + resData.ruleGroups.SPEED.score + "/100";
  document.getElementById('category').innerHTML = "Category: " + resData.loadingExperience.overall_category;

}

render() {

  if (this.state.loading) {
    return (
      <Wrapper>
        <InsightLoader loading={this.state.loading}/>
      </Wrapper>
    );
 }  
  else if (this.state.completed){
    return(
      <Wrapper>
        <BouncyDownDiv>
          <Title id="grade"></Title>
          <StarRatingComponent 
                name="rate1" 
                starCount={5}
                value={this.state.rating}
              />
       </BouncyDownDiv>
        <BouncyRightDiv>
          <Infotainer id="speed"></Infotainer>
        </BouncyRightDiv>
        <BouncyLeftDiv>
          <Infotainer id="category"></Infotainer>
        </BouncyLeftDiv>
        <a href="/contact-us">
          <Button variant="raised" color="primary" type="submit">
            Let's get started!
          </Button>
        </a>
      </Wrapper>
    );
  }
  else {
      return (
        <Wrapper>
          <form onSubmit={this.onSubmit}>
          <Title>Run your domain through 1SEO's site grader!</Title>
            <TextField
              inputRef={(elm) => {
                this.siteInput = elm;
              }}
              type="url"
              defaultValue="http://www."
              label="Your site"
              className="white"
              required
            />
            <p />
            <br/>
            <TextField
              inputRef={(elm) => {
                this.emailInput = elm;
              }}
              type="email"
              label="Your email"
              className="white"
              required
              defaultValue="test@test.com"
            />
            <p />
            <Button variant="raised" color="primary" type="submit">
              Submit
            </Button>
          </form>
        </Wrapper>
      );
    }
  }
}

export default PageInsightFixes;