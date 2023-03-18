function validation(form) {
    var allInputs = Array.prototype.slice.call(form.querySelectorAll("input"));
    var longInput = Array.prototype.slice.call(form.querySelectorAll("textarea"));
    allInputs.push.apply(allInputs, longInput);
    
    function addError(input, text) {
        var parent = input.parentNode;
        var errorLabel = document.createElement("label");
        errorLabel.classList.add("errorLabel");
        errorLabel.textContent = text;
        parent.append(errorLabel);
        input.classList.add("error");
    }

    function removeError(input){
        var parent = input.parentNode;
        if (input.classList.contains("error")) {
            parent.querySelector(".errorLabel").remove();
            input.classList.remove("error");
        }  
    }

    for (const input of allInputs) {
        removeError(input);
        var noNumber = /[0-9]/;
        if (input.value == "") {
            addError(input, "The field is not filled in!");
        } else if (input.value.length > input.dataset.maxLength) {
            addError(input, "Maximum number of characters: " + input.dataset.maxLength);
        } else if (input.value.length < input.dataset.minLength) {
            addError(input, "Minimum number of characters: " + input.dataset.minLength);
        } else if (input.placeholder != "Your Email" && input.placeholder != "Your Message" && noNumber.test(input.value)) {
            addError(input, "Only letters!");
        }
    }
}


document.getElementById("burger-button").addEventListener("click", function() {
    document.getElementById("burger-menu").classList.toggle("open");
    document.addEventListener("scroll", function() {
        document.getElementById("burger-menu").classList.remove("open");
    })
})

document.getElementById("addForm").addEventListener("submit", function(event) {
    event.preventDefault();

    validation(this);
})