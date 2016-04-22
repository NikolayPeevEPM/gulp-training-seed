angular.module('mongolab-factory', [
    'ngResource'
]).provider('mongolabFactory', function (mongolabConfigs) {

    this.$get = function ($resource) {
        var c = mongolabConfigs;
        var url = [c.mongolabUrl, c.dataBase, 'collections', c.collection, ':id'].join('/');
        return $resource(url, {apiKey: c.apiKey}, {
            update: {method: 'PUT'}
        });
    };

}).constant('mongolabConfigs',  {
    mongolabUrl: 'https://api.mlab.com/api/1/databases',
    collection: 'bookmarks',
    dataBase: 'training-bookmarks',
    apiKey: '394dPk_y50KO8osDwbWD3fl_fuhT4EdM'
});
