import React from 'react'
import BannerSec from './Components/BannerSec'
import BestSec from './Components/BestSec'
import BoardsSec from './Components/BoardsSec'
import LatestUpdateSec from './Components/LatestUpdates'

const MainBoardPage = () => {
    return (
        <>
            <BannerSec />
            <BestSec/>
            <BoardsSec/>
            <LatestUpdateSec/>
        </>
    )
}

export default MainBoardPage