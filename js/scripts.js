$(function() {
	var docHeight = $('#all').height() - 470;
	$('.leftbluebrdr').height(docHeight)
	$(window).resize(function() {
		var docHeight = $('#all').height() - 470;
		$('.leftbluebrdr').height(docHeight)
	})
})