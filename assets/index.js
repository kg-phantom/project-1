const modalElements = $('.modal-overlay, .modal');

$('.settings').click(function() {
    modalElements.addClass('active');
})

$('.close-modal').click(function() {
    modalElements.removeClass('active');
})