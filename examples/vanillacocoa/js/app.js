/*global app, $on */
(function () {
	'use strict';

	/**
	 * Sets up a brand new Todo list.
	 *
	 * @param {string} name The name of your new to do list.
	 */

	 var mlk = new MilkCocoa('https://io-gi85lcth1.mlkcca.com:443');

	function Todo(name, milkcocoa) {
		this.storage = new app.Store(name, milkcocoa);
		this.model = new app.Model(this.storage);
		this.template = new app.Template();
		this.view = new app.View(this.template);
		this.controller = new app.Controller(this.model, this.view, this.storage);
	}

	var todo = new Todo("todos-vanillacocoa", mlk);

	function setView() {
		todo.controller.setView(document.location.hash);
	}
	$on(window, 'load', setView);
	$on(window, 'hashchange', setView);
})();
