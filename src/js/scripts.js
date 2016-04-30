(function ($, window, document, undefined) {
	'use strict';
	$(function () {

		var messagesContainer = $('#messages'),
		messagesAPI = 'inc/guestbook/message.php',
		pageNum = messagesContainer.data('page'),
		winH = $(window).height(),
		scrollOffset = 75,
		menu = $('.menu'),
		header = $('header'),
		toTop = $('.to-top');

		$(document).ready(function() {

			/* Botao topo */
			toTop.click(function(e) {
				e.preventDefault();
				$('body,html').animate({
					scrollTop: 0,
				}, 400);
			});

			menu.on('click', 'a', function(event) {
				event.preventDefault();
				menu.find('.active').removeClass('active');
				$(this).addClass('active');
				var $target = $('#'+($(this).data('section')));
				$('html, body').stop().animate({
					'scrollTop': $target.offset().top - scrollOffset
				}, 500, 'swing', function () {
				});
			});

			$('#guestbook').submit(function(event) {
				event.preventDefault();
				var name = $(this).find('#guestName').val(),
				message = $(this).find('#guestMessage').val(),
				form = this;

				$.ajax({
					url: messagesAPI,
					type: 'POST',
					dataType: 'json',
					data: {name: name, message: message, insert: true},
				})
				.done(function(response) {
					console.log(response);
					if (response.success) {
						var data = response.data;
						var output = '<div class="message">'+
						'<p>'+ data.message +'</p>'+ 
						'<h2>'+ data.name +'</h2>'+ 
						'<span>'+ data.dateTime +'</span>'+
						'</div>';
						messagesContainer.prepend(output);
						form.reset();
					}
					//console.log("success");
				})
				.fail(function(error) {
					console.log(error);
					//console.log("error");
				})
				.always(function() {
					//console.log("complete");
				});

			});

			/* Fetch first page of messages */
			$.getJSON(messagesAPI, {select: true, page: pageNum}, function(response) {
				if (response.success) {
					var data = response.data;
					for (var i = 0; i < data.length; i++) {
						var output = '<div class="message">'+
						'<p>'+ data[i].message +'</p>'+ 
						'<h2>'+ data[i].name +'</h2>'+ 
						'<span>'+ data[i].dateTime +'</span>'+
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
							'<span>'+ data[i].dateTime +'</span>'+
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
			var scroll = window.scrollY;
			var top = $(this).scrollTop();
			var scrollDistance = (scroll * 15 / $(window).height());
			
			$('#intro .cover').css({
				'background-position-y' : (100 - scrollDistance) + '%'
			});

			if (top > (winH - (scrollOffset * 6))) {
				header.addClass('pinned');
				toTop.addClass('show');
			} else {
				header.removeClass('pinned');
				toTop.removeClass('show');
			}

			$('.menu a').each(function () {
				var currLink = $(this);
				var refElement = $('#' + currLink.data('section'));
				if (refElement.position().top - scrollOffset <= top && refElement.position().top + refElement.height() > top) {
					$('.menu a').removeClass('active');
					currLink.addClass('active');
				}
				else{
					currLink.removeClass('active');
				}
			});

		});

	});
})(jQuery, window, document);