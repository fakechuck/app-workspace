var Workspace, em, connection;

em = (function() {
	var unit;

	function em() {}

	unit = {};

	em.unit = unit;

	return em;

})();
var app = jQuery("#application");
var home =  app.data("home");
var apphome = home + app.data("apphome");
var componentroot = apphome + '/components/annotations/workspace';
var collectionid = $("#collectiontoplevel").data("collectionid");
console.log(collectionid);


 if (window.WebSocket) {
 	var connection = new WebSocket('ws://localhost:8080/examples/websocket/echoProgrammatic');
 	connection.onopen = function(e) {
 		console.log('Opened a connection!');
 		console.log(e);
 	};
 	connection.onclose = function(e) {
 		console.log('Closed a connection!');
 		console.log(e);
 	};
 	connection.onerror = function(e) {
 		console.log('Connection error!');
 		console.log(e);
 	};
 } else {
 	// we have to use something else... long-polling? connection is null now
 	console.log('WebSocket is just not implemented here.');
 }

Workspace = angular.module('Workspace', ['ui.router', 'ngTable', 'colorpicker.module', 'btford.socket-io']);

Workspace.run([
	'$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
		return em.unit;
	}
]);

Workspace.config([
	'$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider.state('app', {
			abstract: true,
			views: {
				'svgIncludes': {
					templateUrl: componentroot + '/partials/svg/svg-definitions.tpl.html'
			},
				'mainMenu': {
					templateUrl: componentroot + '/partials/navigation/main-menu.tpl.html'
				},
				'sidebar': {
					templateUrl: componentroot + '/partials/navigation/sidebar.tpl.html',
					controller: 'SidebarCtrl'
				}
			}
		}).state('app.dashboard', {
			url: '/',
			views: {
				'mainContentArea@': {
					templateUrl: componentroot + '/partials/dashboard/dashboard.tpl.html',
					controller: 'DashboardCtrl'
				}
			}
		}).state('app.annotations', {
			url: '/annotations',
			views: {
				'mainContentArea@': {
					templateUrl: componentroot + '/partials/annotations/annotations.tpl.html',
					controller: 'AnnotationCtrl'
				}
			}
		}).state('app.annotations.details', {
			url: '/:annotationID',
			views: {
				'mainContentArea@': {
					templateUrl: componentroot + '/partials/annotations/annotation-details.tpl.html',
					controller: 'AnnotationDetailsCtrl'
				}
			}
		}).state('app.projects', {
			url: '/projects',
			views: {
				'mainContentArea@': {
					templateUrl: componentroot + '/partials/projects/projects.tpl.html',
					controller: 'ProjectCtrl'
				}
			}
		}).state('app.projects.details', {
			url: '/:projectID',
			views: {
				'mainContentArea@': {
					templateUrl: componentroot + '/partials/projects/project-details.tpl.html',
					controller: 'ProjectDetailsCtrl'
				}
			}
		}).state('app.programs', {
			url: '/#/',
			views: {
				'mainContentArea@': {
					templateUrl: componentroot + '/partials/projects/program-details.tpl.html',
					controller: 'ProgramDetailsCtrl'
				}
			}
		}).state('app.libraries', {
			url: '/#/',
			views: {
				'mainContentArea@': {
					templateUrl: componentroot + '/partials/projects/library-details.tpl.html',
					controller: 'LibraryDetailsCtrl'
				}
			}
		}).state('app.collections', {
			url: '/#/',
			views: {
				'mainContentArea@': {
					templateUrl: componentroot + '/partials/projects/collection-details.tpl.html',
					controller: 'CollectionDetailsCtrl'
				}
			}
		});
		return em.unit;
	}
]);
