import React,{useState , useEffect } from 'react';
import metaData from '../metadata.json'
import { MDBContainer , MDBInput  } from 'mdb-react-ui-kit';
import uuid from 'react-uuid';
// Essentially Components
import Header from '../Components/Header';
import MainchatAndInput from '../Components/chatAndInput';

function Main() {

     
    
    const [FS,setFs] = useState('')
    const [LS,setLs] = useState('')
    const [user,setUser] = useState(JSON.parse(window.localStorage.getItem("user_chat_app")))
    const HANDELFS = (e) => setFs( e.target.value)
    const HANDELLS = (e) => setLs( e.target.value)
    const HANDEL = (e)=>{try{e.preventDefault() ; var data = {"id" : uuid() , "fs" : FS , "ls" : LS}
                        window.localStorage.setItem("user_chat_app",JSON.stringify(data)) ;setUser(data)}
                        catch (error){console.log(error);}  }
                      
                          
      
              
    
      /* WHEN USER IS NOT IDENTIFY */
        if (user) {
         

                 return(
                // I will return the main app since that comment
               

              
                 <div className='main'>
                        <Header/>
                        <MainchatAndInput user={user}  />
                 </div>)

          

  
        
        }

        /* WHEN USER IS IDENIFY */
        else if(! user) {
            return(
               <MDBContainer className=' p-4'>
                <form onSubmit={HANDEL}>
                    <div className='d-flex justify-content-center p-3'>
                    <img src={metaData.main_icon} alt="not Found" width='100px' />
                    </div>
               <MDBInput  onChange={HANDELFS} required value={FS} className='mb-4' type='text' id='form1Example1' label='Your First name' />
               <MDBInput  onChange={HANDELLS} required value={LS} className='mb-4' type='text' id='form1Example2' label='Your Last name' />
               <div className='d-flex justify-content-center'>
               <button className='btn btn-info'> GET STARTED </button>
               </div>
     
                </form>
                   
                 </MDBContainer>
            )
        }
    
}







export default Main