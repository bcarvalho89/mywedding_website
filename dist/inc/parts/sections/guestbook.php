<?php /* Guestbook Section */ ?>
<section id="guestbook">
	<?php title("Mensagens"); ?>

	<div class="content">
		<div class="container">
			<div class="row description">
				<div class="col-xs-12 ">
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor tempus justo, quis hendrerit nulla mattis sit amet. Vivamus ut sodales felis.</p>
				</div>
			</div>


			<div id="messages" data-page="1" data-columns>
			</div>

			<button id="load-more" class="btn pink">Carregar mais <i class="icon-plus"></i></button>

			<div class="row">
				<div class="off-md-3 col-md-6">
					<form id="guestbook_form">
						<input type="text" name"txtName" id="guestName" placeholder="Nome" />
						<textarea name="txtComment" id="guestMessage" placeholder="Mensagem"></textarea>
						<div class="response"></div>
						<button type="submit" class="btn pink">Enviar <i class="icon-ok"></i></button>
					</form>
				</div>
			</div>
		</div>
	</div>

	
</section>