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
		loadMore = $('#load-more'),
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



		function initMaps() {
			var styles = [
			{
				stylers: [
				{ hue: "#29aba7" },
				{ saturation: 0 }
				]
			},{
				featureType: "road",
				elementType: "geometry",
				stylers: [
				{ lightness: 100 },
				{ visibility: "simplified" }
				]
			}
			];

			var styledMap = new google.maps.StyledMapType(styles,
				{name: "Espaço Monterrey"});



			var image = 'assets/img/marker.png';
			var myLatlng = new google.maps.LatLng(-23.0624768,-46.8706222);
			var mapOptions = {
				zoom: 15,
				center: myLatlng,
				mapTypeControlOptions: {
					mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
				}
			};
			var map = new google.maps.Map(document.getElementById('mapa'),
				mapOptions);

			var marker = new google.maps.Marker({
				position: myLatlng,
				map: map,
				icon: image
			});

			map.mapTypes.set('map_style', styledMap);
			map.setMapTypeId('map_style');
		}

		google.maps.event.addDomListener(window, 'load', initMaps);

		$(document).ready(function() {

			

			dateCountdown('28/08/2016','11:00h',countdown);

			$('#form_rsvp').on('change', '.child', function(){
				var check = $(this);
				if(check.prop('checked')) {
					check.after('<label>Idade</label><input class="age" type="text" />');
				} else {
					check.next().remove();
					check.next().remove();
				}
			});

			$('#more-people').click(function(e){
				e.preventDefault();
				var formGroup = $('#form_rsvp .form-group');
				var lastFormGroup = formGroup.last();
				var formGroupLength = formGroup.length;

				var block = '<div class="form-group">'+
				'<label>Pessoa '+ (formGroupLength+1) +'</label>'+
				'<input class="name" type="text" placeholder="Digite o nome completo" />'+
				'<label>É criança?</label>'+
				'<input class="child" type="checkbox" name="child" />'+
				'<button class="btn remove"><i class="icon-user-remove"></i></button>'+
				'</div>';

				lastFormGroup.after(block);

			});

			$('#form_rsvp').on('click', '.remove', function(){
				$(this).parent().remove();
			});

			$('#form_rsvp .confirmation').click(function(e){
				e.preventDefault();
				var group = {};
				var form = [];
				var msg = [];
				var responseEl = $('#form_rsvp .response');
				var formGroup = $('#form_rsvp .form-group');

				formGroup.each(function(index, el) {
					var name = $.trim($(el).find('.name').val());
					var child = false,
					age = null,
					error = false;

					if(name.length < 10) {
						msg.push('Digite o nome completo');
						error = true;
					}

					
					if($(el).find('.child').prop('checked')) {
						child = true;
						age = $.trim($(el).find('.age').val());
						age = parseInt(age);
						if(age > 14 || isNaN(age)) {
							msg.push('Digite a idade corretamente');
							error = true;
						}
					}
					if (!error) {
						responseEl.html('');
						group = {
							'name': name,
							'child': child,
							'age': age
						}
						form.push(group);
					} else {
						var output = '';
						for (var i = 0; i < msg.length; i++) {
							output += '<span>'+ msg[i] +'</span>';
						}
						responseEl.html(output);
					}
				});

				console.log(form);

				//$('#form_rsvp').find('.btn').addClass('disabled').attr('disabled', 'disabled');


			});


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

			$('#guestbook_form').submit(function(event) {
				event.preventDefault();
				var name = $(this).find('#guestName').val(),
				message = $(this).find('#guestMessage').val(),
				form = this,
				responseEl = $(form).find('.response');

				$.ajax({
					url: messagesAPI,
					type: 'POST',
					dataType: 'json',
					data: {name: name, message: message, insert: true},
				})
				.done(function(response) {
					console.log(response);
					responseEl.html('');
					if (response.success) {
						var data = response.data;
						var output = '<div class="message">'+
						'<div class="message-wrap">'+
						'<p>'+ data.message +'</p>'+ 
						'</div>'+
						'<h2>'+ data.name +'</h2>'+ 
						'<span>'+ data.dateTime +'</span>'+
						'</div>';
						var item = document.createElement('div');
						var grid = document.querySelector('#messages');
						salvattore['append_elements'](grid, [item]);
						item.outerHTML = output;
						messagesContainer.removeClass('no-messages').find('.no-message').remove();
						loadMore.fadeIn();
						form.reset();
					} else {
						var msg = '';
						for (var i = 0; i < response.msg.length; i++) {
							msg += '<span>'+ response.msg[i] +'</span>';
						}
						responseEl.html(msg);
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

					$.each(data, function(index, value){
						var output = '<div class="message">'+
						'<div class="message-wrap">'+
						'<p>'+ value.message +'</p>'+ 
						'</div>'+
						'<h2>'+ value.name +'</h2>'+ 
						'<span>'+ value.dateTime +'</span>'+
						'</div>';
						var item = document.createElement('div');
						var grid = document.querySelector('#messages');
						salvattore['append_elements'](grid, [item]);
						item.outerHTML = output;
					});

/*for (var i = 0; i < data.length; i++) {
	var output = '<div class="">'+
	'<div class="message-wrap">'+
	'<p>'+ data[i].message +'</p>'+ 
	'</div>'+
	'<h2>'+ data[i].name +'</h2>'+ 
	'<span>'+ data[i].dateTime +'</span>'+
	'</div>';
	messagesContainer.append(output);
}*/

setTimeout(function(){
	//salvattore.registerGrid(messagesContainer.get(0));
}, 10);
} else {
	loadMore.hide();
	messagesContainer.addClass('no-messages').append('<div class="no-message"><p>Não recebemos nenhuma mensagem. Que tal ser o primeiro?</p></div>');
}
});

			/* Load more messages */
			loadMore.click(function(){
				var page = messagesContainer.data('page');
				var btn = $(this);

				btn.find('i').toggleClass('icon-plus icon-spinner');

				$.getJSON(messagesAPI, {select: true, page: page+1 }, function(response) {
					if (response.success) {
						var data = response.data;
			/*for (var i = 0; i < data.length; i++) {
				var output = '<div class="">'+
				'<div class="message-wrap">'+
				'<p>'+ data[i].message +'</p>'+ 
				'</div>'+
				'<h2>'+ data[i].name +'</h2>'+ 
				'<span>'+ data[i].dateTime +'</span>'+
				'</div>';
				messagesContainer.append(output);
			}*/
			$.each(data, function(index, value){
				var output = '<div class="message">'+
				'<div class="message-wrap">'+
				'<p>'+ value.message +'</p>'+ 
				'</div>'+
				'<h2>'+ value.name +'</h2>'+ 
				'<span>'+ value.dateTime +'</span>'+
				'</div>';
				var item = document.createElement('div');
				var grid = document.querySelector('#messages');
				salvattore['append_elements'](grid, [item]);
				item.outerHTML = output;
			});
			messagesContainer.data('page', page+1);
			btn.find('i').toggleClass('icon-spinner icon-plus');
		} else {
			setTimeout(function(){
				btn.find('i').remove();
				btn.addClass('disabled');
				btn.attr('disabled', 'disabled');
			}, 200);
		}
	});

			});


		});

$(window).resize(function() {

});

$(window).load(function() {
	setTimeout(function(){
		$('body').addClass('loaded');
		/* Init Photos */
		$('.gallery').masonry({
			itemSelector: '.image',
			columnWidth: '.image',
			percentPosition: true
		});
		$(".gallery").lightGallery({
			thumbnail:true,
			thumbMargin: 2,
			currentPagerPosition: 'middle',
			download: false,
			counter: false,
			animateThumb: false,
			showThumbByDefault: false
		}); 
	}, 1000);
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