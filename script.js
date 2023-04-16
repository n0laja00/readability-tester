/**
 * This small application was made by Janne Lammela in collaboration with chatGBT-4. The application was used for the 
 * basics of the code. It was then further improved by the Janne lammela, who made additions to the code. The code was then further optimised by 
 * promting chatGBT-4. 
 * 16.04.2023, 16th of April 2023.
 */


//Calculate-functions contain the logic of calculations that produce the displayed numeric value on the page: easeResult and gradeResult
function CalculateFleschReadingEase(text) {
    const words = text.trim().split(/\s+/).length;
    const sentences = text.trim().split(/[.!?]+/).length;
    const syllables = text.trim().replace(/[^aeiouy]/gi, '').length;

    const ease = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
    return parseFloat(ease.toFixed(2));
}

function CalculateFleschKincaidGrade(text) {
    const words = text.trim().split(/\s+/).length;
    const sentences = text.trim().split(/[.!?]+/).length;
    const syllables = text.trim().replace(/[^aeiouy]/gi, '').length;

    const grade = 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59;
    return parseFloat(grade.toFixed(2));
}
//End of calculate-functions ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//Determine-functions contain an array of max and text values. By doing a for-loop, we can easily compare the ease levels and assign appropriate values.
const determineEaseContent = (easeResult) => {
    const easeLevels = [
        { max: 11, text: 'Professional level text. Extremely difficult to read and best understood by university graduates.' },
        { max: 31, text: 'College graduate level text. Very difficult to read and best understood by college graduates.' },
        { max: 51, text: 'College level text. Difficult to read.' },
        { max: 61, text: 'Somewhat difficult to read.' },
        { max: 71, text: 'Plain English. Easily understood by ages 13-15.' },
        { max: 81, text: 'Fairly easy to read.' },
        { max: 91, text: 'Easy to read. Conversational.' },
        { max: Infinity, text: 'Very easy to read. Understood by children.' }
    ];

    for (const level of easeLevels) {
        if (easeResult < level.max) {
            return `Flesch Reading Ease: ${easeResult} <div>${level.text}</div>`;
        }
    }
};

const determineGradeContent = (gradeResult) => {
    const gradeLevels = [
        { max: 1, text: 'Your text is incredibly easy to read and is suitable for those with basic literacy.' },
        { max: 7, text: 'Your text is suitable for elementary school students.' },
        { max: 10, text: 'Your text is suitable for middle school students.' },
        { max: 13, text: 'Your text is suitable for high school students.' },
        { max: 17, text: 'Your text is suitable for college students.' },
        { max: Infinity, text: 'Your text is suitable for graduate-level readers or those with higher levels of education.' }
    ];

    for (const level of gradeLevels) {
        if (gradeResult < level.max) {
            return `Flesch Reading Ease: ${gradeResult} <div>${level.text}</div>`;
        }
    }
};

//End of determine-functions ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//this eventListener listend for changes in id: "file-input". Once changed, the function is fired and it will call calculate- and determine-functions.
document.getElementById('file-input').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const text = e.target.result;
            const easeResult = calculateFleschReadingEase(text);
            const gradeResult = calculateFleschKincaidGrade(text);
            //Add content to easeDiv
            const easeDiv = document.getElementById('reading-ease');
            easeDiv.classList.add('fade-in');
            easeDiv.innerHTML = determineEaseContent(easeResult);
            //Add content to gradeDiv.
            const gradeDiv = document.getElementById('grade-level');
            gradeDiv.classList.add('fade-in');
            gradeDiv.innerHTML = determineGradeContent(gradeResult);

        };
        reader.readAsText(file);
    }
});