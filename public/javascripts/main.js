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
    $("form").each((i, form) => {
        console.log(form);
        // $(form).submit();
        console.log($(form).attr('action'));
        formURL=$(form).attr('action');
        $.ajax({
            url: formURL,
            type: "post",
            data: $(form).serialize(),
            success: function(d) {
                alert(d);
            }
        });
    })
}

function getInstructions(url) {
    console.log('function is working');
    window.open(url, '_blank');
}

function main() {
    rtnListener();
    // subForms();
    // getInstructions();
}

main();