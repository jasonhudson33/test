angular.module('ChildrenService', []).factory('Children', ['$http', function($http) {

    return {
        get : function() {
            return $http.get('/api/children/get');
        },
        delete : function(id) {
            return $http.delete('/api/nerds/' + id);
        },
        save : function(child) {
            return $http.post('/api/children/save', child);
        },
    }

}]);