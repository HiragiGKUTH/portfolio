let tabSize = 4;

function changeTabSize() {
	const tabSizeNode = document.querySelector("#tabSize");
	tabSize = tabSizeNode.value;
}

function main() {
	//get texts on Textarea as a List
	const lineList = document.querySelector("#input").value.split('\n');

  //Quality ratio :Type => number
  const qualityRatio = AnalyzeQuality(lineList, tabSize);

  //Compute beautified code :Type => string
  const beautifulCode = BeautifyCode(lineList, tabSize);

  //Output results into HTML
  //Code output
  let outputCode = document.querySelector("#output");
  outputCode.value = beautifulCode;

  //Evaluate output
	let outputQualityRatio = document.querySelector("#qualityRatio");
  outputQualityRatio.textContent = Math.round(qualityRatio*100) + " \%";
  
  //Scrolling to bottom of the page
  scrollTo(200, 5000);
}

/**
 * Analyzing Code Quality
 * @param lineList {string} Unkode list, splited by \n.
 * @return {number} Code quality ratio [0 - 1.0].
 */
function AnalyzeQuality(lineList, tabSize) {
  let bracketDepth = 0;
  let correctLine = 0;
  const lineSize = lineList.length;

  const SpaceCounter = (str) => {
    let cnt = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === " ") {
        cnt++;
      } else {
        return cnt;
      }
    }
    return 0;
  }

	for (let li = 0; li < lineList.length; li++) {
    const line = lineList[li];
    let prevLine = lineList[li==0 ? 0 : li-1];
		bracketDepth = getNextBracketDepthHelper(line, prevLine, bracketDepth);

		if (SpaceCounter(line) === bracketDepth*tabSize) {
      correctLine++;
    }
  }
  return correctLine / lineSize;
}

/**
 * Beautify Unkode
 * @param {Array} lineList Unkode list, splited by '\n'
 * @param {number} tabSize uses of tab size
 * @returns {string} Beautiful Code
 */
function BeautifyCode(lineList, tabSize) {
  let bracketDepth = 0;
  /* result */
  let beautyCode = "";

  /* insert num spaces at head of line function */
  const InsSpace = (str, num) => {
    let spaces = "";
    for (let i = 0; i < num; i++) {
      spaces+=" ";
    }
    return spaces + str;
  }

  for (let li = 0; li < lineList.length; li++) {
    const line = lineList[li].trim();
    const prevLine = lineList[li==0 ? 0 : li-1].trim();
		bracketDepth = getNextBracketDepthHelper(line, prevLine, bracketDepth);

    /* push to result */
    beautyCode += InsSpace(line, tabSize * bracketDepth) + "\n";
  }
  return beautyCode;
}

/**
 * Get indent level of next line that it should be.
 * @param {string} line now line's string
 * @param {string} prevLine previous line's string
 * @param {number} nowDepth now indent depth
 */
function getNextBracketDepthHelper(line, prevLine, nowDepth) {
	let nextDepth = nowDepth;
  /* bracket detection */
  
  // If // , /* or */ char is detected, return same value
  if (line === "//" || line === "/*" || line === "*/") {
    return nextDepth;
  }
  // If " or ' char is detected, delete "{}" in the quotation
  if (line === "\"" || line === "\'") {

  }
	// add indentation to the next line of the open bracket, so I use previous line data.
	if (prevLine.indexOf("{") !== -1 && line !== prevLine) {
		nextDepth++;
	}
	if (line.indexOf("}") !== -1) {
		nextDepth--;
	}
	return nextDepth;
}
