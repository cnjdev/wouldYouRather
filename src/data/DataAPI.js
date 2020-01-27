import {
    _getUsers,
    _getQuestions,
    _saveUser,
    _saveQuestion,
    _saveQuestionAnswer,
} from './_DATA.js'
  
export function getInitialData () {
    return Promise.all([
        _getUsers(),
        _getQuestions(),
    ]).then(([users, questions]) => ({
        users,
        questions,
    }))
}

export function saveUser(info){
    return _saveUser(info)
}

export function saveQuestion(info){
    return _saveQuestion(info)
}

export function saveAnswer(info){
    return _saveQuestionAnswer(info)
}