// Convert grade to grade points
function calculategrade(grade, unit) {
  switch (grade) {
    case 'S': return 10 * unit;
    case 'A': return 9 * unit;
    case 'B': return 8 * unit;
    case 'C': return 7 * unit;
    case 'D': return 6 * unit;
    case 'E': return 5 * unit;
    case 'P': return 4 * unit;
    case 'F': return 0;
    default: return 0;
  }
}

let count = 0;
let sgpaList = []; // List to store SGPA values

// Add new course input form
function addnewcourse() {
  count++;
  const formHTML = `
    <form class="addNew get-${count} course-form">
      <input type="text" placeholder="Course Name" class="course get-${count}" required />
      <input type="number" placeholder="Credits" class="course-credits get-${count}" required />
      <select class="grade get-${count}" required>
        <option value="" disabled selected>Select</option>
        <option>S</option>
        <option>A</option>
        <option>B</option>
        <option>C</option>
        <option>D</option>
        <option>E</option>
        <option>P</option>
        <option>F</option>
      </select>
    </form>
  `;
  const wrapper = document.createElement('div');
  wrapper.innerHTML = formHTML;
  document.querySelector('.course-div1').appendChild(wrapper);
}

// Remove last added form
function removeForms() {
  const allForms = document.querySelectorAll('.addNew');
  if (allForms.length > 0) {
    allForms[allForms.length - 1].remove();
  } else {
    alert("No additional courses to remove!");
  }
}

// Calculate SGPA and display result
function gpacalc() {
  const RESULTBAR = document.getElementById('result');
  const GRADESELECT = document.querySelectorAll('select.grade');
  const UNIT = document.querySelectorAll('input.course-credits');

  let totalUnits = 0;
  let totalEarnedPoints = 0;

  for (let i = 0; i < GRADESELECT.length; i++) {
    const grade = GRADESELECT[i].value.toUpperCase();
    const unit = parseInt(UNIT[i].value);

    if (!grade || isNaN(unit)) {
      RESULTBAR.textContent = "Please fill all course details properly!";
      return;
    }

    totalUnits += unit;
    totalEarnedPoints += calculategrade(grade, unit);
  }

  if (totalUnits === 0) {
    RESULTBAR.textContent = "Total credits cannot be zero!";
    return;
  }

  const sgpa = totalEarnedPoints / totalUnits;
  RESULTBAR.textContent = 'Your SGPA is: ' + sgpa.toFixed(2);
  return sgpa;
}

// Add current SGPA to CGPA list
function addToCgpaList() {
  const sgpa = gpacalc();
  if (typeof sgpa === 'number' && !isNaN(sgpa)) {
    sgpaList.push(sgpa);
    alert(`SGPA ${sgpa.toFixed(2)} added to CGPA list.`);
  }
}

// Calculate CGPA from all added SGPAs
function calculateCgpa() {
  const CGPA_BAR = document.getElementById('cgpa-result');

  if (sgpaList.length === 0) {
    CGPA_BAR.textContent = "Add at least one SGPA to calculate CGPA.";
    return;
  }

  const total = sgpaList.reduce((sum, val) => sum + val, 0);
  const cgpa = total / sgpaList.length;

  CGPA_BAR.textContent = "Your CGPA is: " + cgpa.toFixed(2);
}

// Reset CGPA data
function resetCgpa() {
  sgpaList = [];
  document.getElementById('cgpa-result').textContent = "Your CGPA is: -";
  alert("CGPA list has been reset.");
}
