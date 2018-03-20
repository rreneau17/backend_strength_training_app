var RTN_THUMBNAIL_ITEM_SEL = '.rtn-thumbnail-item';
var rtnThumbnailItem = document.querySelectorAll(RTN_THUMBNAIL_ITEM_SEL);

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
    let postCheck = wrongEdits();
    console.log(postCheck);
    if (postCheck) {
        alert('Values can not be blank and must be a positive integer.  Try again.');
    } else {
        let counter = 0;
        let lengthForm = $("form").length;
        // console.log(lengthForm);
        $("form").each((i, form) => {
            console.log(form);
            formURL=$(form).attr('action');
            $.ajax({
                url: formURL,
                type: "post",
                data: $(form).serialize(),
                success: function(data) {
                    console.log(data);
                    counter++;
                    // console.log(counter);
                    if (counter === lengthForm) {
                        alert("Your edits were posted successfully!");
                    }
                    if (typeof data.redirect == 'string') {
                        window.location = data.redirect
                    }
                }
            });   
        })
    }
}

// will return false if any of the edit values in the form are invalid
function wrongEdits () {
    let wrongVal = false;
    $('input[data-edits="editVals"]').each(function( index ) {
        let editValNum = Number($( this ).val());
        let editValue = $( this ).val()
        // console.log( index + ": " + editValue);
        let editInt = Number.isInteger(editValNum);
        if (editValue === '' || !editInt || editValNum < 0) {
            wrongVal = true;
        } 
        // console.log(wrongVal);
    });
    return wrongVal;
}


// opens the selected routine instructions on a separate browser window
function getInstructions(url) {
    console.log('function is working');
    window.open(url, '_blank');
}

function validateForm() {
    console.log('validate triggered');
    var x = document.forms["editRtn"]["weight"].value;
    console.log(x);
    if (x == "") {
        alert("Weight must be filled out");
        return false;
    }
}

function main() {
    // console.log('console!!!!')
    // console.log(actuals);
    // console.log(workouts);
    // console.log(exercises);
    // console.log(routines);
    rtnListener();
    // subForms();
    // getInstructions();
}

main();