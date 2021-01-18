import React, {useEffect, useState} from 'react'
import useFirestore from '../../../hooks/useFirestore'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'
import Gold from '../../../images/label_best/Best_Gold.svg'
import Silver from '../../../images/label_best/Best_Silver.svg'
import Bronze from '../../../images/label_best/Best_Bronze.svg'
import Animals from '../../../images/label_best/Best_Animals.svg'
import Games from '../../../images/label_best/Best_Games.svg'
import Movies from '../../../images/label_best/Best_Movies.svg'
import Characters from '../../../images/label_best/Best_Characters.svg'
import Nature from '../../../images/label_best/Best_Nature.svg'
import Other from '../../../images/label_best/Best_Other.svg'
import BestSixteen from '../../../images/label_best/Best_16.svg'
import BestThirtyTwo from '../../../images/label_best/Best_32.svg'
import BestSixtyFour from '../../../images/label_best/Best_64.svg'
import IconGold from '../../../images/label_icons/Icon_Gold.svg'
import IconSilver from '../../../images/label_icons/Icon_Silver.svg'
import IconBronze from '../../../images/label_icons/Icon_Bronze.svg'
import IconAnimals from '../../../images/label_icons/Icon_Animals.svg'
import IconGames from '../../../images/label_icons/Icon_Games.svg'
import IconMovies from '../../../images/label_icons/Icon_Movies.svg'
import IconCharacters from '../../../images/label_icons/Icon_Characters.svg'
import IconNature from '../../../images/label_icons/Icon_Nature.svg'
import IconOther from '../../../images/label_icons/Icon_Other.svg'
import IconSize from '../../../images/label_icons/Icon_Size.svg'

const InfoWrapper = styled.div`
  margin: 0 20%;  
  max-height: 27%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;  
`
const IconWrapper = styled.div`
  position: absolute;
  top: 1%;
  left: 3%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`
const BestLabel = styled.div`
  position: relative;
  height: 100%; 
  
  .tooltip {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    background: rgba(227, 245, 241, 1);
    opacity: 1 !important;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
  }
  
  img {
    height: 100%;
    filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25))
  }
`
const BestIcon = styled.div`
  height: 100%;
  width: auto;
  padding-left: 8%;
  
  img {
    filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25))
  }
`


const ImageLabel = props => {

    const labelValue = [Gold, Silver, Bronze]
    const iconValue = [IconGold, IconSilver, IconBronze]
    const labelBestOfAllDescription = ['The', 'Second', 'Third']

    const [matchBestOfAll, setMatchBestOfAll] = useState(false)
    const [matchBestInCategory, setMatchBestInCategory] = useState(false)
    const [matchBestInSize, setMatchBestInSize] = useState(false)
    const [numberBest, setNumberBest] = useState(-1)
    const [categoryBest, setCategoryBest] = useState('')
    const [sizeBest, setSizeBest] = useState('')

    const {images} = useFirestore('images')

    //Best of all
    useEffect(() => {
        if (images.length > 0) {
            //Sort the images by the likes number or
            // if the likes number is the same then by time created
            const sortedImages = images.sort((imageA, imageB) => (
                (imageB.userLiked.length - imageA.userLiked.length)
                || (imageB.createdAt - imageA.createdAt)
            ))

            const sortedURL = sortedImages.map(image => image.url)
            const bestIndex = sortedURL.indexOf(props.url)

            if (bestIndex > -1 && bestIndex < 3) {
                setMatchBestOfAll(true)
                setNumberBest(bestIndex)
            }
        }
    }, [images, props.url])

    //Best in category
    useEffect(() => {
        if (images.length > 0) {
            //Sort first by category then by likes
            const sortedImages = images.filter(image => image.category === props.category)

            sortedImages.sort((imageA, imageB) => (
                (imageB.userLiked.length - imageA.userLiked.length)
                || (imageB.createdAt - imageA.createdAt)
            ))

            if (sortedImages[0].url === props.url) {
                setMatchBestInCategory(true)
                setCategoryBest(props.category)
            } else {
                setMatchBestInCategory(false)
            }
        }


    }, [images, props.category, props.url])

    //Best in size
    useEffect(() => {
        if (images.length > 0) {
            //Sort first by size then by likes
            const sortedImages = images.filter(image => image.size === props.size)

            sortedImages.sort((imageA, imageB) => (
                (imageB.userLiked.length - imageA.userLiked.length)
                || (imageB.createdAt - imageA.createdAt)
            ))

            if (sortedImages[0].url === props.url) {
                setMatchBestInSize(true)
                setSizeBest(props.size)
            } else {
                setMatchBestInSize(false)
            }
        }
    }, [images, props.size, props.url])

    const pickCategoryLabel = category => {
        switch (category) {
            case 'nature' :
                return Nature
            case 'animals':
                return Animals
            case 'games':
                return Games
            case 'movies':
                return Movies
            case 'characters':
                return Characters
            case 'other':
                return Other
            default:
                return
        }
    }
    const pickCategoryIcon = category => {
        switch (category) {
            case 'nature' :
                return IconNature
            case 'animals':
                return IconAnimals
            case 'games':
                return IconGames
            case 'movies':
                return IconMovies
            case 'characters':
                return IconCharacters
            case 'other':
                return IconOther
            default:
                return
        }
    }
    const pickSize = size => {
        switch (size) {
            case '16 x 16':
                return BestSixteen
            case '32 x 32':
                return BestThirtyTwo
            case '64 x 64':
                return BestSixtyFour
            default:
                return
        }
    }

    const renderInfoLabel = () => {
        return (
            <InfoWrapper>
                {
                    matchBestOfAll &&
                    <BestLabel>
                        <a data-tip={`${labelBestOfAllDescription[numberBest]} Best of All`}>
                            <img
                                alt='best-label'
                                src={labelValue[numberBest]}
                            />
                        </a>
                        <ReactTooltip
                            className='tooltip'
                            place='top'
                            type='light'
                            effect='solid'
                            backgroundColor='#E3F5F1'
                        />
                    </BestLabel>
                }

                {
                    matchBestInCategory &&
                    <BestLabel>
                        <a data-tip={`Best of "${categoryBest.slice(0, 1).toUpperCase()}${categoryBest.slice(1)}"`}>
                            <img
                                alt='category-label'
                                src={pickCategoryLabel(categoryBest)}
                            />
                        </a>
                        <ReactTooltip
                            className='tooltip'
                            place='top'
                            type='light'
                            effect='solid'
                            backgroundColor='#E3F5F1'
                        />
                    </BestLabel>
                }

                {
                    matchBestInSize &&
                    <BestLabel>
                        <a data-tip={`Best of "${sizeBest}"`}>
                            <img
                                alt='size-label'
                                src={pickSize(sizeBest)}
                            />
                        </a>
                        <ReactTooltip
                            className='tooltip'
                            place='top'
                            type='light'
                            effect='solid'
                            backgroundColor='#E3F5F1'
                        />
                    </BestLabel>
                }
            </InfoWrapper>
        )
    }
    const renderIconLabel = () => {
        return (
            <IconWrapper>
                {
                    matchBestOfAll &&
                    <BestIcon>
                        <img src={iconValue[numberBest]} alt="bestOfAllICon"/>
                    </BestIcon>
                }
                {
                    matchBestInCategory &&
                    <BestIcon>
                        <img src={pickCategoryIcon(categoryBest)} alt="bestInCategoryIcon"/>
                    </BestIcon>
                }
                {
                    matchBestInSize &&
                    <BestIcon>
                        <img src={IconSize} alt="bestInSizeIcon"/>
                    </BestIcon>
                }
            </IconWrapper>
        )
    }

    return (
        props.labelType === 'info'
            ? renderInfoLabel()
            : renderIconLabel()
    )
}

export default ImageLabel