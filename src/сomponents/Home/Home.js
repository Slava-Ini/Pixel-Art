import React, {useState} from 'react'
import TipsButton from '../UI/Tips/TipsButton'
import styled from 'styled-components'
import Github from '../../images/social_links/Github.png'
import Telegram from '../../images/social_links/Telegram.png'
import Instagram from '../../images/social_links/Instagram.png'
import Twitter from '../../images/social_links/Twitter.png'
import Gmail from '../../images/social_links/Gmail.png'
import YandexMail from '../../images/social_links/YandexMail.png'
import {motion} from 'framer-motion'

const HomeWrapper = styled(motion.div)`
  font-family: 'Roboto', sans-serif;
  font-weight: lighter;
  width: 50%;
  max-width: 60rem;
  height: 80%;
  max-height: 90rem;
  overflow: auto;
  background: rgba(227, 245, 241, 0.85);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  >button {
    align-items: center;
    line-height: 20px;
    left: 45%;
    margin: 0 auto;
  }

  h1 {
    font-weight: 300;
    font-size: 2vw;
    text-align: center;
    color: rgba(8, 116, 140, 1);
  }
  
  .outline {
    color: rgba(8, 116, 140, 1);
  }
  
  p {
    text-align: center;
    font-size: 1.8vw;
    font-weight: 300;
    max-width: 75%;
    margin: 0 auto;
  }
  
  .homeLinks {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 10%;
    
    a {
      height: 60%;
    }
  }
  
  .homeLinks a img {
    width: auto;
    height: 110%;
    margin-right: 0.6rem;
    filter: drop-shadow(0px 6px 4px rgba(0, 0, 0, 0.25));
  
    &:hover {
      filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
      transition: filter 0.2s linear;
    }
  
    &:active {
      filter: none;
    }
  }
  
  .emailLink {
    height: 60%;
    position: relative;

    img {
      cursor: pointer;
      height: 80%;
      width: auto;
      margin-top: 0.3rem;
      margin-right: 0.6rem;
      filter: drop-shadow(0px 6px 4px rgba(0, 0, 0, 0.25));
      
      &:hover {
        filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
        transition: filter 0.2s linear;
      }
  
      &:active {
        filter: none;
      }
      
    }
    
    span {
      visibility: hidden;
      opacity: 0;
      transition: visibility 0s, opacity 0.1s linear;
      position: absolute;
      background: #D0FFBF;
      border-radius: 8px;
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
      width: 160%;
      height: 110%;
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      font-size: 2vh;
      top: -120%;
      left: -40%;
      text-align: center;
      padding-top: 5%;
    }
    
    .gmailTooltip {
      visibility: ${props => props.displayGmailCopied ? 'visible' : 'hidden'};
      opacity: ${props => props.displayGmailCopied ? '1' : '0'};
    }
    
    .yandexmailTooltip {
      visibility: ${props => props.displayYandexmailCopied ? 'visible' : 'hidden'};
      opacity: ${props => props.displayYandexmailCopied ? '1' : '0'};
    }
  }
`

const Home = props => {

    const socialLinks = {
        github: 'https://github.com/Slava-Ini/Pixel-Art.git',
        telegram: 'https://telegram.me/Slava_In',
        instagram: 'https://www.instagram.com/accounts/login/?next=/vyacheslav_inyutochkin/%3Figshid%3Dnzoo8movljft',
        twitter: 'https://twitter.com/vyacheslavinyut',
        gmail: 'vyacheslav.inyutochkin@gmail.com',
        yandexmail: 'vyacheslav.inyutochkin@yandex.ru'
    }

    const [displayGmailCopied, setDisplayGmailCopied] = useState(false)
    const [displayYandexmailCopied, setDisplayYandexmailCopied] = useState(false)

    // Show tooltip if the email link is copied
    const handleMailCopy = (mailLink) => {
        window.navigator.clipboard.writeText(mailLink)

        if (mailLink === socialLinks.gmail) {
            setDisplayGmailCopied(true)
            setTimeout(() => {
                setDisplayGmailCopied(false)
            }, 700)
        } else {
            setDisplayYandexmailCopied(true)
            setTimeout(() => {
                setDisplayYandexmailCopied(false)
            }, 700)
        }

    }

    return (
        <HomeWrapper
            variants = {props.containerVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            displayGmailCopied={displayGmailCopied}
            displayYandexmailCopied={displayYandexmailCopied}
        >
            <h1>Welcome to Pixelart</h1>
            <p>
                <span className='outline'>Pixelart</span> is an open source project,
                made with React.js library as a part of practicing React and JavaScript.
            </p>
            <p>
                Draw your pixelart image on your own, or upload and change something
                you have, share your art with others and take a look at community works.
            </p>
            <p>
                Check out the user guide.
            </p>
            <TipsButton
                displayName={false}
            />
            <p>Have a great day!</p>
            <div className='homeLinks'>
                <a href={socialLinks.github} rel="noopener noreferrer" target='_blank'>
                    <img src={Github} alt='github'/>
                </a>
                <a href={socialLinks.telegram} target='_blank'>
                    <img src={Telegram} alt='telegram'/>
                </a>
                <a href={socialLinks.instagram}  rel="noopener noreferrer" target='_blank'>
                    <img src={Instagram} alt='instagram'/>
                </a>
                <a href={socialLinks.twitter} rel="noopener noreferrer" target='_blank'>
                    <img src={Twitter} alt='twitter'/>
                </a>
                <div
                    className='emailLink'
                    onClick={() => handleMailCopy(socialLinks.gmail)}
                >
                    <span className='gmailTooltip'>Email copied</span>
                    <img src={Gmail} alt='gmail'/>
                </div>
                <div
                    className='emailLink'
                    onClick={() => handleMailCopy(socialLinks.yandexmail)}
                >
                    <span className='yandexmailTooltip'>Email copied</span>
                    <img src={YandexMail} alt='yandexmail'/>
                </div>
            </div>
        </HomeWrapper>
    )
}

export default Home;