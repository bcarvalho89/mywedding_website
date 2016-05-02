<?php /* Photos Section */ ?>
<section id="photos">
	<?php title("Fotos"); ?>

	<div class="content">
		<div class="container">

			<div class="row description">
				<div class="col-xs-12">
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor tempus justo, quis hendrerit nulla mattis sit amet. Vivamus ut sodales felis.</p>
				</div>
			</div>

		</div>
		<div class="container-fluid">

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


</section>