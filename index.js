/* Montly switcher */

$('.annual__option').each(function() {
    $('.annual__option').click(function() {
        $('.annual__option').addClass('active');
        $('.monthly__option').removeClass('active')
    })
});
$('.monthly__option').each(function() {
    $('.monthly__option').click(function() {
        $('.monthly__option').addClass('active');
        $('.annual__option').removeClass('active')
    })

});

/* ----- Carousel controls ----- */

let count = 0;
let count2 = 3;
let lastCardOrder;

$('.arrows-wrapper .right').click(moveLeft);
$('.arrows-wrapper .left').click(moveRight);

//Move carousel left, change order of first card to last
function moveLeft() {
	let _this = this;
	let leftOffset = $(this)
		.parent()
		.parent()
		.find('.continous__carousel')
		.css('width');
	leftOffset = leftOffset.slice(0, -2) / 4;
    console.log(leftOffset)
	$('.left').unbind('click');
	$('.right').unbind('click');
	$(this).parent().parent().find('.continous__carousel').animate(
		{
			left: `-${leftOffset}px`
		},
		300
	);
	firstDiv = $(this)
		.parent()
		.parent()
		.find('.continous__carousel')
		.children()[count];
	lastCardOrder = parseInt(
		$(this).parent().parent().find('.continous__carousel').children()[
			count2
		].style.order
	);
	/*timeout*/
	setTimeout(function() {
		firstDiv.style.order = lastCardOrder + 1;
		$(_this)
			.parent()
			.parent()
			.find('.continous__carousel')
			.css('left', '0');

		$('.left').click(moveRight);
		$('.right').click(moveLeft);
	}, 350);

	/*timeout*/

	if (count === 3) {
		count = 0;
	} else {
		count++;
	}
	if (count2 === 3) {
		count2 = 0;
	} else {
		count2++;
	}
}
//Move carousel right, change order of last card to first
function moveRight() {
	let _this = this;
	let leftOffset = $(this)
		.parent()
		.parent()
		.find('.continous__carousel')
		.css('width');
	leftOffset = leftOffset.slice(0, -2) / 4;
    console.log(leftOffset);
	$('.left').unbind('click');
	$('.right').unbind('click');
	let lastDiv = $(this)
		.parent()
		.parent()
		.find('.continous__carousel')
		.children()[count2];
	let firstCardOrder = parseInt(
		$(this).parent().parent().find('.continous__carousel').children()[
			count
		].style.order
	);
	lastDiv.style.order = firstCardOrder - 1;
	$(_this)
		.parent()
		.parent()
		.find('.continous__carousel')
		.css('left', `-${leftOffset}px`);
	$(_this).parent().parent().find('.continous__carousel').animate(
		{
			left: '0px'
		},
		300
	);
	setTimeout(function() {
		$('.left').click(moveRight);
		$('.right').click(moveLeft);
	}, 350);

	if (count === 0) {
		count = 3;
	} else {
		count--;
	}
	if (count2 === 0) {
		count2 = 3;
	} else {
		count2--;
	}
}
//open annual up-sell modal
$('.frequency-options__modal .btn_membership').click(function() {
	$('.annual__switch').fadeIn(200);
	$('.annual__switch').css('display', 'flex');
});
//close annual up-sell modal
$('.annual__switch .close__modal').click(function() {
	$('.annual__switch').fadeOut(200);
});
//open frequency modal
$('.membership-packages__wrapper .btn_membership').click(function() {
	$('.frequency-options__modal').fadeIn('hide_el');
	// reset membership cards
	count = 0;
	count2 = 3;

	for (let i = 0; i <= 4; i++) {
		$(
			'.membership-packages__wrapper .continous__carousel .membership-card:eq(' +
				i +
				')'
		).css('order', i);
	}
	//replicate membership name to frequency modal
	let selectedMembershipName = $(this).parent().find('h3').text();
	$('.selected-membership__name').text(selectedMembershipName);
});
//close frequency modal
$('.frequency-options__modal .close__modal').click(function() {
	$('.frequency-options__modal').fadeOut(150);
	// reset frequency cards
	count = 0;
	count2 = 3;

	for (let i = 0; i <= 4; i++) {
		$(
			'.frequency-options__wrapper .continous__carousel .membership-card:eq(' +
				i +
				')'
		).css('order', i);
	}
});

//add dash for every 4th number
$('#membership-payment__form input#card_number').keyup(function() {
	var foo = $(this).val().split('-').join(''); // remove hyphens
	if (foo.length > 0) {
		foo = foo.match(new RegExp('.{1,4}', 'g')).join('-');
	}
	$(this).val(foo);
});

//show summary on mobile
let btnClick = 0;
$('.show-summary').click(function() {
	if (btnClick % 2) {
		$(this).closest('.summary-info__content').children().slideUp(150);
		$('.summary-info__content .d-flex').removeClass('highlighted');
		$(this).text('See all');
	} else {
		$('.summary-info__content .d-flex').addClass('highlighted');
		$(this)
			.closest('.summary-info__content')
			.children()
			.slideDown(200);
		$(this).text('Show less');
		$(this).removeClass('hidden');
		$(this).addClass('active');
	}
	btnClick++;
});

//open payment modal
$('.approve-annual_switch, .cancel-annual_switch').click(function() {
	$('.frequency-options__modal, .annual__switch').hide();
	$('.payment-details__modal').fadeIn(200);
});
//close payment modal
$('.payment-details__modal .close__modal').click(function() {
	$('.payment-details__modal').fadeOut(200);
});
//open confirmation modal
$('#membership-payment__form button').click(function() {
	$('.purchase-summary__modal').fadeIn(200);
    $('.payment-details__modal').fadeOut(200);
});
//close confirmation modal
$('.purchase-summary__modal .close__modal').click(function() {
	$('.purchase-summary__modal').fadeOut(200);
});

//prevent payment form from submitting -- remove when going live

$('#membership-payment__form').click(function(e) {
	e.preventDefault();
})

