(function() {
/*
 * jFitImage jQuery Plugin version 1.0
 *
 * 画像をフィットさせる
 */
var options = {
	width: 200,					// 画像の目的の幅
	height: 200,				// 画像の目的の高さ
	isNotOverFit: false,		// 画像がOverしていないときはFitさせないフラグ
	callback: function() {
	}
};

$.fn.jFitImage = function(opts) {
	$.extend(options, opts);

	$(this).each(function() {
		var element = $(this),
			src = $(this).data("src"),
			width = options.width,
			height = options.height;

		var img = new Image();
		img.onerror = function() {
			alert("error");
		};

		img.onload = function() {
			var isNotOver = (this.width <= width && this.height <= height);
			// 幅・高さのどちらもOverしていない場合
			if (options.isNotOverFit && isNotOver) {
				var marginLeft = Math.floor((width / 2) - (this.width / 2)),
					marginTop = Math.floor((height / 2) - (this.height / 2));
				element.css({
					"margin-left": (marginLeft < 0 ? 0 : marginLeft),
					"margin-top": (marginTop < 0 ? 0 : marginTop)
				});

				element.attr("src", this.src);

				// callback
				options.callback(element, true);
				return;
			}

			var size, margin;
			if (this.height / height > this.width / width) {
				size = height * this.width / this.height;
				margin = Math.floor((width - size) / 2);
				element.css({
					height: height,
					width:  size,
					"margin-left": (margin < 0 ? 0 : margin)
				});
			} else {
				size = width * this.height / this.width;
				margin = Math.floor((height - size) / 2);
				element.css({
					width:  width,
					height: size,
					"margin-top": (margin < 0 ? 0 : margin)
				});
			}

			element.attr("src", this.src);

			// callback
			options.callback(element, false);
		};

		img.src = src;
	});
}
})(jQuery);
