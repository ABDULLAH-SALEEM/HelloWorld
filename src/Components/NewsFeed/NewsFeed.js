import React from 'react'
import Button from '@material-ui/core/Button';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import AddIcon from '@material-ui/icons/Add';
import './NewsFeed.css'
import CreatePost from '../CreatePost/CreatePost';
import AllPostPreviews from '../PostPreviews/AllPostPreviews/AllPostPreviews';

const NewsFeed = () => {
    return (
        <div className='newsFeed'>
            <div className='createStory' >
                <div className='createStoryMain'>
                    <AddIcon />
                    <div className='createStoryBody' >
                        <h3>Create Story</h3>
                        <p>Share a photo or write something.</p>
                    </div>
                </div>
            </div>
            <div className='createRoom'>
                <Button variant="outlined"><VideoCallIcon className='roomVideo' /> Create Room</Button>
            </div>
            <div>
                <CreatePost/>
            </div>
            <div>
                <AllPostPreviews />
            </div>

        </div>
    )
}

export default NewsFeed
