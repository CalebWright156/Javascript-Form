// Questions Array
const questions = [
    { question: 'Enter Your First Name' },
    { question: 'Enter Your Last Name' },
    { question: 'Enter Your Email', pattern: /\S+@\S+\.\S+/ },
    { question: 'Create A Password', type: 'password' }
  ];
  
  // Transition Times
  const shakeTime = 100; // Shake Transition Time
  const switchTime = 200; // Transition Between Questions
  
  // Init Position At First Question
  let position = 0;
  
  // Init DOM Elements
  const formBox = document.querySelector('#form-box');
  const nextBtn = document.querySelector('#next-btn');
  const prevBtn = document.querySelector('#prev-btn');
  const inputGroup = document.querySelector('#input-group');
  const inputField = document.querySelector('#input-field');
  const inputLabel = document.querySelector('#input-label');
  const inputProgress = document.querySelector('#input-progress');
  const progress = document.querySelector('#progress-bar');

  
  
  // EVENTS
  
  // Get Question On DOM Load
  document.addEventListener('DOMContentLoaded', getQuestion);

  // Next Button Click
  nextBtn.addEventListener('click', validate);
  
  // Input Field Enter Click
  inputField.addEventListener('keyup', e => {
    if (e.keyCode == 13) {
      validate();
    }
  });

//   Reset form 
  function formReset(){
    document.querySelector('#container').reset()
  }

  
  // FUNCTIONS
  
  // Get Question From Array & Add To Markup
  function getQuestion() {
    // Get Current Question
    inputLabel.innerHTML = questions[position].question;
    // Get Current Type
    inputField.type = questions[position].type || 'text';
    // Get Current Answer
    inputField.value = questions[position].answer || '';
    // Focus On Element
    inputField.focus();
  
    // Set Progress Bar Width - Variable to the questions length
    progress.style.width = (position * 100) / questions.length + '%';
  
    // Add User Icon OR Back Arrow Depending On Question
    prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';
  
    showQuestion();
  }
  
//   Shaking motion on fail
  function transform(x, y){
    formBox.style.transform = `translate(${x}px, ${y}px)`
  }

  // Display Question To User
  function showQuestion() {
    inputGroup.style.opacity = 1;
    inputProgress.style.transition = '';
    inputProgress.style.width = '100%';
  }
  
//   Hide Question 
function hideQuestion() {
    inputGroup.style.opacity = 0;
    inputLabel.style.marginLeft = 0;
    inputProgress.style.width = 0;
    inputProgress.style.transition = 'none';
    inputGroup.style.border = null;
}

// Validate 
function validate() {
    // Regex pattern match
    if(!inputField.value.match(questions[position].pattern || /.+/)){
        inputFail();
    } else {
        inputPass();
    }
}

// Input field Pass and Fail
function inputFail() {
    formBox.className = 'error';
    // Loop shake motion 
    for(let i = 0; i < 6; i++) {
        setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0)
        setTimeout(transform, shakeTime * 6, 0, 0)
        inputField.focus()
    }
}

function inputPass(){
    formBox.className = '';
    setTimeout(transform, shakeTime * 0, 0, 10)
    setTimeout(transform, shakeTime * 1, 0, 10)

    // Store answer
    questions[position].answer = inputField.value;

    // increment position bar
    position++

    // if new question, hide current and get next
    if(questions[position]){
        hideQuestion()
        getQuestion()
    } else {
        // non questions remain
        hideQuestion();
        formBox.className = 'close';
        progress.style.width = '100%';

        // Form Complete
        formCompleted()
    }
}

// Function on completion of form
function formCompleted() {
    const h1 = document.createElement('h1');
    h1.classList.add('end');
    h1.appendChild(document.createTextNode(`Thanks ${questions[0].answer} You are registered and will get an email sent shortly to ${questions[2].answer}, your password is ${questions[3].answer} - do not share this with anybody`))
    setTimeout(() => {
        formBox.parentElement.appendChild(h1);
        setTimeout(() => {
            h1.style.opacity = 1;
        }, 50)
    }, 1000)

    const restartBtn = document.createElement('h3');
    restartBtn.classList.add('restartButton')
    restartBtn.appendChild(document.createTextNode('Click Here To Restart'))
    setTimeout(() => {
        formBox.parentElement.appendChild(restartBtn)
    }, 3000)

    restartBtn.addEventListener('click', formReset())
    
}