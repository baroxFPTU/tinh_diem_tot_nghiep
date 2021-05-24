import darkMode, {btnCheckbox} from './dark-mode.js'
import tinhDiemTotNghiep from './compute-score.js'
import Validator from './validator.js'

const selectElms = document.getElementsByTagName('option');
const $ = document.querySelector.bind(document);
const typeEdu = $('#type_edu');
let isNT;

//Events
btnCheckbox.addEventListener('change', darkMode);

typeEdu.onchange = function() {
    let arrayElements = [$('#english'),$('#combine_tn'),$('#combine_xh')];
    let isTHPT = typeEdu.value === '1' ? true : false;

    resetInput();

    if (!isTHPT){    
        $('#free-subject').parentElement.style.display = 'flex';
        arrayElements.forEach((element) => {element.parentElement.style.display = 'none'});
    } else {
        $('#free-subject').parentElement.style.display = 'none';
        arrayElements.forEach((element) => {element.parentElement.style.display = 'flex'});
    }
}

$('.btn__score').onclick = function() {

    let mathScore = $_value('#math'),
        literatureScore = $_value('#literature'),
        englishScore = $_value('#english'),
        combinedScore= (isNT) ? $_value('#combine_tn') : $_value('#combine_xh'),
        averageYear = $_value('#average_year'),
        encorScore = $_value('#encor_score'),
        priorScore = $_value('#prior_score'),
        arrayScores = [mathScore,literatureScore,englishScore,combinedScore,encorScore,priorScore,averageYear],
        isTHPT = typeEdu.value === '1' ? true : false,
        score = tinhDiemTotNghiep(isTHPT,...arrayScores);
        console.log(combinedScore)
        showResults(score);
}



$('#combine_tn').addEventListener('input', function() {
    if ($('#combine_tn').value) {
        $('#combine_xh').setAttribute('disabled','');
        $('#combine_xh').parentElement.classList.add('op-3');
        resetValidateInput('#combine_xh');
        isNT = true;
    } else {
        $('#combine_xh').removeAttribute('disabled');
        $('#combine_xh').parentElement.classList.remove('op-3');
        isNT = undefined;
    }
   
});

$('#combine_xh').addEventListener('input', function() {
    if ($('#combine_xh').value) {
        $('#combine_tn').setAttribute('disabled','');
        $('#combine_tn').parentElement.classList.add('op-3');
        resetValidateInput('#combine_tn');
        isNT = false;
    } else {
        $('#combine_tn').removeAttribute('disabled');
        $('#combine_tn').parentElement.classList.remove('op-3');
        isNT = undefined;
    }
   
});

$('#close').onclick = function() {
    closeResultsBox();
}

$('.overlay').onclick = function() {
    closeResultsBox();
}

//Auto get value from option and inner in HTML
Array.from(selectElms).forEach((selectElm) => {
    if (selectElm.innerHTML ===""){
        selectElm.innerHTML = selectElm.value;
    }
})

// Validation
Validator({
    form: '#form',
    errorSelector: '.form-message',
    rules: [
        Validator.isRequired('#math'),
        Validator.isRequired('#literature'),
        Validator.isRequired('#free-subject'),
        Validator.isRequired('#english'),
        Validator.isRequired('#combine_tn'),
        Validator.isRequired('#combine_xh'),
        Validator.isRequired('#average_year')
    ]
});


//Functions
export function $_value(value){
    let valueDocument = $(value);
    return parseFloat(valueDocument.value.replace(',','.'));
}

function showResults(text){
    $('.results-box').classList.add('active');
    $('.overlay').classList.add('active');
    $('body').classList.add('not-overflow');
    $('#results').innerHTML = text;
}

function closeResultsBox(){
    $('.results-box').classList.remove('active');
    $('.overlay').classList.remove('active');
    $('body').classList.remove('not-overflow');
}

function resetInput(){
const inputScores = document.querySelectorAll('.input__score input'),
      selectElms = document.querySelectorAll('select[name="extra_score"]');

    inputScores.forEach((input) => input.value="");
    selectElms.forEach((select) => select.selectedIndex = 0);
}

function resetValidateInput(selector) {
    let parentElement = $(selector).parentElement;

    if (parentElement.classList.contains('invalid')){  
        parentElement.classList.remove('invalid');

       
        parentElement.querySelector('.form-message').innerHTML = '';
    }
}