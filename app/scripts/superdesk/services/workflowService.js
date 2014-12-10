define([
    'lodash',
    'angular',
    './preferencesService'
], function(_, angular) {
   'use strict';

    return angular.module('superdesk.workflow', [])
        .service('workflowService',  ['preferencesService', function(preferencesService) {
            var _actions = [];
            this.isActionAllowed = function isActionAllowed(item, actionName) {

                if (_.isUndefined(actionName) || _.isUndefined(item.state)) { return true; }

                var action = _.find(_actions, function(actionItem) {
                   return actionItem.name === actionName;
                });

                if (action) {
                    if (!_.isEmpty(action.include_states)) {
                        return (_.findIndex(action.include_states, function(state) { return item.state === state; }) >= 0);
                    } else if (!_.isEmpty(action.exclude_states)) {
                        return (_.findIndex(action.exclude_states, function(state) { return item.state === state; }) === -1);
                    }
                }

                return false;
            };

            this.setActions = function setActions(actions) {
              _actions = actions;
            };

            preferencesService.getActions().then(this.setActions);
    }]);
});
