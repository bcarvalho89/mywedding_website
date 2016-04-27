/*!
 * mywedding_website
 * My Wedding Website
 * http://brukel.cf
 * @author Bruno Carvalho
 * @version 1.0.0
 * Copyright 2016. MIT licensed.
 */
(function ($, window, document, undefined) {
	'use strict';
	$(function () {

		$(document).ready(function() {

			$('#guestbook').submit(function(event) {
				event.preventDefault();
				var name = $(this).find('#guestName').val(),
				message = $(this).find('#guestMessage').val();

				$.ajax({
					url: 'inc/guestbook/message.php',
					type: 'POST',
					dataType: 'json',
					data: {name: name, message: message, ajax: true},
				})
				.done(function(response) {
					console.log(response);
					console.log("success");
				})
				.fail(function(error) {
					console.log(error);
					console.log("error");
				})
				.always(function() {
					console.log("complete");
				});
				
			});

		});

		$(window).resize(function() {

		});

		$(window).scroll(function() {

		});

	});
})(jQuery, window, document);