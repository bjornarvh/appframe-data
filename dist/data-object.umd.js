(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('eventemitter3')) :
	typeof define === 'function' && define.amd ? define(['eventemitter3'], factory) :
	(global.getLocalizedString = factory(global.EventEmitter));
}(this, (function (EventEmitter) { 'use strict';

	EventEmitter = EventEmitter && EventEmitter.hasOwnProperty('default') ? EventEmitter['default'] : EventEmitter;

	function DataObject() {}

	DataObject.prototype = Object.create(EventEmitter.prototype);
	Object.defineProperty(DataObject.prototype, 'constructor', {
	  enumerable: false,
	  value: DataObject,
	  writable: true
	});

	DataObject.prototype.cancelEdit = function cancelEdit() {};

	DataObject.prototype.cancelField = function cancelField(field) {};

	DataObject.prototype.currentRow = function currentRow() {};

	DataObject.prototype.endEdit = function endEdit() {};

	DataObject.prototype.deleteCurrentRow = function deleteCurrentRow(callback) {};

	DataObject.prototype.deleteRow = function deleteRow(callback) {};

	DataObject.prototype.isDataLoaded = function isDataLoaded() {};

	DataObject.prototype.isDataLoading = function isDataLoading() {};

	DataObject.prototype.getCurrentIndex = function getCurrentIndex() {};

	DataObject.prototype.getData = function getData(index, field) {};

	DataObject.prototype.getDataLength = function getDataLength() {};

	DataObject.prototype.getDataSourceId = function getDataSourceId() {};

	DataObject.prototype.getFields = function getFields() {};

	DataObject.prototype.refreshCurrentRow = function refreshCurrentRow(callback) {};

	DataObject.prototype.refreshDataSource = function refreshDataSource(callback) {};

	DataObject.prototype.refreshRow = function refreshRow(index, callback) {};

	return DataObject;

})));
