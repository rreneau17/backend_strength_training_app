// var REPORT_HEADING_SEL = '.report-headings';
var reportHeadingContainer = document.querySelector('.results-exercises');


// unable to retrieve routines through the results route.  Using this workaround until I figure out the issue.
let routines = [{
    id: 1,
    routineName: "Basic Strength"
    },
    {
        id: 2,
        routineName: "The 9-Minute Strength Workout"
    },
    {
        id: 3,
        routineName: "Women's Body Weight Workout"
    }
]

// preping data for DOM. 

function prepData() {
    var woResults = workouts.map((workout, i) => {
        let routineName;
        routines.forEach(routine=> {
            if(workout.routineId === routine.id) {
                routineName = routine.routineName; 
            }
        })
        var actualEx = actuals[i].map((actual) => {
            let exerciseName;
                exercises.forEach(exercise=> {
                    if(actual.exerciseId === exercise.id) {
                        exerciseName = exercise.exerciseName;
                    }
                })
                return {
                    weight: actual.actualWgt,
                    reps: actual.actualReps,
                    setNum: actual.setNum,
                    exerciseName: exerciseName
                }
        })
        return {
            date: workout.date,
            routineName: routineName,
            actuals: actualEx
        }
    })
    // woResults.forEach(woResult => {
    //     console.log(woResult.date, woResult.routineName);
    //     woResult.actuals.forEach(actual => {
    //         console.log(actual.exerciseName, actual.weight, actual.reps, actual.setNum);
    //     })
    // })

    // call function to render actuals data to the screen
    displayResults(woResults);
}

function displayResults(woResults) {
    console.log(woResults);
    woResults.forEach(woResult => {
        var resHeadingTable = document.createElement('table');
        resHeadingTable.setAttribute('class', 'results-heading-tbl');
        var resHeadingTH = resHeadingTable.createTHead();
        var resHeadingTR = resHeadingTH.insertRow(0);
        var resHeadingCell = resHeadingTR.insertCell(0)
        resHeadingCell.textContent = woResult.routineName + '\xa0\xa0\xa0\xa0 - \xa0\xa0\xa0\xa0' + woResult.date;
        
        // resHeadingTR.appendChild(resHeadingTH);
        // resHeadingTable.appendChild(resHeadingTR);
        
        reportHeadingContainer.appendChild(resHeadingTable);

        var actualsDiv = document.createElement('div');
        actualsDiv.setAttribute('class', 'actuals');
        var actualsHeadingTbl = document.createElement('table');
        actualsHeadingTbl.setAttribute('class', 'actuals-heading-tbl');
        var actualsTable = document.createElement('table');
        actualsTable.setAttribute('class', 'actuals-body-tbl');
        var actualsHeading = actualsHeadingTbl.createTHead();
        var actHeadingRow = actualsHeading.insertRow(0);
        var actHeadingCell1 = actHeadingRow.insertCell(0);
        var actHeadingCell2 = actHeadingRow.insertCell(1);
        var actHeadingCell3 = actHeadingRow.insertCell(2);
        var actHeadingCell4 = actHeadingRow.insertCell(3);
        actHeadingCell1.textContent = 'Exercise';
        actHeadingCell1.setAttribute('style', 'width: 350px');
        actHeadingCell2.textContent = 'Weight';
        actHeadingCell2.setAttribute('style', 'width: 150px');
        actHeadingCell3.textContent = 'Reps';
        actHeadingCell3.setAttribute('style', 'width: 150px');
        actHeadingCell4.textContent = 'Set Number';
        actHeadingCell4.setAttribute('style', 'width: 200px');

        woResult.actuals.forEach((actual, i) => {
            
            var actualsRow = actualsTable.insertRow(i);
            var actExName = actualsRow.insertCell(0);
            var actWeight = actualsRow.insertCell(1);
            var actReps = actualsRow.insertCell(2);
            var actSetNum = actualsRow.insertCell(3);
            actExName.textContent = actual.exerciseName;
            actExName.setAttribute('style', 'width: 350px');
            actWeight.textContent = actual.weight;
            actWeight.setAttribute('style', 'width: 150px');
            actReps.textContent = actual.reps;
            actReps.setAttribute('style', 'width: 150px');
            actSetNum.textContent = actual.setNum;
            actSetNum.setAttribute('style', 'width: 200px');
        })

        actualsDiv.appendChild(actualsHeadingTbl);
        actualsDiv.appendChild(actualsTable);
        reportHeadingContainer.appendChild(actualsDiv);


    })

}

prepData();