import React from 'react';
import './Finished.css';
import Button from '../UI/Button/Button'

const Finished = props => {
    
    const successCount = Object.keys(props.results).reduce((total, key) => {
        if(props.results[key] === 'success'){
           total++;
        } 
        
        return total;
        
    }, 0)
    
    return(
        <div className='Finished'>
            <ul>
            {props.quiz.map((quizItem, index) => {
                    
                    const classes = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        props.results[quizItem.id] === 'error' ? 'error' : 'success',
                    ]
                    
                    return(
                        <li
                          key={index}  
                        >
                           <strong> {index + 1} </strong>.&nbsp;
                           {quizItem.question}
                           <i className={classes.join(' ')}/>
                        </li>
                    )
                    
                })}

            </ul>
            
            <p>Correct answers {successCount} / {props.quiz.length} </p>
            
            <div>
                <Button onClick={props.onRetry} type='primary'>Retry</Button>
                <Button onClick={props.onRetry} type='success'>Go to tests list</Button>
            </div>
        </div>
    )
}

export default Finished;