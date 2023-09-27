import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
function CountryDetails() {
    var x = useParams();
    var[details,setDetails]=useState(null)
    var {state:details}= useLocation()
    useEffect(()=>{
        axios.get("https://restcountries.com/v3/name/"+x.cname).then((res)=>{
                setDetails({...res.data})
        })
    },[x.cname])
    return(
        <>
        <h1>sdfg</h1>
        {console.log(details)}
        {
            details &&(
                <div className='mybox'>
            <h1>{details.name.common}CountryDetails</h1>
           <div style={{display:'flex',flexWrap:'wrap'}}>
                <div style={{width:'50%',padding:'10px',boxSizing:'border-box'}} >
                    <img width="100%" src={details.flags[0]} alt="" />
                </div>
                <div style={{width:"50%"}}>
                    <h1>{details.name.common}</h1>
                    <h2>Population:{details.population}</h2>
                </div>
           </div>
        </div>
            )
        }
        </>
    )
}

export default CountryDetails