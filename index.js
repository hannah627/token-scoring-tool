let currTokensList
let currToken = 0;

let tokensToAddToStopWords = [];
let tokensToAddToLexicon = [];

let globalLexiconWords = [];
let globalStopWords = [];

let numLexiconFilesProcessed = 0;


// when the page loads, call "init"
window.addEventListener("load", init);


// the function that runs when the page loads;
function init() {

    // hiding things that shouldn't be visible when the page loads
    id("scoringSection").style.display = "none";
    id("listsSection").style.display = "none";

    // adding general event listeners (options section button, main text input)
    id("addButton").addEventListener("click", addButtonClick);
    id("ignoreButton").addEventListener("click", ignoreButtonClick);

    id("inputTextFile").addEventListener("change", textFileInputted);

}

function addButtonClick() {
    // add to lexicon
    let token = currTokensList[currToken];
    tokensToAddToLexicon.push(token);
    let line = token + ",6"
    if (id("listsSection").style.display == "none") {
        id("listsSection").style.display = "flex"
    }
    appendTextElementToSection('p', id("newLexiconTokens"), line)

    displayNextToken();
}

function ignoreButtonClick() {
    // add to stopwords list
    let token = currTokensList[currToken];
    globalStopWords.push(token);
    tokensToAddToStopWords.push(token);
    // this section is hidden until at least one word is added to one of the sections
    if (id("listsSection").style.display == "none") {
        id("listsSection").style.display = "flex"
    }
    appendTextElementToSection('p', id("newStopWords"), token);

    displayNextToken();
}

function displayNextToken() {
    currToken = currToken + 1;
    id("token").textContent = currTokensList[currToken];
}








async function textFileInputted() {
    id("scoringSection").style.display = "flex"; // unhide the buttons

    await getLexiconFiles();
    await getStopWordsFiles();
    processInputtedTextFile();

}



function processInputtedTextFile() {
    let fileInput = id("inputTextFile");
    let fr = new FileReader();
    fr.onload = function () {
        let file_text = fr.result;
        processText(file_text);
    }
    fr.readAsText(fileInput.files[0]);
}





async function getLexiconFiles() {
    globalLexiconWords = [];
    let fileInput = id("inputLexiconFile");
    let files = fileInput.files;
    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        let fr = new FileReader();
        fr.onload = function () {
            let file_content = fr.result;
            processLexicon(file_content);
            // checkIfAllLexiconsLoaded(files.length); // if i decide that i need to do things only after all lexicons loaded
        };
        fr.readAsText(file);
    }
}

async function processLexicon(fileContent) {
    let lines = fileContent.split('\n');
    let columns = [];
    lines.forEach(line => {
        columns = line.split(',');
        let token = columns[0];
        globalLexiconWords.push(token);
    });
}




async function getStopWordsFiles() {
    globalStopWords = [];
    let fileInput = id("inputStopwordsFile");
    let files = fileInput.files;
    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        let fr = new FileReader();
        fr.onload = function () {
            let file_content = fr.result;
            processStopWords(file_content);
        };
        fr.readAsText(file);
    }
}

function processStopWords(fileContent) {
    let lines = fileContent.split('\n');
    for (let i = 0; i < lines.length; i++) {
        globalStopWords.push(lines[i]);
        // now that all functions are being called by textFileInputted, could probably replace global vars w/ params
    }
}

























function appendTextElementToSection(element, parentElement, text) {
    let e = gen(element);
    e.textContent = text;
    parentElement.append(e);
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