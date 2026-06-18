import React from 'react'
import Hero from '../Hero'
import Philosophy from '../Philosophy'
import Facility from '../Facility'
import Trainers from '../Trainers'
import Pricing from '../Pricing'

function Home({loaderFinished}) {
    return (
        <>
            <Hero loaderFinished={loaderFinished} />
            <Philosophy />
            <Facility />
            <Trainers />
            <Pricing />
        </>
    )
}

export default Home