# Token Scoring Tool

This repository contains a web-based tool for building and refining custom sentiment analysis lexicons. It provides a user-friendly interface for scoring words on a scale from -5 (Extremely Negative) to +5 (Extremely Positive).

## Live Tool
You can access the live version of the tool here: **[Token Scoring Tool](https://hannah627.github.io/token-scoring-tool/)**

## Features
*   **File Upload**: Accepts `.txt` files with a list of terms (one per line) or `.csv` files with terms and scores (`term,score`).
*   **Intuitive Scoring**: Presents one term at a time with descriptive radio buttons for scoring (e.g., "Slightly Negative", "Very Positive").
*   **Lexicon Refinement**: When a `.csv` lexicon is uploaded, the tool automatically identifies and queues up any terms with scores outside the valid -5 to 5 range for re-scoring.
*   **Real-time Results**: A list of newly scored terms is generated in real-time in the `term,score` CSV format.
*   **Client-Side Processing**: All operations are handled in the browser using JavaScript. No data is sent to a server.

## How to Use
1.  **Navigate to the Tool**: Open the [Token Scoring Tool](https://hannah627.github.io/token-scoring-tool/) in your web browser.
2.  **Upload Your File**: In the "Inputs" section, click "Choose File" and select your sentiment lexicon (`.csv`) or a plain list of words (`.txt`).
    *   If you don't have a list of words, you can generate one using the [Word Extraction Tool](https://hannah627.github.io/word-extraction-tool/).
3.  **Score Terms**:
    *   The first term to be scored will appear in the "Scoring" section.
    *   Select the radio button that best describes the emotional valence of the word.
4.  **View and Collect Results**:
    *   As you score each term, it will be added to the "Results" section in the format `term,score`.
    *   The next term to be scored will appear automatically.
5.  **Save Your Work**: Once all terms have been scored, copy the entire list from the "Results" section and paste it into a new or existing `.csv` file.