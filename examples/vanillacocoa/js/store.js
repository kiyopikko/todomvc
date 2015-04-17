/*jshint eqeqeq:false */
(function (window) {
	'use strict';

	/**
	 * Creates a new client side storage object and will create an empty
	 * collection if no collection already exists.
	 *
	 * @param {string} name The name of our DB we want to use
	 * @param {function} callback Our fake DB uses callbacks because in
	 * real life you probably would be making AJAX calls
	 */
	function Store(name, milkcocoa, callback) {
		callback = callback || function () {};

		this.dataStore = milkcocoa.dataStore(name);
		var todos = this.dataStore.child("todos");

		todos.query().done(callback);
	}

	/**
	 * Finds items based on a query given as a JS object
	 *
	 * @param {object} query The query to match against (i.e. {foo: 'bar'})
	 * @param {function} callback	 The callback to fire when the query has
	 * completed running
	 *
	 * @example
	 * db.find({foo: 'bar', hello: 'world'}, function (data) {
	 *	 // data will return any items that have foo: bar and
	 *	 // hello: world in their properties
	 * });
	 */
	Store.prototype.find = function (query, callback) {
		if (!callback) {
			return;
		}

		var todos = this.dataStore.child("todos");

		todos.query(query).done(callback);
	};

	/**
	 * Will retrieve all data from the collection
	 *
	 * @param {function} callback The callback to fire upon retrieving data
	 */
	Store.prototype.findAll = function (callback) {
		callback = callback || function () {};

		var todos = this.dataStore.child("todos");
		todos.query().done(callback);
	};

	/**
	 * Will save the given data to the DB. If no item exists it will create a new
	 * item, otherwise it'll simply update an existing item's properties
	 *
	 * @param {object} updateData The data to save back into the DB
	 * @param {function} callback The callback to fire after saving
	 * @param {number} id An optional param to enter an ID of an item to update
	 */
	Store.prototype.save = function (updateData, callback, id) {
		var todos = this.dataStore.child("todos");

		callback = callback || function () {};

		// If an ID was actually given, find the item and update each property
		if (id) {
			todos.set(id, updateData);
			todos.query().done(callback);

		} else {
			// Generate an ID
			// ID is already exist in milkcocoa
			// updateData.id = new Date().getTime();

			todos.push(updateData);
			callback.call(this, [updateData]);
		}
	};

	/**
	 * Will remove an item from the Store based on its ID
	 *
	 * @param {number} id The ID of the item you want to remove
	 * @param {function} callback The callback to fire after saving
	 */
	Store.prototype.remove = function (id, callback) {
		var todos = this.dataStore.child("todos");

		todos.remove(id);

		todos.query().done(callback);
	};

	/**
	 * Will drop all storage and start fresh
	 *
	 * @param {function} callback The callback to fire after dropping the data
	 */
	Store.prototype.drop = function (callback) {
		var todos = this.dataStore.child("todos");

		todos.query().done(function(data) {
		  data.forEach(function(value) {
		    todos.remove(value.id);
		  });
		});

		todos.query().done(callback);
	};

	// Export to window
	window.app = window.app || {};
	window.app.Store = Store;
})(window);
