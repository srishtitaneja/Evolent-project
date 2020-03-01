'use strict';

    angular.module('myApp.view1', ['ngRoute'])

        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/contact-details', {
                templateUrl: 'view1/view1.html',
                controller: 'View1Ctrl'
            });
     }]).controller('View1Ctrl', View1Ctrl);
View1Ctrl.inject = ['$scope', '$window', '$q'];

function View1Ctrl($scope, $window, $q) {
      var vm = $scope.vm = {};
    vm.submitted = false;
    function success() {
        $window.alert('Contact saved successfully!');
    }

    function failure() {
        $window.alert('Oops!');
    }

    vm.newContact = {};
    vm.contactsListArray = [];
    vm.submit = function () {
        vm.submitted = true;

        var empid = 0;
        if($scope.contactForm.$valid) {
            if (vm.newContact.id == null) {

                vm.newContact.id = empid++;

                vm.contactsListArray.push(vm.newContact);
                success(0);

            } else {

                for (var i in vm.contactsListArray) {

                    if (vm.contactsListArray[i].id === vm.newContact.id) {

                        vm.contactsListArray[i] = vm.newContact;

                    }

                }

            }
            vm.newContact = {};

        } else {
            $window.alert('Please fix any validation errors and try again.');
        }
    };

    vm.listContacts = function() {
        vm.showList = true;
        return vm.contactsListArray;
    };

    vm.delete = function (id) {

        for (var i in vm.contactsListArray) {

            if (vm.contactsListArray[i].id === id) {

                vm.contactsListArray.splice(i, 1);
            }

        }

    };

    vm.edit = function (id) {

        for (var i in vm.contactsListArray) {

            if (vm.contactsListArray[i].id === id) {

                vm.newContact = angular.copy(vm.contactsListArray[i]);

            }

        }

    };

};

