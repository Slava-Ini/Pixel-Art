import React from 'react'
import Loader from '../../UI/General/Loader'
import styled from 'styled-components'
import GalleryCard from '../../UI/Gallery/GalleryCard'

const MyPosts = styled.div`
  height: 25em;
  width: 50vh;
  min-width: 20em;
  display: grid;
  grid-template-columns: repeat(3, 15vh);
  grid-auto-rows: 18vh;
  grid-column-gap: 4%;
  grid-row-gap: 1.5em;
  align-self: center;
  align-content: start;
  justify-content: center;
  overflow-y: auto;
  overflow-x: visible;
  
  margin-left: 15px;
  
  ::-webkit-scrollbar {
    width: 3px;
  }
  ::-webkit-scrollbar-track {
  background: rgba(227, 245, 241, 0.85);
  }
  ::-webkit-scrollbar-thumb {
  background: #8AE1CC;
  }
  ::-webkit-scrollbar-thumb:hover {
  background: #76bbac;
  }
  
`
const UserImages = props => {

    const renderImages = () => {
        if (!props.images) {
            return <Loader/>
        } else {
            return (
                <MyPosts>
                    {
                        props.images
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
                                        displayUserName={false}
                                    />
                                </div>
                            ))
                    }
                </MyPosts>
            )
        }
    }

    return (
        <React.Fragment>
            {renderImages()}
        </React.Fragment>
    )
}

export default UserImages