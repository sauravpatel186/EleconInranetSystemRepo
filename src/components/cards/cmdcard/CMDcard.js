import React from 'react'
import "./CMDcard.css"
import mdphoto from "../../../assets/images/cmd.jpg"
export const CMDcard = () => {
  return (
    <>
        <div className="cmd-card">
            <div className="cmd-profile">
                <div className="cmd-photo">
                    <img src={mdphoto} alt='CMD'/>
                </div>
            </div>
        </div>
    </>
  )
}
