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
		messagesAPI = 'inc/guestbook/message.php',
		pageNum = messagesContainer.data('page'),
		winH = $(window).height(),
		scrollOffset = 75,
		menu = $('.menu'),
		header = $('header'),
		countdown = $('.countdown-text'),
		toTop = $('.to-top');

		Date.dateDiff = function(datepart, fromdate, todate) {
			datepart = datepart.toLowerCase();
			var diff = todate - fromdate;
			var divideBy = {
				w:604800000, 
				d:86400000, 
				h:3600000, 
				n:60000, 
				s:1000
			};

			return Math.floor( diff/divideBy[datepart]);
		};

		function dateCountdown(date,hour,el){
			var dataAno = date.substring(6);
			var dataDia = date.substring(0,2);
			var dataMes = date.substring(3,5);
			var y2k  = new Date(dataAno, (dataMes-1), dataDia);
			var today= new Date();
			var dias = '';
			var diferenca = Date.dateDiff('d', y2k, today);
			
			if (diferenca === 0) {
				el.html('É hoje!');
			} 
			if (diferenca > 0) {
				dias = diferenca;
				el.html('Estamos casados há ' + dias + ' dias');
			}
			if (diferenca === 1) {
				dias = diferenca;
				el.html('Estamos casados há ' + dias + ' dia');
			}

			if (diferenca < 0) {
				dias = Math.abs(diferenca);
				el.html('Faltam ' + dias + ' dias');
			}

			if (diferenca === -1) {
				dias = Math.abs(diferenca);
				el.html('É amanhã!');
			}

		}

		$(document).ready(function() {

			dateCountdown('28/08/2016','11:00h',countdown);

			//CountDownTimer('04/30/2016 03:20 PM', countdown);

			/* Botao topo */
			toTop.click(function(e) {
				e.preventDefault();
				$('body,html').animate({
					scrollTop: 0,
				}, 400);
			});

			menu.on('click', 'a', function(event) {
				event.preventDefault();
				//menu.find('.active').removeClass('active');
				//$(this).addClass('active');
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
				if (refElement.position().top - (scrollOffset * 2) <= top && refElement.position().top + refElement.height() > top) {
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