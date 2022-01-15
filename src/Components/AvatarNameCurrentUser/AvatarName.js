import React from 'react'

import './AvatarName.css'
import CurrentAvatar from './CurrentAvatar'
import CurrentName from './CurrentName'

const AvatarName = () => {

   



    return (
        <div className='nameAvatar'>
            <CurrentAvatar /> <h4><CurrentName /></h4>
        </div>
    )
}

export default AvatarName
