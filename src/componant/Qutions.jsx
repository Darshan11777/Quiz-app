// import React from 'react'
// import  '../index.css'
import {decode} from 'html-entities';
export default function Qutions(props) {
    
    let selectOptions=props.options.map((option,index)=>{
        
return <div className="optionsbtn" key={index}>
<button  className={`answer-btn  
 ${!props.result ? "hover" : ""}  
${!props.result && props.selectedAns===option && "selected"}  
${props.result && props.correct===option && "correct"} 
${props.result && props.selectedAns===option && props.correct!==option && "incorrect"} 
${props.result && option!==props.correct && "dimmed"  }
`}



 onClick={()=>props.selectOption(props.question,option)}
disabled={props.result} 
 >
    {decode(option)}
</button>

</div>
    })
   
  return (
    <div className="question-container">
      <h3 className='quetion'>
        {decode(props.question)}</h3>

        <div className="answers-btn-container">
            {selectOptions}
        </div>
    </div>
  )
}


