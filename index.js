/* Montly switcher */
$('.monthly__option, .annual__option').click(function() {
	if (!$(this).hasClass('active')) {
		$('.monthly__option, .annual__option').toggleClass('active');
	}
});

/* ----- Carousel controls ----- */

$( $('.continous__carousel')).on( "swiperight", function(){
	$('.arrows-wrapper .left').trigger('click');
});
$( $('.continous__carousel')).on( "swipeleft", function(){
	$('.arrows-wrapper .right').trigger('click');
});


let firstCount;
let lastCount;
let offset;
let lastPossibleOrder;
let isSecondCarouselOn = false;

function setCounts() {
	let carousel = setCarousel();
	lastPossibleOrder = $(carousel).children().length - 1;
	firstCount = 0;
	lastCount = lastPossibleOrder;
	return carousel;
}
setCounts();

function setCarousel() {
	let carousel = $('.continous__carousel')[0];
	if (isSecondCarouselOn) {
		carousel = $('.continous__carousel')[1];
	}
	setOffset(carousel);
	return carousel;
}

function setOffset(carousel) {
	offset =
		($(carousel).width() -
			$(carousel).children().length *
				$(carousel).children(':first-child').outerWidth()) /
			($(carousel).children().length - 1) +
		$(carousel).children(':first-child').outerWidth();
}

$('.arrows-wrapper .right').click(moveLeft);
function moveLeft() {
	let carousel = setCarousel();
	let firstDiv = $(carousel).children()[firstCount];
	let lastCardOrder = parseInt(
		$(carousel).children()[lastCount].style.order
	);

	$('.left, .right').unbind('click');

	$(carousel).animate({ left: `-${offset}px` }, 300);

	setTimeout(function() {
		firstDiv.style.order = lastCardOrder + 1;
		$(carousel).css('left', '0');
		$('.left').click(moveRight);
		$('.right').click(moveLeft);
	}, 350);

	if (firstCount === lastPossibleOrder) {
		firstCount = 0;
	} else {
		firstCount++;
	}
	
	if (lastCount === lastPossibleOrder) {
		lastCount = 0;
	} else {
		lastCount++;
	}
}

$('.arrows-wrapper .left').click(moveRight);
function moveRight() {
	let carousel = setCarousel();
	let lastDiv = $(carousel).children()[lastCount];
	let firstCardOrder = parseInt(
		$(carousel).children()[firstCount].style.order
	);

	$('.left, .right').unbind('click');

	lastDiv.style.order = firstCardOrder - 1;

	$(carousel).css('left', `-${offset}px`);
	$(carousel).animate({ left: '0px' }, 300);

	setTimeout(function() {
		$('.left').click(moveRight);
		$('.right').click(moveLeft);
	}, 350);

	if (firstCount === 0) {
		firstCount = lastPossibleOrder;
	} else {
		firstCount--;
	}
	
	if (lastCount === 0) {
		lastCount = lastPossibleOrder;
	} else {
		lastCount--;
	}
}

function resetCarouselOrder() {
	carousel = setCounts();
	for (let i = 0; i <= lastCount; i++) {
		$($(carousel).children()[i]).css('order', i);
	}
}

//open frequency modal
$('.membership-packages__wrapper .btn_membership').click(function() {
	$('.frequency-options__modal').fadeIn('hide_el');
	isSecondCarouselOn = true;
	resetCarouselOrder();
	let selectedMembershipName = $(this).parent().find('h3').text();
	$('.selected-membership__name').text(selectedMembershipName);
});

//close frequency modal
$('.frequency-options__modal .close__modal').click(function() {
	isSecondCarouselOn = false;
	resetCarouselOrder();
	$('.frequency-options__modal').fadeOut(150);	
});

//open annual up-sell modal
$('.frequency-options__modal .btn_membership').click(function() {
	$('.annual__switch').fadeIn(200);
	$('.annual__switch').css('display', 'flex');
});
//close annual up-sell modal
$('.annual__switch .close__modal').click(function() {
	$('.annual__switch').fadeOut(200);
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
		$('.summary-info__content .d-flex').removeClass('highlighted');
		$(this).closest('.summary-info__content').children().slideUp(150);
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
});
