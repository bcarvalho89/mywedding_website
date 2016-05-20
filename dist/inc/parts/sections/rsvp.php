﻿<?php /* RSVP Section */ ?>
<section id="rsvp">
	<?php title("Confirmação de Presença <small>(RSVP)</small>"); ?>

	<div class="content">
		<div class="container">
			<div class="row description">
				<div class="off-md-2 col-md-8 off-xs-1 col-xs-10">
					<p>Sua presença deixará este dia ainda mais feliz e especial!<br/>Por isso, confirme sua presença até <strong>18/08</strong> através dos contatos abaixo ou pelo nosso formulário.</p>
				</div>
			</div>

			<div class="row">
				<div class="col-md-12 off-xs-1 col-xs-10">
					<h3>Maison Cerimonial & Assessoria</h3>
				</div>
			</div>
			<div class="row">
				<div class="col-md-6 col-xs-12">
					<div class="assessoria">
						<p class="text-center">Ao entrar em contato, diga o nome dos noivos!</p>
						<br/>
						<div class="row middle-md">
							<div class="col-md-6 col-xs-12">
								<p><i class="icon-whatsapp"></i><i class="icon-phone"></i> (11) 99306.8234 - Paula</p>
								<p><i class="icon-whatsapp"></i><i class="icon-phone"></i> (11) 99371.9925 - Talita</p>
							</div>
							<div class="col-md-6 col-xs-12">
								<p class="horario"><small>De segunda a sexta, das 9:00 às 17:00</small></p>
							</div>
						</div>
						<p style="margin-top:15px"><i class="icon-mail"></i> maisoncerimonial@hotmail.com</p>
					</div>
				</div>
				<div class="col-md-6 col-xs-12">
					<div class="rsvp">
						<p class="text-center">Preencha os campos abaixo e as pessoas que irão junto com você.<br />Atente-se à quantidade de convites individuais que enviamos!</p>
						<form id="form_rsvp">
							<div class="form-group">
								<label>Nome</label>
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