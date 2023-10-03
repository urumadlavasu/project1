import React, { useState } from 'react'
import { useFormik} from "formik"
import *as Yup from 'yup'
import axios from 'axios'
function Studentform() {
 var[students,setStudents] =React.useState([])
 var studentform=useFormik({
    initialValues:{
      firstname:'',
      lastname:'',
      gender:'',
      age:'',
      password:'',
      username:'',
    },
    validationSchema:Yup.object({
      // firstname:Yup.string().required("firstname iyyalsinde").min(2,"konchem raii"),
      // lastname:Yup.string().required("lastname iyyalsinde"),
      // password:Yup.string().required("password ivvalsinde").matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,'password tappu manchiga rai')
      // age:Yup.string().required("neeku pelli vadda").test({
      //    name:'GenderBasedAgeValidation',
      //    message:'neeku inka age rale',
      //    test:(value,a)=>{
      //     console.log(a.parent)
      //          if(a.parent.gender==='male' && value<21){
      //              return false
      //          }
      //          if(a.parent.gender==='female' && value<18){
      //           return false
      //       }
      //       return true;
      //   }
      // })
      username:Yup.string().required("please enter your username").test({
        name:'check username asynchronous',
        message:"Already undi",
        test:(async(value,a)=>{
          var res = await axios.get(`https://jsonplaceholder.typicode.com/users?username=${value}`);
         if(res.data.length!==0){
          return a.createError({message:'User hain..alag try kar'})
         }
         else{
              return true
         }

          //  var p = new Promise((resolve,reject)=>{
          //         axios.get(`https://jsonplaceholder.typicode.com/users?username=${value}`)
          //         .then((res)=>{
          //           if(res.data.length!==0){
          //               reject(a.createError({message:"this user is already exist"}))
          //           }
          //           else{
          //               resolve(true)
          //           }
          //         })
          //       })
          //  return p;
        })
      })
    }),
   onSubmit:(values)=>{
    console.log(values)
     setStudents([...students,values])
   }
 })
  return (
    
    <div style={{border:"1px solid",padding:"10px",margin:"10px"}}>
       {/* {console.log(studentform.touched)} */}
              <h1>Studentform</h1>
              <form onSubmit={studentform.handleSubmit}>
                    <input placeholder='firstname' type="text" name="firstname" onBlur={studentform.handleBlur} onChange={studentform.handleChange} />
                          <div>
                            <b>{studentform.touched.firstname && studentform.errors.firstname}</b>
                          </div> 
                    <br />
                    <input placeholder='lastname' type="text" name="lastname" onBlur={studentform.handleBlur} onChange={studentform.handleChange} />
                        <div>
                          <b>{studentform.touched.lastname && studentform.errors.lastname}</b>
                        </div>
                    <br />
                    <input type="radio" name="gender" value='male' onBlur={studentform.handleBlur} onChange={studentform.handleChange}/>:Male
                    <input type="radio" name="gender" value='female' onBlur={studentform.handleBlur} onChange={studentform.handleChange}/>:female
                    <br />
                    <input placeholder='age' type="text" name="age" onChange={studentform.handleChange} />
                    <br />
                          <div>
                            <b>{studentform.touched.age && studentform.errors.age}</b>
                          </div>
                    <br />
                    <input placeholder='username' type="text" name='username' onBlur={studentform.handleBlur} onChange={studentform.handleChange} />
                    <div>
                       <b>{studentform.touched.username && studentform.errors.username}</b>
                    </div>
                    <br />
                    <input placeholder='password' type="text" name='password' onBlur={studentform.handleBlur} onChange={studentform.handleChange} />
                    <div>
                       <b>{studentform.touched.password && studentform.errors.password}</b>
                    </div>
                    <br />
                    <button>Add Student</button>
              </form>
              <hr />
              <ul style={{display:"flex",flexWrap:"wrap"}}>
                  {
                    students.map((student)=>{
                          return (
                            <li style={{border:'1px solid grey',width:"100px",padding:"10px",margin:'10px',listStyle:'none'}}>
                              <h3>{student.firstname}</h3>
                              <h3>{student.lastname}</h3>
                              <h3>{student.age}</h3>
                            
                            </li>
                          )
                    })
                  }
            </ul>
    </div>
  )
}

export default Studentform