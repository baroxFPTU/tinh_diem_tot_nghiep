import { $_value } from './script.js';
const $ = document.querySelector.bind(document);

function tinhDiemTotNghiep(typeEdu,...scores) {
    let [mathScore,literatureScore,englishScore,combinedScore,...rest] = scores;
    let [encorScore,priorScore,averageYear] = rest;
     let isLiet = true;
     [mathScore,literatureScore,englishScore,combinedScore,$_value('#free-subject')].forEach(
         (score) => {
             if (!isNaN(score) && score<=1){
                 isLiet = false;
             }
         }
     )
     if (!isLiet){
         return 'Chúc bạn may mắn lần sau :('
     } else {
         
         let finalScore = typeEdu ? ((((mathScore+literatureScore+englishScore+combinedScore+encorScore)/4)*7+ averageYear*3)/10)+ priorScore : (((4*(mathScore+literatureScore+$_value('#free-subject'))+ 3*encorScore)/12)*7 + averageYear*3)/10 + priorScore;
         let results;
         if (finalScore>=5){
             results = 'Bạn sẽ đậu tốt nghiệp!! Cố lên. Điểm TN:';
         } else { 
             results = 'Bạn sẽ rớt tốt nghiệp! Cẩn thận. Điểm TN:'
         }
         return isNaN(finalScore) ? 'Có gì đó sai sai rồi nha.' : `${results} ${finalScore.toFixed(2)}`;
     }
 }

export default tinhDiemTotNghiep;