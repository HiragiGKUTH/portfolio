
function main() {
	//get string data on input textarea
	const inputCode = document.querySelector("#input").value;
  //To List
	let lineList = inputCode.split('\n');
  //set parameter
  const tabSize = 4;

  //Quality ratio :Type => number
  const qualityRatio = AnalyzeQuality(lineList);
  
  //Compute beautified code :Type => string
  const beautifulCode = BeautifyCode(lineList, tabSize);
  
  //Apply code color scheme :Type => textContent
  // !Optical
  //beautifulCode = ApplyColorScheme(beautifulCode);
  
  
  //Output results into HTML
  //Code output
  let outputCode = document.querySelector("#output");
  outputCode.value = beautifulCode;
  
  //Evaluate output
}

/**
 * Analyzing Code Quality
 * @param lineList {string} Unkode list, splited by \n.
 * @return {number} Code quality ratio [0 - 1.0].
 */
function AnalyzeQuality(lineList) {
	let tabSize = 0;
  let bracketCnt = 0;
  
	for (let li = 0; li < lineList.length; li++) {
  	
  }
}

/**
 * Beautify Unkode
 * @param {Array} lineList Unkode list, splited by \n 
 * @returns {string} Beautiful Code
 */
function BeautifyCode(lineList, tabSize) {
  let bracketDepth = 0;
  /* result */
  let beautyCode = "";

  /* insert num spaces function */
  const InsSpace = (str, num) => {
    let spaces = "";
    for (let i = 0; i < num; i++) {
      spaces+=" ";
    }
    return spaces + str;
  }

  for (let li = 0; li < lineList.length; li++) {
    let line = lineList[li];
    let prevLine = lineList[li==0 ? 0 : li-1];

    /* delete all indent */
    line = line.trim();

    /* bracket detection */
    //add indentation to the next line of the open bracket, so I use previous line data.
    if (prevLine.indexOf("{") != -1) {
      bracketDepth++;
    }
    if (line.indexOf("}") != -1) {
      bracketDepth--;
    }

    /* add indent */
    line = InsSpace(line, tabSize * bracketDepth);

    /* push to result */
    beautyCode += line + "\n";
  }
  return beautyCode;
}

function applyScheme(code) {
	
}
