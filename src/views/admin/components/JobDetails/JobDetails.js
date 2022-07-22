import React from "react"
import { formatDateAndTime } from "../../../../helpers/helpers"
import DropdownButton from "../../../teamlead/components/DropdownButton/Dropdown"

const JobDetails = ({ currentJob, editPage, updateJobDetails }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateJobDetails(prevValue => {
            return { ...prevValue, [name]: value }
        })
    }    
    return <>
        <div className="current__Job__Display">
            {
                React.Children.toArray(Object.keys(currentJob || {}).map(key => {
                    
                    if (typeof currentJob[key] === "object") return <></>

                    if (key === "id") return <></>

                    if (key === "title") return <span className={`title__Text ${editPage ? 'display__Flex' : ''}`}><b>{key[0].toLocaleUpperCase() + key.slice(1).toLocaleLowerCase()}</b>: {editPage ? <input type={"text"} name={key} value={currentJob[key]} onChange={handleChange} /> :  <b>{currentJob[key]}</b>}</span>

                    if (key === "description") return <>
                        <span className="description__Text">{key[0].toLocaleUpperCase() + key.slice(1).toLocaleLowerCase()}</span>
                        <textarea value={currentJob[key]} readOnly={editPage ? false : true} rows={3} onChange={handleChange} name={key}></textarea>
                    </>

                    if ((key === "created") || (key === "updated")) return <span>{key[0].toLocaleUpperCase() + key.slice(1).toLocaleLowerCase()}: {formatDateAndTime(currentJob[key])}</span>

                    if (key === "typeof") return <span className={`${editPage ? 'display__Flex' : ''}`}>{key[0].toLocaleUpperCase() + key.slice(1).toLocaleLowerCase()}: {editPage ? <DropdownButton currentSelection={currentJob[key]} selections={["Freelance", "Employee", "Internship"]} handleSelectionClick={(selection) => updateJobDetails(prevValue => { return { ...prevValue, [key]: selection } })} /> : currentJob[key]}</span>
                    
                    if (key === "is_active") return <span className={`${editPage ? 'display__Flex' : ''}`}>{key[0].toLocaleUpperCase() + key.slice(1).toLocaleLowerCase()}: {editPage ? <DropdownButton currentSelection={currentJob[key] === true ? "true" : "false"} selections={["true", "false"]} handleSelectionClick={(selection) => updateJobDetails(prevValue => { return { ...prevValue, [key]: selection } })} /> : currentJob[key] === true ? "true" : "false"}</span>
                    
                    if (key === "time_period") return <span className={`${editPage ? 'display__Flex' : ''}`}>{key[0].toLocaleUpperCase() + key.slice(1).toLocaleLowerCase()}: {editPage ? <DropdownButton currentSelection={currentJob[key]} selections={["Less than 1 month", "1-3 Months", "3-6 Months", "More than 6 Months"]} handleSelectionClick={(selection) => updateJobDetails(prevValue => { return { ...prevValue, [key]: selection } })} /> : currentJob[key]}</span>

                    return <span className={`${editPage ? 'display__Flex' : ''}`}>{key[0].toLocaleUpperCase() + key.slice(1).toLocaleLowerCase()}: {editPage ? <input type={"text"} name={key} value={currentJob[key]} onChange={handleChange} /> : currentJob[key]}</span>
                    
                }))
            }
        </div>
    </>

}

export default JobDetails;
