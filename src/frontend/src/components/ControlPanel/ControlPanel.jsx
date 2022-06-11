import React from 'react'
import BusStopSelection from "./BusStopSelection/BusStopSelection";

const ControlPanel = () => {
    return <div className={"control-panel"}>
        <h1 className={"splash-header"}>Where Do You Want To Go?</h1>
        <p className={"splash-subheader"}>Select a start station and a destination station, and we will give you a realistic estimate of how
            long your journey is going to take.</p>
        <BusStopSelection/>
    </div>
}

export default ControlPanel