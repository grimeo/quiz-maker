const edit_gui = document.getElementById('edit-gui');
const edit_textarea = document.getElementById('edit-textarea')

const cancel_edit_btn = document.getElementById('cancel-edit-btn')
const save_edit_btn = document.getElementById('save-edit-btn')

const question_container = document.getElementById('question-container');
const question_input = document.getElementById('question-input');
const add_btn = document.getElementById('add-btn');

let number_of_question = 0;

var q_and_a = []

let addQuestionAndChoices = () => {
    let questions_container = document.getElementById('questions-container');

    let new_question_wrapper = document.createElement('div');

    let new_p = document.createElement('p');

    let new_question = document.getElementById('question-input');
    let question_container = document.getElementById('question-container')
    let err_question_input = document.getElementById('err-question-input');

    let new_choices_container = document.createElement('div')

    let new_edit_btn = document.createElement('button')
    let new_delete_btn = document.createElement('button')

    err_question_input.innerHTML='';
    // temporary condition for buggy enter 
    if(/^\s*$/g.test(new_question.value) || new_question.value.indexOf('\n') != -1){
         err_question_input.innerHTML = 'please type your question.'
         err_question_input.style.display = 'none'
         err_question_input.style.display = 'block'
    } 
    else if(
        (document.getElementById('a1').value=='' || document.getElementById('a1').value==null)||
        (document.getElementById('a2').value=='' || document.getElementById('a2').value==null)||
        (document.getElementById('a3').value=='' || document.getElementById('a3').value==null)||
        (document.getElementById('a4').value=='' || document.getElementById('a4').value==null)||
        (document.getElementById('mult-correct-ans').value=='' || document.getElementById('mult-correct-ans').value==null)
        ){
        err_question_input.innerHTML = 'Please complete the answer field'
        err_question_input.style.display = 'none'
        err_question_input.style.display = 'block'
    }
    else {
        number_of_question += 1;
        // put to array the question and answer
        getAllInputs()
        
        new_question_wrapper.setAttribute('class', 'question-container')
        new_question_wrapper.setAttribute('id', 'question-container-'+ number_of_question)
        questions_container.appendChild(new_question_wrapper)

        new_p.innerHTML = q_and_a[number_of_question-1][0];
        new_p.setAttribute('class', 'question')
        new_p.setAttribute('id', 'question-'+ number_of_question)
        new_question_wrapper.appendChild(new_p)

        new_choices_container.setAttribute('class', 'choices-container')
        new_choices_container.setAttribute('id','choices-container-'+number_of_question)
        new_question_wrapper.appendChild(new_choices_container)

        //console.log(q_and_a[number_of_question-1].length)
        if(q_and_a[number_of_question-1].length == 6){

            for(let i = 0; i < 4; i++){
                let choice = document.createElement('div')
                choice.setAttribute('class', 'choices')
                choice.setAttribute('id', 'choice-'+ number_of_question + '-' + (i+1))
                choice.innerHTML = q_and_a [number_of_question-1][i+1]
                new_choices_container.appendChild(choice)
                new_question_wrapper.appendChild(new_choices_container)
            }
        }

        new_edit_btn.innerHTML = 'Edit';
        new_edit_btn.setAttribute('class', 'edit-btn')
        new_edit_btn.setAttribute('id', 'edit-btn-'+ number_of_question)
        new_edit_btn.setAttribute('onclick', 'editQuestion('+number_of_question+')')
        new_question_wrapper.appendChild(new_edit_btn)

        new_delete_btn.innerHTML = 'Delete';
        new_delete_btn.setAttribute('class', 'del-btn')
        new_delete_btn.setAttribute('id', 'delete-btn-'+ number_of_question)
        new_delete_btn.setAttribute('onclick', 'deleteQuestion('+number_of_question+')')

        //new_delete_btn.setAttribute('onclick', deleteQuestion())
        //new_delete_btn.onclick = function () {deleteQuestion()}
        new_question_wrapper.appendChild(new_delete_btn)

// ============= clear() ================
        question_input.value = '';  

        document.getElementById('a1').value = ''
        document.getElementById('a2').value = ''
        document.getElementById('a3').value = ''
        document.getElementById('a4').value = ''
        document.getElementById('mult-correct-ans').value = ''

// ============= /clear() ================
err_question_input.style.display = 'none'
    }
}   

//===========edit gui====================
let editQuestion = (n) => {

    let mult_a1 = document.getElementById('edit-a1')
    let mult_a2 = document.getElementById('edit-a2')
    let mult_a3 = document.getElementById('edit-a3')
    let mult_a4 = document.getElementById('edit-a4')
    let mult_right_ans = document.getElementById('edit-mult-correct-ans')

    edit_gui.style.display = "block"

    //multo nanaman 
    //mult_a1.value = q_and_a[n-1][1];
    //console.log(q_and_a[n-1].length);
    console.log(q_and_a[n-1].length)
    if(q_and_a[n-1].length == 6){
        mult_a1.value = q_and_a[n-1][1];
        mult_a2.value = q_and_a[n-1][2];
        mult_a3.value = q_and_a[n-1][3];
        mult_a4.value = q_and_a[n-1][4];
        mult_right_ans.value = q_and_a[n-1][5]
    }

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

    // ========== clearing operation sa edit window ==========
    q_and_a[n-1] = 'deleted'
    mult_a1.value =''
    mult_a2.value = ''
    mult_a3.value = ''
    mult_a4.value = ''
    mult_right_ans.value = ''
}

let saveEditedQuestion = () => {
    let questionID = document.getElementById('question-to-edit-id')
    let question = document.getElementById('question-'+ questionID.innerHTML);

    let mult_a1 = document.getElementById('edit-a1')
    let mult_a2 = document.getElementById('edit-a2')
    let mult_a3 = document.getElementById('edit-a3')
    let mult_a4 = document.getElementById('edit-a4')
    let mult_right_ans = document.getElementById('edit-mult-correct-ans')

    let newchoice1 = document.getElementById('choice-'+questionID.innerHTML+'-1')
    let newchoice2 = document.getElementById('choice-'+questionID.innerHTML+'-2')
    let newchoice3 = document.getElementById('choice-'+questionID.innerHTML+'-3')
    let newchoice4 = document.getElementById('choice-'+questionID.innerHTML+'-4')

    q_and_a[parseInt(questionID.innerHTML) - 1][0] = edit_textarea.value
    q_and_a[parseInt(questionID.innerHTML) - 1][1] = mult_a1.value
    q_and_a[parseInt(questionID.innerHTML) - 1][2] = mult_a2.value
    q_and_a[parseInt(questionID.innerHTML) - 1][3] = mult_a3.value
    q_and_a[parseInt(questionID.innerHTML) - 1][4] = mult_a4.value
    q_and_a[parseInt(questionID.innerHTML) - 1][5] = mult_right_ans.value
    
    question.innerHTML = q_and_a[parseInt(questionID.innerHTML) - 1][0]
    newchoice1.innerHTML = q_and_a[parseInt(questionID.innerHTML) - 1][1]
    newchoice2.innerHTML = q_and_a[parseInt(questionID.innerHTML) - 1][2]
    newchoice3.innerHTML = q_and_a[parseInt(questionID.innerHTML) - 1][3]
    newchoice4.innerHTML = q_and_a[parseInt(questionID.innerHTML) - 1][4]

    edit_gui.style.display = "none"

    // ========== clearing operation sa edit window ==========
    mult_a1.value =''
    mult_a2.value = ''
    mult_a3.value = ''
    mult_a4.value = ''
    mult_right_ans.value = ''
}
//============= // edit gui=========================


// ================ q and a generator =======================
let getAllInputs = () => {
    
    let q = document.getElementById('question-input').value;
    let a1
    let a2 
    let a3 
    let a4
    let mult_correct_ans

        a1 = document.getElementById('a1').value
        a2 = document.getElementById('a2').value
        a3 = document.getElementById('a3').value
        a4 = document.getElementById('a4').value
        mult_correct_ans = document.getElementById('mult-correct-ans').value

        q_and_a.push([q, a1, a2, a3, a4, mult_correct_ans])

    console.log(q_and_a)
}

let show_Q_and_A = () => {
    addQuestionAndChoices()
}

// ================= //q and a generator =======================

cancel_edit_btn.addEventListener('click', () => {edit_gui.style.display = "none"})
add_btn.addEventListener('click', () => {show_Q_and_A()})


// enter keypress question input
//question_input.addEventListener('keypress', (e)=>{if(e.key == 'Enter'){addQuestion();}})