<?php /* Guestbook Section */ ?>
<section>
	<?php title("Mensagens"); ?>

	<div id="messages" data-page="1">
	</div>

	<button id="load-more">Carregar mais mensagens</button>

	<form id="guestbook">
		<input type="text" name"txtName" id="guestName" placeholder="Nome" />
		<textarea name="txtComment" id="guestMessage" placeholder="Mensagem"></textarea>
		<button type="submit">Enviar</button>
	</form>
</section>