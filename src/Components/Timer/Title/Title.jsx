import React from "react";
import favicon from "../../../icons/favicon.ico";
import faviconGreen from "../../../icons/favicon-green.ico";
import faviconBlue from "../../../icons/favicon-blue.ico";
import faviconGray from "../../../icons/favicon-gray.ico";
import {Helmet} from "react-helmet";




export default function Title({currentInterval, pauseTimer}) {
    return (
        <Helmet>
            {currentInterval === 'focus' && pauseTimer === false ?
                <link rel="icon" href={favicon} type="image/x-icon"/> : ''}
            {currentInterval === 'relax' && pauseTimer === false ?
                <link rel="icon" href={faviconGreen} type="image/x-icon"/> : ''}
            {currentInterval === 'longRelax' && pauseTimer === false ?
                <link rel="icon" href={faviconBlue} type="image/x-icon"/> : ''}
            {pauseTimer === true && <link rel="icon" href={faviconGray} type="image/x-icon"/>}
        </Helmet>
    )
}