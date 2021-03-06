/**
 * @ngdoc object
 * @name app.sales-mgmt
 * @requires app.main
 * @requires app.offer-mgmt
 * @requires sales-mgmt.templates
 * @module app
 */
angular.module('app.sales-mgmt', ['app.main', 'app.offer-mgmt', 'app.sales-mgmt.templates'])
    .config(function ($stateProvider, oaspAuthorizationServiceProvider, ROLES, oaspTranslationProvider) {
        'use strict';
        oaspTranslationProvider.enableTranslationForModule('sales-mgmt');

        $stateProvider.state('salesMgmt', {
            abstract: true,
            url: '/sales-mgmt',
            template: '<ui-view/>',
            ncyBreadcrumb: {
                label: 'Sales Management'
            }
        });

        $stateProvider.state('salesMgmt.cookPositions',
            oaspAuthorizationServiceProvider.usersHavingAnyRoleOf(ROLES.COOK).mayGoToStateDefinedAs(
                {
                    url: '/cook-positions',
                    templateUrl: 'sales-mgmt/cook-positions/cook-positions.html',
                    controller: 'CookPositionsCntl',
                    controllerAs: 'CPC',
                    resolve: {
                        currentPositions: ['positions', function (positions) {
                            return positions.get();
                        }]
                    },
                    ncyBreadcrumb: {
                        label: 'Cook Positions'
                    }
                }
            )
        );
    });

