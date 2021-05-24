export default function Validator(options) {
    // define the form need to validate
    var formElm = document.querySelector(options.form);

    if (formElm) {
        options.rules.forEach(function(rule) {
            let inputElm = formElm.querySelector(rule.selector);
               
            if (inputElm) {
                // Start validate when blur out.
                inputElm.onblur = function() {
                 Validator.validate(inputElm,rule,options);
                }

                // Validate when enter value.
                inputElm.oninput = function() {
                    // Reset input when start enter value
                    Validator.reset(options, inputElm);
                    // Prohibit enter the text.
                    inputElm.value = inputElm.value.replace(/[a-z]|[A-Z]/g,'');
                }
            }
        })
    }
}
// Init rules
Validator.isRequired = function(selector) {
    return {
        selector,
        test(value) {
            let regex = /^(1[0]|[0-9])(\.\d+)?$/g;
            let isValid = value.match(regex) && ((+value) <= 10);
            
            // just approve the numder in range [0-10]
            if (value.trim()) {
             return (isValid) ? undefined : 'Điểm số nằm trong khoảng [0-10] thôi nha.'
            } else {
                return 'Bạn chưa nhập điểm nè.'
            }
        }
    };   
}


// the function excute validate
Validator.validate = function(inputElm, rule, options) {
    let errorElm = inputElm.parentElement.querySelector(options.errorSelector);
    let errorMessage = rule.test(inputElm.value);
    
    if (errorMessage) {
        errorElm.innerText = errorMessage;
        inputElm.parentElement.classList.add('invalid');
        return;
    } 
     Validator.reset(options, inputElm);
    
}

// Reset the form.
Validator.reset = function(options = options, inputElm = inputElm) {
    let errorElm = inputElm.parentElement.querySelector(options.errorSelector);

    errorElm.innerText = '';
    inputElm.parentElement.classList.remove('invalid');
}
