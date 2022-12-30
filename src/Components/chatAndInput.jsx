import React , {useState , useEffect , useRef} from 'react';
import { MDBInputGroup , MDBInput , MDBIcon } from 'mdb-react-ui-kit';
import metaData from '../metadata.json'
import Toast from './aleart'
import { io } from 'socket.io-client';
import $ from 'jquery'
var socket
var username 
/* -----------------------  MAIN CHAT AND INCLUDE THE INPUT ------------------------------*/

/* 
   this technically does accept a one argument for detect who send the msg

   and render the right component
*/

function Vibe (){
    setTimeout(()=>{
        var main =  document.querySelector("#root > div > div.Mainchat")
        main.scrollTo(0,main.scrollHeight)
    },100)
}

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
    const input = useRef()

    /* IT IS TIME  TO CONNECT TO SOCKET AND MANGE THE JOIN CHAT BELOW */

    useEffect(()=>{
        username = props.user.fs + ' ' + props.user.ls
         socket = io(metaData['socket.io'])
        socket.emit("imhere",props.user)
        socket.on("user-join",(e)=>{
            var userjoin = e.fs + ' ' + e.ls
            Toast.userJoin.fire({title:`${userjoin} join chat` , icon:"success"})
        })
        socket.on("typing",()=>{
             $("div#typing").show()
             Vibe()
        })
        socket.on("distyping",()=>{
            $("div#typing").hide()
        })
    },[])

    
    
    /* HANDEL THE FORM BY PREVEND THE ACCIDENTAL LEAD ALSO SEND THE MSG IN THE SOCKET */

    const HANDELFORM =(e)=>{
        try{
            e.preventDefault()
            $("div#typing").hide()
            var text = input.current.value
            var ALLOFTHEM = Msg 
            ALLOFTHEM.push({who:username , msg : text})
            setMsg([...ALLOFTHEM])
            Vibe()
            console.log(Msg);
            /* IN THIS ACTION I SEND THE IN SOCKET WHEN USER SUBMIT FORM */
            socket.emit("send",{who:username,msg:text})
            input.current.value = ''
        }catch(error){
            console.log(error);
        }
    }


    /* SECTION OF RECEPTION THE MESSAGES  */
        
        setTimeout(()=>{
            try{
              
                socket.on("user-sended",(e)=>{
                        $("div#typing").hide()
                        var ALLOFTHEM = Msg 
                        ALLOFTHEM.push({who:e.who , msg : e.msg})
                        setMsg([...ALLOFTHEM])
                        Vibe()
                   
                })
            }catch (error){
                  console.log(error);
            }
        },1000)

        const TYPING = ()=>{
            socket.emit("typing")
        }

        const DISTYPING = ()=>{
            socket.emit("distyping")
        }
   
   


  


    return(
       <>
    
       <div className='Mainchat'>
           {Msg.map((e)=> <Msgcontainer who={e.who} msg={e.msg} /> )}
          
           <div id='typing' style={{display:"none"}}  class="loader">Loading...</div>
          
        </div>
       

        <div className='Inputmsg'>
            <div className='iconDiv'><span className='emojiInput'>😀</span></div>
            <div className='inputDiv'>
                <form onSubmit={HANDELFORM} >
                 <MDBInputGroup>
                    <MDBInput onBlur={DISTYPING} onChange={TYPING} required ref={input} type='text' label="Tap Your Message"   />
                    <button className='btn btn-info'><MDBIcon size='1x' fas icon="arrow-circle-right" /></button>
                 </MDBInputGroup>
                </form>
            </div>
        </div>
       </>
       


    )
}



export default MainchatAndInput



