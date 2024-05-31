import React from 'react'
import BannerSection from './Components/BannerSection'
import TopTrendingNews from './Components/TopTrendingNewsSec'
import BrowseNewsSec from './Components/BrowseNewsSec'

const MainNewsPage = () => {
    return (
        <>
            <BannerSection />
            <TopTrendingNews />
            <BrowseNewsSec />
        </>
    )
}

export default MainNewsPage