import React from 'react'
import { Bars } from 'react-loader-spinner';
import 'reactjs-popup/dist/index.css';
export const ShowLoading = () => {
    return (
        <Bars
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    )
}
