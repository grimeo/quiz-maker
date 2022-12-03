const edit_gui = document.getElementById('edit-gui');
const edit_textarea = document.getElementById('edit-textarea')

const cancel_edit_btn = document.getElementById('cancel-edit-btn')
const save_edit_btn = document.getElementById('save-edit-btn')

const question_container = document.getElementById('question-container');
const question_input = document.getElementById('question-input');
const add_btn = document.getElementById('add-btn');

const multiple_btn = document.getElementById('multiple-btn')
const t_or_f_btn = document.getElementById('t-or-f-btn')
const multiple_choice_selection = document.getElementById('multiple-choice-section')
const t_or_f_selection = document.getElementById('t-or-f-selection')

let number_of_question = 0;

let q_and_a = []

let choice_selection = '';

//=================================================
// let q_and_a = [
//     [q,a1,a2,a3,a4,correctAnswer],
//     [q,a1,a2,correctAnswer],
//     [q,a1,a2,a3,a4,correctAnswer]
//             ]

// getinputs(){
//  fetch all 
//  add_Q_and_A(q,a1,a2,a3,a4,correctAnswer)   
//

// add_Q_and_A(q,a1,a2,a3,a4,correctAnswer){
//   
//   q_and_a.push([q,a1,a2,a3,a4,correctAnswer])
//   print
//   inputs.clear()
//}

//show(){
//    for 1st array
//      for 2nd array
//          if(2nd.len == 6)
//          print q + multiplechoice
//          if(2nd.len == 4)
//          print q + t-or-f
//}
// ==========================================
//  q_and_a.push([q,a1,a2,a3,a4,correctAnswer])
//  q_and_a.push([4,5,6])
//  console.log(q_and_a)

//let q_and_a = []
// let right_answers = [1, 2]
// 1 - q, a1, a2, a3, a4
// 2 - q, t, f
// 3 - q, a1, a2, a3, a4



let addQuestion = () => {
    let new_question_wrapper = document.createElement('div');
    let new_p = document.createElement('p');
    let new_edit_btn = document.createElement('button')
    let new_delete_btn = document.createElement('button')
    let new_question = document.getElementById('question-input');
    let questions_container = document.getElementById('question-container');
    let err_question_input = document.getElementById('err-question-input');

    err_question_input.innerHTML='';
    
    if(/^\s*$/g.test(new_question.value) || new_question.value.indexOf('\n') != -1){
         err_question_input.innerHTML = 'please type your question.'
    } else if(choice_selection==''){
        err_question_input.innerHTML = 'answer cannot be empty.'
    }
    else {
        number_of_question += 1;
        
        new_question_wrapper.setAttribute('class', 'question-container')
        new_question_wrapper.setAttribute('id', 'question-container-'+ number_of_question)
        questions_container.appendChild(new_question_wrapper)

        new_p.innerHTML = new_question.value;
        new_p.setAttribute('class', 'question')
        new_p.setAttribute('id', 'question-'+ number_of_question)
        new_question_wrapper.appendChild(new_p)

        new_edit_btn.innerHTML = 'Edit';
        new_edit_btn.setAttribute('class', 'btn')
        new_edit_btn.setAttribute('id', 'edit-btn-'+ number_of_question)
        new_edit_btn.setAttribute('onclick', 'editQuestion('+number_of_question+')')
        new_question_wrapper.appendChild(new_edit_btn)

        new_delete_btn.innerHTML = 'Delete';
        new_delete_btn.setAttribute('class', 'btn')
        new_delete_btn.setAttribute('id', 'delete-btn-'+ number_of_question)
        new_delete_btn.setAttribute('onclick', 'deleteQuestion('+number_of_question+')')

        //new_delete_btn.setAttribute('onclick', deleteQuestion())
        //new_delete_btn.onclick = function () {deleteQuestion()}
        new_question_wrapper.appendChild(new_delete_btn)
        question_container.appendChild(new_question_wrapper)

        question_input.value = '';  
        choice_selection = '';
    }
}   

let addAnswer = () => {
    
}

//===========edit gui====================
let editQuestion = (n) => {
    edit_gui.style.display = "block"

    let questions = document.getElementById('question-'+n);
    let question_id = document.getElementById('question-to-edit-id')

    edit_textarea.innerHTML = questions.innerHTML;
    question_id.innerHTML = n;
    
    save_edit_btn.setAttribute('onclick', 'saveEditedQuestion('+n+')')
}

let deleteQuestion = (n) => {
    let question = document.getElementById('question-container-'+ n);
    question.remove();
    edit_gui.style.display = "none"
}

let saveEditedQuestion = () => {
    let questionID = document.getElementById('question-to-edit-id')
    let question = document.getElementById('question-'+ questionID.innerHTML);

    question.innerHTML = edit_textarea.value 

    edit_gui.style.display = "none"
}
//============= // edit gui=========================




// ================ q and a generator =======================
let getAllInputs = () => {
    
    let q = docmunent.getElementById('question-input');
    let a1
    let a2 
    let a3 
    let a4
    let mult_correct_ans

    let t = 'True'
    let f = 'False'
    let torf_correct_ans
    if(choice_selection == 'multiple'){
        a1 = document.getElementById('a')
        a2 = document.getElementById('a2')
        a3 = document.getElementById('a3')
        a4 = document.getElementById('a4')
        mult_correct_ans = document.getElementById('mult-correct-ans')

        add_Q_and_A.push([q, a1, a2, a3, a4, mult_correct_ans])
    }
    if(choice_selection == 't-or-f'){
        add_Q_and_A.push([q, 'True', 'False', mult_correct_ans])
    }

}

let show_Q_and_A = () => {
    addQuestion()
}

// ================= //q and a generator =======================

cancel_edit_btn.addEventListener('click', () => {edit_gui.style.display = "none"})
add_btn.addEventListener('click', () => {show_Q_and_A()})


multiple_btn.addEventListener('click',()=>{
    multiple_choice_selection.style.display = 'block'
    t_or_f_selection.style.display = 'none'
    choice_selection = 'multiple'
})
t_or_f_btn.addEventListener('click', ()=>{
    multiple_choice_selection.style.display = 'none'
    t_or_f_selection.style.display = 'block'
    choice_selection = 't-or-f'
})

// enter keypress question input
//question_input.addEventListener('keypress', (e)=>{if(e.key == 'Enter'){addQuestion();}})