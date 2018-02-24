angular.module('ChildrenCtrl', []).controller('ChildrenController', function($scope, $http, Children) {
		var self = $scope;
		self.children =[];
		self.getChildren = function() {
			Children.get().then(function(children) {
				self.children = children.data;
			});
		}
	    self.getChildren();
		self.careCenters = [
			{ id: 'care-center', name: 'Care Center' },
			{ id: 'care-center-2', name: 'Another Care Center' }
		];
		self.orderBy = 'lName';
		self.reverseOrder = false;
		self.changeOrder = function(orderName) {
			self.orderBy = orderName;
			self.reverseSort = !self.reverseSort
		};
		
		self.getAge = function(dateString) {
			var today = new Date();
			var birthDate = new Date(dateString);
			var age = today.getFullYear() - birthDate.getFullYear();
			var m = today.getMonth() - birthDate.getMonth();
			if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
				age--;
			}
			return age;
		}
		self.getMonth = function(date) {
			var month = new Array();
			month[0] = "January";
			month[1] = "February";
			month[2] = "March";
			month[3] = "April";
			month[4] = "May";
			month[5] = "June";
			month[6] = "July";
			month[7] = "August";
			month[8] = "September";
			month[9] = "October";
			month[10] = "November";
			month[11] = "December";
			var n = month[date.getMonth()];
			return n;
		};
		self.getCareCenter = function(careCenterId) {
			var careCenterName = '';
			self.careCenters.filter(function(careCenter) {
				if ( careCenter.id == careCenterId ) {
					careCenterName = careCenter.name;
				}
			});
			return careCenterName;
		};
		self.addEditChild = function(child) {
			if ( child ) {
				self.selectedChild = child;
				if ( child.dob ) {
					child.dob = new Date(child.dob);
				}
			} else {
				self.selectedChild = {
					fName: '',
					lName: ''
				};
			}
			setTimeout(function() {
				var modal = document.getElementById('modal'),
					height = window.innerHeight,
					width = window.innerWidth,
					modalHeight = modal.offsetHeight,
					modalWidth = modal.offsetWidth;
				modal.style.left = ( ( width / 2 ) - ( modalWidth / 2 ) ) + 'px';
				modal.style.top = ( ( height / 2 ) - ( modalHeight / 2 ) ) + 'px';
			}, 100);
		};
		self.closeModal = function() {
			self.selectedChild = {};
		};
		self.saveChild = function(child) {
			Children.save(child).then(function(response) {
				self.closeModal();
				window.location.reload();
			});
		};
		self.getDateOfBirth = function(date) {
			if ( date ) { 
				let newDate = new Date(date)
				return self.getMonth(newDate) + ' ' + newDate.getFullYear()
			}
		};
		self.deleteChild = function(child) {
			console.log(child._id);
			Children.delete(child._id).then(function(response) {
				self.closeModal();
			});
		}
	// $scope.tagline = 'Nothing beats a pocket protector!';

});