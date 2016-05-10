<?php /* Photos Section */ ?>
<section id="photos">
	<?php title("Fotos"); ?>

	<div class="content">
		<div class="container">

			<div class="row description">
				<div class="off-xs-2 col-xs-8">
					<p>Nesses 11 anos de namoro, conhecemos alguns lugares legais e passamos por diversos momentos e fases, na qual em algumas oportunidades conseguimos registrar.</p>
				</div>
			</div>

		</div>
		<div class="container-fluid">

			<div class="row middle-xs">
				<div class="col-md-4">
				<iframe width="100%" height="360" src="https://www.youtube.com/embed/6MmNsu9oOLk?rel=0&amp;controls=1" frameborder="0" allowfullscreen></iframe>
				</div>
				<div class="col-md-8">
					<div class="gallery">
						<?php
						$dir          = 'assets/img/gallery';
						$file_display = array(
							'jpg',
							'jpeg',
							'png',
							'gif'
							);

						if (file_exists($dir) == false) {
							echo 'Directory \'', $dir, '\' not found!';
						} else {
							$dir_contents = scandir($dir);

							foreach ($dir_contents as $file) {
								$file_type = strtolower(end(explode('.', $file)));

								if ($file !== '.' && $file !== '..' && in_array($file_type, $file_display) == true) {
									echo '<a class="image" href="'. $dir. '/'. $file. '"><img src="'. $dir. '/'. $file. '" /></a>';
								}
							}
						}
						?>
					</div>
				</div>
			</div>
		</div>
	</div>


</section>