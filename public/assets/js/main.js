/*
	Hypothesis by Pixelarity
	pixelarity.com | hello@pixelarity.com
	License: pixelarity.com/license
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('.scrolly').scrolly({
			offset: function() { return $header.height() - 5; }
		});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight(),
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); $header.addClass('reveal'); }
			});

		}

	// Dropdowns.
		$('#nav > ul').dropotron({
			alignment: 'right',
			hideDelay: 350,
			baseZIndex: 100000
		});

	// Menu.
		$('<a href="#navPanel" class="navPanelToggle">Menu</a>')
			.appendTo($header);

		$(	'<div id="navPanel">' +
				'<nav>' +
					$('#nav') .navList() +
				'</nav>' +
				'<a href="#navPanel" class="close"></a>' +
			'</div>')
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					target: $body,
					visibleClass: 'is-navPanel-visible',
					side: 'right'
				});

	// Banner.
		if ($banner.length > 0) {

			// Edge + IE: Workaround for object-fit.
				if (browser.name == 'edge'
				||	browser.name == 'ie') {

					var $video = $banner.find('video'),
						v = $video[0],
						t, f;

					// Handler function.
						var f = function() {

							var w = v.videoWidth, h = v.videoHeight,
								pw = $window.width(), ph = $window.height(),
								nw, nh, x;

							// Calculate new width, height.
								if (pw > ph) {

									nw = pw;
									nh = (nw / w) * h;

								}
								else {

									nh = ph;
									nw = (nh / h) * w;

								}

							// Set width, height.
								if (nw < pw) {

									v.style.width = '100vw';
									v.style.height = 'auto';

								}
								else
									v.style.width = nw + 'px';

								if (nh < ph) {
									v.style.height = '100vh';
									v.style.width = 'auto';
								}
								else
									v.style.height = nh + 'px';

							// Set position (bottom-right).
								v.style.top = v.style.bottom = v.style.left = v.style.right = 'auto';
								v.style.bottom = '0';
								v.style.right = '0';

						};

					// Do an initial call of the handler.
						(f)();

					// Add event listeners.
						$window.on('resize load', function() {

							clearTimeout(t);

							t = setTimeout(f, 125);

						});

				}

		}

	// Tabs.
		$('.tabs').selectorr({
			titleSelector: 'h3',
			delay: 250
		});

})(jQuery);