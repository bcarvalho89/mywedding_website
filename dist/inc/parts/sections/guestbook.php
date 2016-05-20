<?php /* Guestbook Section */ ?>
<section id="guestbook">
	<?php title("Mensagens"); ?>

	<div class="content">
		<div class="container">
			<div class="row description">
				<div class="off-md-2 col-md-8 off-xs-1 col-xs-10">
					<p>Utilize esse espaço para nos deixar uma mensagem de felicitações, votos ou qualquer outra coisa queira. Promotemos ler com muito carinho.</p>
				</div>
			</div>

			<div id="messages" data-page="1" data-columns>
			</div>

			<button id="load-more" class="btn pink">Carregar mais <i class="icon-plus"></i></button>

			<div class="row">
				<div class="off-md-3 col-md-6 off-xs-1 col-xs-10">
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