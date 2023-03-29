export const menubtnClicked = (display)=>{
    return(dispatch)=>{
        dispatch({
            type : menuClicked,
            payload : display
        })
    }
}

export const closebtnClicked = (display)=>{
    return(dispatch)=>{
        dispatch({
            type : closeClicked,
            payload : display
        })
    }
}