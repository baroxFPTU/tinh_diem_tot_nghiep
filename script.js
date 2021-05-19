import darkMode, {btnCheckbox} from './dark-mode.js'
import tinhDiemTotNghiep from './compute-score.js'

const selectElms = document.getElementsByTagName('option');
const $ = document.querySelector.bind(document);
const typeEdu = $('#type_edu');

//Events
btnCheckbox.addEventListener('change', darkMode);

typeEdu.onchange = function() {
    let arrayElements = [$('#english'),$('#combine_tn'),$('#combine_xh')];
    let isTHPT = typeEdu.value === '1' ? true : false;
    
    if (!isTHPT){
        resetInput();
        $('#free-subject').parentElement.style.display = 'flex';
        arrayElements.forEach((element) => {element.parentElement.style.display = 'none'});
    } else {
        resetInput();
        $('#free-subject').parentElement.style.display = 'none';
        arrayElements.forEach((element) => {element.parentElement.style.display = 'flex'});
    }
}

$('.btn__score').onclick = function() {
let mathScore = $_value('#math'),
    literatureScore = $_value('#literature'),
    englishScore = $_value('#english'),
    combinedScore= true ? $_value('#combine_tn') : $_value('#combine_xh'),
    averageYear = $_value('#average_year'),
    encorScore = $_value('#encor_score'),
    priorScore = $_value('#prior_score'),
    arrayScores = [mathScore,literatureScore,englishScore,combinedScore,encorScore,priorScore,averageYear],
    isTHPT = typeEdu.value === '1' ? true : false,
    score = tinhDiemTotNghiep(isTHPT,...arrayScores);
    
    showResults(score);
}

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

//Functions
function $_value(value){
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