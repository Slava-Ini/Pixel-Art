import React, {useCallback, useEffect, useRef, useState} from 'react'
import useFirestore from '../../hooks/useFirestore'
import GalleryCard from '../UI/Gallery/GalleryCard'
import Loader from '../UI/General/Loader'
import useForceUpdate from 'use-force-update'
import styled from 'styled-components'
import Select from 'react-select'
import {motion} from 'framer-motion'
import ScrollToTop from 'react-scroll-up'

const GalleryWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  min-width: 70%;
  min-height: 80%;
  
  #search {
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    min-width: 50%;
    max-width: 80rem;
    height: 4em;
    min-height: 4em;
    background: rgba(227, 245, 241, 0.85);
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    
    >button {
      display: none;
    }
    >input {
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      box-sizing: border-box;
      padding: 0 4%;
      font-size: 1.6vw;
      width: 94%;
      height: 60%;
      border: none;
      background: #FFFFFF;
      box-shadow: inset 0 2px 2px rgba(0, 0, 0, 0.25);
      outline: none;
    }
  }
  
  .selectFilterContainer {
    display: flex;
    justify-content: space-between;
    width: 50%;
    margin: 1em 0;
  }
  
  .selectorWrapper, .filterWrapper {
    height: 3vw;
    width: 45%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  
  .Select-container {
    width: 40%;
  } 
  
  .Select__control {
    min-height: 0.5em;
    display: flex;
    justify-content: space-around;
    height: 100%;
    border: none;
    background: rgba(227, 245, 241, 0.85);
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
      transition: box-shadow 0.2s linear;
    }
  }
  
  .Select__value-container {
    display: flex;
    justify-content: center;
    align-content: center;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    font-size: 18px;
  }
  
  .Select__placeholder {
    color: #000000;
    font-size: 1vw;
    margin-left: 0.5em;
  }
  
  .Select__indicator {
    padding: 0;
  }
  
  .Select__indicator-separator {
    display: none;
  }
  
  .Select__menu {
    background: rgba(227, 245, 241, 0.85);
  }
  
  .Select__option {
    text-align: center;
    cursor: pointer;
    
    &:hover {
      text-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
    }
  }
  
  .Select__indicator {
    color: #000000;
  }
  
  .Select__input {
    color: transparent;
  }
  
  .filterWrapper button {
    background: rgba(227, 245, 241, 0.85);
    border: none;
    outline: none;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    width: 40%;
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    font-size: 1vw;
    cursor: pointer;
    
    &:hover {
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25);
      transition: box-shadow 0.2s linear;
    }
    
    &:active {
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.25);
    }
  }
  
  .scrollUp {
    font-weight: bold;
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
    
    &:hover {
      color: white;
      transition: color 0.1s linear;
    }
  }
`

const GalleryImages = styled.div`
  margin-top: 2%;
  padding-bottom: 1em;
  width: 80%;
  display: grid;
  grid-template-columns: repeat(4, 20vh);
  grid-template-rows: repeat(3, 22vh);
  grid-column-gap: 3.5vh;
  grid-row-gap: 4vh;
  justify-content: center;
  align-items: center;
  overflow-clip: true;
`

const Gallery = props => {

    const {images} = useFirestore('images')

    const [searchValue, setSearchValue] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredImages, setFilteredImages] = useState(images)
    const [filterButtonsState, setFilterButtonsState] = useState({
        likes: 'none',
        added: 'none'
    })
    const [imitateClick, setImitateClick] = useState(false)
    const forceUpdate = useForceUpdate()

    const sizeOptions = [
        {value: '16 x 16', label: '16 x 16'},
        {value: '32 x 32', label: '32 x 32'},
        {value: '64 x 64', label: '64 x 64'}
    ]
    const categoryOptions = [
        {value: 'Nature', label: 'Nature'},
        {value: 'Animals', label: 'Animals'},
        {value: 'Games', label: 'Games'},
        {value: 'Movies', label: 'Movies'},
        {value: 'Characters', label: 'Characters'},
        {value: 'Other', label: 'Other'}
    ]
    const filterIcons = ['↑', '↓', '◯']
    const filterButtonNames = ['likes', 'added']
    const submitRef = useRef(null)

    const sortOutGallery = useCallback((filterKey, property) => {
        //Functions for the sort
        const compareFunctionDescending = (imageA, imageB, key) => {
            if (key === 'userLiked') {
                return imageB[key].length - imageA[key].length
            } else {
                return imageB[key] - imageA[key]
            }
        }
        const compareFunctionAscending = (imageA, imageB, key) => {
            if (key === 'userLiked') {
                return imageA[key].length - imageB[key].length
            } else {
                return imageA[key] - imageB[key]
            }
        }
        //Sorting key
        let key = ''
        if (property === 'likes') {
            key = 'userLiked'
        } else {
            key = 'createdAt'
        }

        let filteredImages = images

        //Conditional sorting
        if (images.length !== 0) {
            if (filterButtonsState[filterKey] === 'ascending') {
                filteredImages.sort((imageA, imageB) => compareFunctionAscending(imageA, imageB, key))
            } else if (filterButtonsState[filterKey] === 'descending') {
                filteredImages.sort((imageA, imageB) => compareFunctionDescending(imageA, imageB, key))
            } else {
                return images
            }
        }
    }, [filterButtonsState, images])

    //Imitate click
    useEffect(() => {
        submitRef.current.click()
        setImitateClick(false)
    }, [imitateClick])

    //Sort by likes
    useEffect(() => {
        sortOutGallery('likes', 'likes')
        forceUpdate()
    }, [filterButtonsState, forceUpdate, sortOutGallery])

    // Sort by time
    useEffect(() => {
        sortOutGallery(['added'], 'time')
        forceUpdate()
    }, [filterButtonsState, forceUpdate, sortOutGallery])

    const searchHandler = e => {
        setSearchValue(e.target.value)
    }
    const onSearchSubmit = e => {
        e.preventDefault()
        const searchTerm = searchValue
        let filtered = images.filter(image => (
            image.name.toLowerCase().includes(searchTerm.toLowerCase())
            || image.userName.toLowerCase().includes(searchTerm.toLowerCase())
            || image.category.toLowerCase().includes(searchTerm.toLowerCase())
            || image.size.includes(searchTerm)
        ))
        setFilteredImages(filtered)
        setSearchTerm(searchTerm)
    }
    const handleSorting = e => {
        //Sets the status of sorting for the current button
        if (filterButtonsState[e.target.id] === 'none') {
            setFilterButtonsState({
                ...filterButtonsState,
                [e.target.id]: 'descending'
            })
        } else if (filterButtonsState[e.target.id] === 'descending') {
            setFilterButtonsState({
                ...filterButtonsState,
                [e.target.id]: 'ascending'
            })
        } else {
            setFilterButtonsState({
                ...filterButtonsState,
                [e.target.id]: 'none'
            })
        }
    }
    const handleSelect = e => {
        setSearchValue(e.value)
        setSearchTerm(e.value)
        setImitateClick(true)
    }

    const renderSelects = () => {
        return (
            <div className='selectorWrapper'>
                <Select
                    options={sizeOptions}
                    onChange={handleSelect}
                    placeholder='Size'
                    className='Select-container'
                    classNamePrefix='Select'
                    value={null}
                />

                <Select
                    options={categoryOptions}
                    onChange={handleSelect}
                    placeholder='Category'
                    className='Select-container'
                    classNamePrefix='Select'
                    value={null}
                />
            </div>
        )
    }
    const renderFilterOrder = buttonName => {
        if (filterButtonsState[buttonName] === 'ascending') {
            return filterIcons[0]
        } else if (filterButtonsState[buttonName] === 'descending') {
            return filterIcons[1]
        } else {
            return filterIcons[2]
        }
    }
    const renderGallery = () => {
        let gallery = []
        if (searchTerm === '') {
            gallery = images
        } else {
            gallery = filteredImages
        }

        if (images.length === 0) {
            return <Loader height={'80%'}/>
        } else {
            return (
                <GalleryImages>
                    {
                        gallery
                            .map(doc => (
                                <div key={doc.id}>
                                    <GalleryCard
                                        category={doc.category}
                                        size={doc.size}
                                        url={doc.url}
                                        name={doc.name}
                                        id={doc.id}
                                        userName={doc.userName}
                                        userLiked={doc.userLiked}
                                        createdAt={doc.createdAt}
                                        imageUserId={doc.userId}
                                        displayUserName={true}
                                    />
                                </div>
                            ))
                    }
                </GalleryImages>
            )
        }


    }

    return (
        <GalleryWrapper
            variants = {props.containerVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
        >
            <form id='search' onSubmit={onSearchSubmit}>
                <input
                    type='text'
                    placeholder={'Search...'}
                    value={searchValue}
                    onChange={searchHandler}
                    autoFocus={true}
                />
                <button
                    type='submit'
                    ref={submitRef}
                >Submit
                </button>
                <br/>
            </form>

            <div className='selectFilterContainer'>
                {renderSelects()}

                <div
                    id='filter'
                    className='filterWrapper'
                >
                    {
                        filterButtonNames
                            .map(buttonName => (
                                <button
                                    key={buttonName + filterButtonNames.indexOf(buttonName)}
                                    onClick={handleSorting}
                                    id={buttonName}
                                >
                                    {buttonName.slice(0, 1).toUpperCase()}
                                    {buttonName.slice(1) + ' '}
                                    <span className='orderIndicator'>{renderFilterOrder(buttonName)}</span>
                                </button>
                            ))
                    }
                </div>
            </div>


            {renderGallery()}
            <ScrollToTop showUnder={160}>
                <span className='scrollUp'>^</span>
            </ScrollToTop>
        </GalleryWrapper>
    )
}

export default Gallery;