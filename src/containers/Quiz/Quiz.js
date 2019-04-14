import React, {Component} from 'react';
import './Quiz.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import Finished from '../../components/Finished/Finished'

class Quiz extends Component {
    
    state={
        results: {}, // { [id]: 'success' 'error' }
        isFinished: false,
        activeQuestion: 0,
        answerState: null, // { [id]: 'success' 'error' }
        quiz: [
            {
				question: 'What is the sky color?',
				correctAnswerId: 1,
                id: 1,
                answers: [
                    {text: 'Blue', id: 1},
					{text: 'Black', id: 2},
					{text: 'White', id: 3},
					{text: 'Red', id: 4}
                ]
            },
            {
				question: 'In which year Minsk was founded?',
				correctAnswerId: 3,
                id: 2,
                answers: [
                    {text: '882 year', id: 1},
					{text: '1136 year', id: 2},
					{text: '1067 year', id: 3},
					{text: '952 year', id: 4}
                ]
            }
        ]
    }
	
	onAnswerClickHandler = (answerId) => {
        
        if(this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if(this.state.answerState[key] === 'success') {
                return
            }
        }
        
        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;
        
        
        
        if(question.correctAnswerId === answerId){ 
            
            if(!results[question.id]){
                results[question.id] = 'success'
            }
            
            this.setState({
                answerState: {[answerId]: 'success'},
                results
            })
            
            const timeout = window.setTimeout(() => {
                
                if(this.isQuizFinished()) {
                    
                    this.setState({
                        isFinished: true
                    })
                    
                } else {
                    
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    });
                    
                }
                
                
                window.clearTimeout(timeout);
            }, 700)
            
            
        } else {
            results[question.id] = 'error';
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            })
        }

	}
    
    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }
    
    render() {
        
        return(
            <div className='Quiz'>
                <div className='QuizWrapper'>
                    <h1>Answer for all questions </h1>
                    {
                        this.state.isFinished
                        ? <Finished 
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onRetry={this.retryHandler}
                            />
                        : <ActiveQuiz 
                            answers={this.state.quiz[this.state.activeQuestion].answers}
                            question={this.state.quiz[this.state.activeQuestion].question}
                            onAnswerClick={this.onAnswerClickHandler}
                            quizLength={this.state.quiz.length}
                            answerNumber={this.state.activeQuestion + 1}
                            state={this.state.answerState}
                          />
                    }
                    
                </div>
            </div>
        )
    }
}

export default Quiz