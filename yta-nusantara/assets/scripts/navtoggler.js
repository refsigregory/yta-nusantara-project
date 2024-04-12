$(".mobileMenuButton").each(function (_, navToggler) {
	var target = $(navToggler).data("target");
	$(navToggler).on("click", function () {
		$(target).animate({
			height: "toggle",
		});
	});
});


// admin sidebar
$(() => {
	$(document).on('click', '#navbarTogglerHead, #navbarToggler, #backdropDrawer', () => {
			$('body').toggleClass('max-h-screen overflow-hidden')
			$('#backdropDrawer').toggleClass('hidden')
			$('aside').toggle()
	})
})