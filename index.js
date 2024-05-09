let termsList = [];
let currTerm = 0;

// when the page loads, call "init"
window.addEventListener("load", init);


// the function that runs when the page loads;
function init() {

    // hiding things that shouldn't be visible when the page loads
    id("scoringSection").style.display = "none";
    id("resultsSection").style.display = "none";

    id("inputFile").addEventListener("change", fileInputChange);

    // finding scores radio buttons and adding event listeners to them
    let scoresButtons = document.querySelectorAll('input[name=scores]');
    scoresButtons.forEach((e) => e.addEventListener("change", (e) => {selectScore(e)}));
}



function fileInputChange() {
    let fileInput = id("inputFile");
    let fr = new FileReader();
    fr.onload = function () {
        let file_text = fr.result;
        let file_type = fileInput.files[0].type;
        processLexicon(file_text, file_type);
    }
    fr.readAsText(fileInput.files[0]);
}

function processLexicon(text, fileType) {
    termsList = [];
    currTerm = 0;

    if (fileType == "text/csv") {
        termsList = splitLexiconIntoTermsAndScores(text);
    } else {  // fileType = "text/plain"
        termsList = splitPlainTextLexicon(text);
    }

    id("term").textContent = termsList[currTerm];
    id("scoringSection").style.display = "block";
}

function splitLexiconIntoTermsAndScores(text) {
    let termsList = [];
    let lines = text.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let [term, score] = line.split(',');
        if ((score > 5) || (score < -5)) {
            if (!termsList.includes(term)) {
                termsList.push(term);
            }
        }
    }
    return termsList;
}

function splitPlainTextLexicon(text) {
    let termsList = [];
    let lines = text.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let term = lines[i];
        if (!termsList.includes(term)) {
            termsList.push(term);
        }
    }
    return termsList;
}













function selectScore(e) {
    // runs when a score button is selected
    let selectedScore = e.target.id;
    let term = termsList[currTerm];

    let line = term + ", " + selectedScore;
    if (id("resultsSection").style.display == "none") {
        id("resultsSection").style.display = "block"
    }
    appendTextElementToSection('p', id("newlyScoredTerms"), line)
    clearAllRadioButtons();
    displayNextToken();
}

function appendTextElementToSection(element, parentElement, text) {
    let e = gen(element);
    e.textContent = text;
    parentElement.append(e);
}

function clearAllRadioButtons() {
    // need to do this, else the same radio button will remain checked between terms
    let radioButtonList = document.getElementsByName("scores");
    for (let i = 0; i < radioButtonList.length; i++)
        radioButtonList[i].checked = false;
}

function displayNextToken() {
    currTerm = currTerm + 1;
    if (currTerm >= termsList.length) { // if we have reached the end of the termsList
        id("term").textContent = "Congratulations, you've scored all the terms in the file!"
    }
    id("term").textContent = termsList[currTerm];
}

























/**
 * a helper function to make returning an element based on id easier and faster
 * @param {string} idName - the id of the element to be located
 * @returns {Element} with id idName
 */
function id(idName) {
    return document.getElementById(idName);
}

/**
 * a helper function to make creating an element easier and faster
 * @param {string} tagName - the name of the element to create
 * @returns {Element} of type tagName
 */
function gen(tagName) {
    return document.createElement(tagName);
}