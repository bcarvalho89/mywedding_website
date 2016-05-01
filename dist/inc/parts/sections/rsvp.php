<?php /* RSVP Section */ ?>
<section id="rsvp">
	<?php title("Confirmação de Presença <small>(RSVP)</small>"); ?>

	<div class="content">
		<div class="container">
			<div class="row">
				<div class="col-xs-12 text-center">
					<p>Sua presença deixará este dia ainda mais feliz e especial!<br/>Por isso, confirme sua presença até <strong>18/08</strong> através dos contatos abaixo ou pelo nosso formulário.</p>
				</div>
			</div>

			<div class="row">
				<div class="col-xs-12">
					<h3>Maison Cerimonial & Assessoria</h3>
				</div>
			</div>
			<div class="row">
				<div class="col-md-6">
					<div class="assessoria">
						<p class="text-center">Ao entrar em contato, dia o nome dos noivos!</p>
						<br/>
						<p><i class="icon-whatsapp"></i><i class="icon-phone"></i> (11) 99306.8234 - Paula</p>
						<p><i class="icon-whatsapp"></i><i class="icon-phone"></i> (11) 99371.9925 - Talita</p>
						<p><i class="icon-mail"></i> maisoncerimonial@hotmail.com</p>
					</div>
				</div>
				<div class="col-md-6">
					<div class="rsvp">
						<p class="text-center">Preencha os campos abaixo e as pessoas que irão junto com você.<br />Atente-se à quantidade de convites individuais que enviamos!</p>
						<form id="form_rsvp">
							<div class="form-group">
								<label>Pessoa 1</label>
								<input class="name" type="text" placeholder="Digite o nome completo" />
								<label>É criança?</label>
								<input class="child" type="checkbox" name="child" />
							</div>
							<div class="add">
								<button class="btn pink" id="more-people">Adicionar pessoa <i class="icon-user-add"></i></button>
							</div>
							<div class="response"></div>
							<div class="confirmation">
								<button class="btn yes" data-confirmation="yes">Irei, com certeza!</button>
								<button class="btn maybe" data-confirmation="maybe">Não sei</button>
								<button class="btn no" data-confirmation="no">Não poderei ir</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>


</section>