<?php /* Guestbook Section */ ?>
<section id="guestbook">
	<?php title("Mensagens"); ?>

	<div class="content">
		<div class="container">
			<div class="col-xs-12 text-center">
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor tempus justo, quis hendrerit nulla mattis sit amet. Vivamus ut sodales felis.</p>
			</div>
			
			<div id="messages" data-page="1">
			</div>

			<button id="load-more">Carregar mais mensagens</button>

			<form id="guestbook_form">
				<input type="text" name"txtName" id="guestName" placeholder="Nome" />
				<textarea name="txtComment" id="guestMessage" placeholder="Mensagem"></textarea>
				<button type="submit">Enviar</button>
			</form>

		</div>
	</div>

	
</section>