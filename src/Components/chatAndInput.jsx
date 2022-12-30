import React , {useState , useEffect} from 'react';
import { MDBInputGroup , MDBInput , MDBIcon } from 'mdb-react-ui-kit';
import metaData from '../metadata.json'
import user from './user';
import Toast from './aleart'
import { io } from 'socket.io-client';
var socket
var username = user.fs + ' ' + user.ls

/* -----------------------  MAIN CHAT AND INCLUDE THE INPUT ------------------------------*/

/* 
   this technically does accept a one argument for detect who send the msg

   and render the right component
*/

 function Msgcontainer (props) {
   

    if (props.who === username) {
        return(
            <div className='bg-info just-me'>
                <p className='msg-of-me'>{props.msg}</p>
            </div>
        )
    }else if (props.who!== username && props.who !== undefined){
        return(
            <div className='bg-waite not-me'>
                <p>{props.who}</p>
                <div className='msg-of-not-me'>
                {props.msg}
                </div>
            </div>
        )
    }
}


/* ------------------------------------- MAIN --------------------------------------*/

function MainchatAndInput(props) {
    

    const [Msg,setMsg] = useState([])
    const [text,setText] = useState('')
    
    /* IT IS TIME  TO CONNECT TO SOCKET AND MANGE THE JOIN CHAT BELOW */

    useEffect(()=>{
         socket = io(metaData['socket.io'])
        socket.emit("imhere",user)
        socket.on("user-join",(e)=>{
            var userjoin = e.fs + ' ' + e.ls
            Toast.userJoin.fire({title:`${userjoin} join chat` , icon:"success"})
        })
    },[])

    
    
     /* PRIOR ACCESS TO MSG WE HAVE CONTROL THE INPUT UI */
    const HANDELINPUT = (e)=>{
        try{
            setText(e.target.value)
        }catch(error){
            console.log(error);
        }
    }
    /* HANDEL THE FORM BY PREVEND THE ACCIDENTAL LEAD ALSO SEND THE MSG IN THE SOCKET */

    const HANDELFORM =(e)=>{
        try{
            e.preventDefault()
            var ALLOFTHEM = Msg 
            ALLOFTHEM.push({who:username , msg : text})
            setMsg([...ALLOFTHEM])
            console.log(Msg);
            /* IN THIS ACTION I SEND THE IN SOCKET WHEN USER SUBMIT FORM */
            socket.emit("send",{who:username,msg:text})
            setText('')
        }catch(error){
            console.log(error);
        }
    }

    

    /* SECTION OF RECEPTION THE MESSAGES  */
   
        setTimeout(()=>{
            console.log("From time");
            try{
                socket.on("user-sended",(e)=>{
                     
                        var ALLOFTHEM = Msg 
                        ALLOFTHEM.push({who:e.who , msg : e.msg})
                        setMsg([...ALLOFTHEM])
                    
                   
                })
            }catch (error){
                  console.log(error);
            }
        },1000)
   
   


  


    return(
       <>
    
       <div className='Mainchat'>
           {Msg.map((e)=> <Msgcontainer who={e.who} msg={e.msg} /> )}
        </div>
       

        <div className='Inputmsg'>
            <div className='iconDiv'><span className='emojiInput'>😀</span></div>
            <div className='inputDiv'>
                <form onSubmit={HANDELFORM} >
                 <MDBInputGroup>
                    <MDBInput required onChange={HANDELINPUT} value={text} type='text' label="Tap Your Message"   />
                    <button className='btn btn-info'><MDBIcon size='1x' fas icon="arrow-circle-right" /></button>
                 </MDBInputGroup>
                </form>
            </div>
        </div>
       </>
       


    )
}



export default MainchatAndInput



