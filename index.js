
$(document).ready(function () {
    const minus = $('.decrement');
    const input = $('.inputfield');
    const roomincrement = $('.roomincrement')
    const adultincrement = $('.adultincrement')
    const childreincrement = $('.childreincrement')
    var totalPoints = childronnum + adultrnum;
    var childronnum = 0;
    var adultrnum = 0;
    const totalguests = $('.totalguests');
    // const plus = $('.increment');
    // const reset = $('.Reset');
    // const apply = $('.apply');
    // const totalguests = $('.totalguests');
    // const inputrooms = $('#inputRooms');
    // const roomcount = $('.roomcount');

    input.text(0);

    minus.click(function () {

        var value = $(this).siblings(input).val();
        if (value > 1) {
            value--;
        }
        $(this).siblings(input).val(value);
        $(this).siblings(input).val(value);
    });

    roomincrement.click(function () {
        var value = $(this).siblings(input).val();
        value++;
        $(this).siblings(input).val(value);
        $('.roomcount').text(value)
    })

    adultincrement.click(function () {
        var value = $(this).siblings(input).val();
        value++;
        $(this).siblings(input).val(value);
        adultrnum = value;
        totalPoints = childronnum + adultrnum
        totalguests.text(totalPoints);
    })
    childreincrement.click(function () {
        var value = $(this).siblings(input).val();
        value++;
        $(this).siblings(input).val(value);
        childronnum = value;
        totalPoints = childronnum + adultrnum
        totalguests.text(totalPoints);
    })



    $('.dropdown-custom-toggle').click(function (e) {
        e.preventDefault();
        $('.dropdown-menu').addClass('show');
    });
    $(window).click(function () {
        $('.dropdown-menu').removeClass('show');
    });

    $('.dropdown-custom').click(function (event) {
        event.stopPropagation();
    });
    // $(reset).click(function (e) {
    //     e.preventDefault();
    //     input.val(0)
    //     $('#inputRooms').val(0)
    //     childronnum.parseFloat($(this).val()) + totalPoints
    // });


    // $(apply).click(function (e) {
    //     e.preventDefault();
    //     var totalPoints = 0;
    //     $('.counter .inputfield').each(function () {
    //         totalPoints = parseFloat($(this).val()) + totalPoints;
    //     });
    //     totalguests.text(totalPoints - 1);
    //     roomcount.text(inputrooms.val())
    // });

});
// $('.checkin').click(function (e) {
//     e.preventDefault();
//     $(this).addClass('active-border');
//     $('.checkout').removeClass('active-border');

// });
// $('.checkout').click(function (e) {
//     e.preventDefault();
//     $('.checkin').removeClass('active-border');
//     $(this).removeClass('disabled');
//     $(this).addClass('active-border');
// });


// $('.view-more').click(function (e) { 
//     e.preventDefault();
//     $('input[name="datefilter"]').data('daterangepicker').show();

// });

$(".check-in-checkout").click(function (e) {
    var pWidth = $(this).innerWidth(); //use .outerWidth() if you want borders
    var pOffset = $(this).offset();
    var x = e.pageX - pOffset.left;
    if (pWidth / 2 > x) {
        $('.checkout').removeClass('active-border');
        $('.checkin').addClass('active-border');
        $('.checkout').removeClass('disabled');
    }
    else {
        $('.checkin').removeClass('active-border');
        $('.checkout').addClass('active-border');
    }

});

$(window).click(function () {
    $('.checkout').removeClass('active-border');
    $('.checkin').removeClass('active-border');
});

$('.check-in-checkout').click(function (event) {
    event.stopPropagation();
});














$(document).ready(function () {
    $('input').val('')
});

$('.bloglistingcarousel').each(function () {
    var slider = $(this);
    slider.slick({
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000,
        mobileFirst: true,
        arrows: false,
        responsive: [{
            breakpoint: 480,
            settings: "unslick"
        }]
    });

});

$(function () {
    $('input[name="datefilter"]').daterangepicker({
        autoUpdateInput: false,
        "opens": "center",
        "autoApply": true,
        locale: {
            cancelLabel: 'Clear'
        }
    });

    $('.checkin input').on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('MM/DD/YYYY'));
        $('#checkout').val(picker.endDate.format('MM/DD/YYYY'));
        $('.checkout').removeClass('active-border');
        $('.checkin').removeClass('active-border');

    });

    $('input[name="datefilter"]').on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
    });
});
