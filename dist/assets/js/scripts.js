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

		var messagesContainer = $('#messages'),
		messagesAPI = 'inc/guestbook/message.php';

		$(document).ready(function() {

			$('#guestbook').submit(function(event) {
				event.preventDefault();
				var name = $(this).find('#guestName').val(),
				message = $(this).find('#guestMessage').val();

				$.ajax({
					url: messagesAPI,
					type: 'POST',
					dataType: 'json',
					data: {name: name, message: message, insert: true},
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

			/* Fetch first page of messages */
			$.getJSON(messagesAPI, {select: true}, function(response) {
				if (response.success) {
					var data = response.data;
					for (var i = 0; i < data.length; i++) {
						var output = '<div class="message">'+
						'<p>'+ data[i].message +'</p>'+ 
						'<h2>'+ data[i].name +'</h2>'+ 
						'<span>'+ data[i].date_time +'</span>'+
						'</div>';
						messagesContainer.append(output);
					}
				} else {
					messagesContainer.append('Sem mensagens');
				}
			});

			/* Load more messages */
			$('#load-more').click(function(){
				var page = messagesContainer.data('page');
				var btn = $(this);

				$.getJSON(messagesAPI, {select: true, page: page+1 }, function(response) {
					if (response.success) {
						var data = response.data;
						for (var i = 0; i < data.length; i++) {
							var output = '<div class="message">'+
							'<p>'+ data[i].message +'</p>'+ 
							'<h2>'+ data[i].name +'</h2>'+ 
							'<span>'+ data[i].date_time +'</span>'+
							'</div>';
							messagesContainer.append(output);
						}
						messagesContainer.data('page', page+1);
					} else {
						btn.attr('disabled', 'disabled');
					}
				});

			});
			

		});

$(window).resize(function() {

});

$(window).scroll(function() {

});

});
})(jQuery, window, document);