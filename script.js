const isValidEmail = (email) => {
    const regexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexp.test(email);
}

const validateRequest = ( input )=>{
    const item = input.closest('.item');
    const req = item.querySelector('.required');

    if(input.value==''){
        req.classList.add('error');
        return false;
    }

    req.classList.remove('error');
    return true;
}

const validateEmail = ( input )=>{
    const item = input.closest('.item');
    const invalid = item.querySelector('.invalid');
    if(!isValidEmail(input.value)){
            invalid.classList.add('error')
            return false;
    }

    invalid.classList.remove('error');
    return true;
}

const validateInput = (input)=>{
    let valid = true;
    const type=input.getAttribute('type');
    valid=validateRequest(input, type=='checkbox' || type=='radio');

    if(type == 'email' && input.value!=='')
        valid=validateEmail(input);

    return valid;
}
const validateRadios = (radios)=>{
    const item = radios[0].closest('.item');
    const req = item.querySelector('.required');
    let checked = false;
    radios.forEach((radio)=>{
        if(radio.checked)
            checked=true;
    });
    
    if(!checked){
        req.classList.add('error')
        return false;
    }   

    req.classList.remove('error');
    return true;
}

const isValidForm = () => {
    let valid = true;
    let inputs = form.querySelectorAll('.input');
    inputs.forEach((input)=>{
        if(!validateInput(input))
            valid=false;
    });
    const textarea = form.querySelector('textarea');
    if(!validateInput(textarea))
        valid=false;

    const radios = form.querySelectorAll('input[type="radio"]');
    if(!validateRadios(radios))
        valid=false;

    const checkbox = form.querySelectorAll('input[type="checkbox"]')
    if(!validateRadios(checkbox))
        valid=false;

    return valid;
}
const cleanForm = (form) => {
    const inputs = form.querySelectorAll('input');
    inputs.forEach((input)=>{
        const type = input.getAttribute('type');
        if(type == 'text' || type == "email")
            input.value='';
        else if(type == 'checkbox' || type == 'radio')
            input.checked = false;        
    });
    const textarea = form.querySelector('textarea');
    textarea.value='';

}
const showMessage = () => {
    const toast = document.querySelector('.toast');
    toast.classList.add('show');
    cleanForm(form);
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}
const form = document.querySelector('.form');
form.addEventListener('submit',(e)=>{
    e.preventDefault();

    if(isValidForm(form))
        showMessage();
  
});