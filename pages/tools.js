import Layout from "../components/Layout.js";
import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";
import { Config } from "../config.js";


import { device } from "../components/device";


import PageWrapper from "../components/PageWrapper.js";
import Menu from "../components/Menu/Menu.js";
import MobileMenu from "../components/Menu/MobileMenu.js";
import PageInsightGrader from "../components/PageInsightGrader.js";
import PageInsightFixes from "../components/PageInsightFixes.js";
import SEOInsight from "../components/SEOInsight.js";
import CompetitorInsight from "../components/CompetitorInsight.js";
import CardFlipper from "../components/CardFlipper.js";



const Wrapper = styled.div`
    animation: fadein 0.5s;

    @keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }
`;

const HeroGhost = styled.div`
    height: 40vh;
    width: 100vw;

    @media ${device.laptop} {
        height: 50vh;
    }
`;

const HeroSection = styled.div`
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100vw;
    height: 30vh;
    left: 0;
    right: 0;
    top: 0;
    transition: all 0.4s ease;

    @media ${device.laptop} {
        height: 38vh;
        justify-content: left;
    }
`;

const Special = styled.div`
    position: absolute;
    right: 0;
    top: 16%;
    width: 100vw;
    height: 30vh;
    background: url(${props => props.img ? props.img : "https://s3-us-east-2.amazonaws.com/one-seo-bucket/wp-content/uploads/2018/08/06161716/AboutUs_01.jpg"}) no-repeat center;
    background-size: cover;

  @media ${device.laptop} {
      height: 40vh;
  }
`;

const HeroText = styled.h1`
    z-index: 1000;
    color: #fff;
    text-shadow: 0.5px 0.5px 10px rgba(0,0,0,0.8);
    font-size: 30px;
    margin: 0;
    position: relative;
    top: 75%;
    padding: 0 20px;

    @media ${device.laptop} {
      top: 73%;
      margin: 0;
      font-size: 50px;
      width: 50%;
      padding: 0 150px;
    }
`;

const Grid = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 75px;

    @media ${device.laptop} {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        margin: 75px;

    }
`



class Tools extends Component {

    static async getInitialProps(context) {
        const pageRes = await fetch(
            `${Config.apiUrl}/wp-json/freddie/v2/page/?slug=tools`
        );
        const page = await pageRes.json();
        return { page };
    }

    render() {
        return (
            <Layout data={this.props.page.acf} >
                <Wrapper>
                    <Special img="/static/images/toolsFillIn.jpg"/>
                    <HeroSection>
                        <div><HeroText>TOOLS</HeroText></div>
                    </HeroSection>
                    <Menu menu={this.props.headerMenu} />
                    <MobileMenu menu={this.props.headerMenu} />
                    <HeroGhost/>
                    <Grid>
                        <CardFlipper>
                            <img src="/static/images/websiteGrader.png" width="319" height="319"/>
                            <PageInsightGrader></PageInsightGrader>
                        </CardFlipper>
                        <CardFlipper>
                            <img src="/static/images/suggestedFixes.png" width="319" height="319"/>
                            <PageInsightFixes></PageInsightFixes>
                        </CardFlipper>
                        <CardFlipper>
                            <img src="/static/images/keywordAnalyzer.png" width="319" height="319"/>
                            <SEOInsight></SEOInsight>
                        </CardFlipper>
                        <CardFlipper>
                            <img src="/static/images/competitorAnalysis.png" width="319" height="319"/>
                            <CompetitorInsight></CompetitorInsight>
                        </CardFlipper>
                    </Grid>
                </Wrapper>
            </Layout>
        );
    } //render
} //class

export default PageWrapper(Tools);
