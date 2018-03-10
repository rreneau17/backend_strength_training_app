var RTN_THUMBNAIL_ITEM_SEL = '.rtn-thumbnail-item';
var rtnThumbnailItem = document.querySelectorAll(RTN_THUMBNAIL_ITEM_SEL);

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

function printWrk() {
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
    woResults.forEach(woResult => {
        console.log(woResult.date, woResult.routineName);
        woResult.actuals.forEach(actual => {
            console.log(actual.exerciseName, actual.weight, actual.reps, actual.setNum);
        })
    })
}

function rtnListener() {
    rtnThumbnailItem.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            console.log(event.currentTarget);
            var rtnClicked = event.currentTarget.getAttribute('data-search-route');
            console.log(rtnClicked);
            window.location.href = `/routines/${rtnClicked}`;
        });
    });
}

function subForms() {
    console.log('form is being submitted');
    let counter = 0;
    let lengthForm = $("form").length;
    console.log(lengthForm);
    $("form").each((i, form) => {
        // console.log(counter++);
        // console.log(form);
        // $(form).submit();
        // console.log($(form).attr('action'));
        formURL=$(form).attr('action');
        $.ajax({
            url: formURL,
            type: "post",
            data: $(form).serialize(),
            success: function(d) {
                counter++;
                console.log(counter);
                if (counter === lengthForm) {
                    alert("Post successful!");
                }
            }
        });
    })
}

function getInstructions(url) {
    console.log('function is working');
    window.open(url, '_blank');
}

function validateForm() {
    console.log('validate triggered');
    var x = document.forms["rtnForm"]["reps"].value;
    if (isNaN(x) || x < 1 || x > 50) {
        alert("Input an integer between 1 and 50");
        return false
    }
}

function main() {
    // console.log(actuals);
    // console.log(workouts);
    // console.log(exercises);
    // console.log(routines);
    printWrk();
    rtnListener();
    // subForms();
    // getInstructions();
}

main();