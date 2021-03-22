myApp.controller('AutoCompleteController', ["$scope", "$state", "$http",

    function ($scope, $state, $http, inp, arr) {

        console.log('this is the AutoComplete controller, hi!');


        $scope.gotohome = function () {
            $state.go("home");
        }

        var items = [{ "id": 25, "name": "Worn Shortsword" }, { "id": 35, "name": "Bent Staff" }, { "id": 36, "name": "Worn Mace" }, { "id": 37, "name": "Worn Axe" }, { "id": 38, "name": "Recruit's Shirt" }, { "id": 39, "name": "Recruit's Pants" }, { "id": 40, "name": "Recruit's Boots" }, { "id": 43, "name": "Squire's Boots" }, { "id": 44, "name": "Squire's Pants" }, { "id": 45, "name": "Squire's Shirt" }, { "id": 47, "name": "Footpad's Shoes" }, { "id": 48, "name": "Footpad's Pants" }, { "id": 49, "name": "Footpad's Shirt" }, { "id": 51, "name": "Neophyte's Boots" }, { "id": 52, "name": "Neophyte's Pants" }, { "id": 53, "name": "Neophyte's Shirt" }, { "id": 55, "name": "Apprentice's Boots" }, { "id": 56, "name": "Apprentice's Robe" }, { "id": 57, "name": "Acolyte's Robe" }, { "id": 59, "name": "Acolyte's Shoes" }, { "id": 60, "name": "Layered Tunic" }, { "id": 61, "name": "Dwarven Leather Pants" }, { "id": 79, "name": "Dwarven Cloth Britches" }, { "id": 80, "name": "Soft Fur-Lined Shoes" }, { "id": 85, "name": "Dirty Leather Vest" }, { "id": 117, "name": "Tough Jerky" }, { "id": 118, "name": "Minor Healing Potion" }, { "id": 120, "name": "Thug Pants" }, { "id": 121, "name": "Thug Boots" }, { "id": 127, "name": "Trapper's Shirt" }, { "id": 129, "name": "Rugged Trapper's Boots" }, { "id": 139, "name": "Brawler's Pants" }, { "id": 140, "name": "Brawler's Boots" }, { "id": 147, "name": "Rugged Trapper's Pants" }, { "id": 148, "name": "Rugged Trapper's Shirt" }, { "id": 153, "name": "Primitive Kilt" }, { "id": 159, "name": "Refreshing Spring Water" }, { "id": 182, "name": "Garrick's Head" }, { "id": 193, "name": "Tattered Cloth Vest" }, { "id": 194, "name": "Tattered Cloth Pants" }, { "id": 195, "name": "Tattered Cloth Boots" }, { "id": 200, "name": "Thick Cloth Vest" }, { "id": 201, "name": "Thick Cloth Pants" }, { "id": 202, "name": "Thick Cloth Shoes" }, { "id": 203, "name": "Thick Cloth Gloves" }, { "id": 209, "name": "Dirty Leather Pants" }, { "id": 210, "name": "Dirty Leather Boots" }, { "id": 236, "name": "Cured Leather Armor" }, { "id": 237, "name": "Cured Leather Pants" }, { "id": 238, "name": "Cured Leather Boots" }, { "id": 239, "name": "Cured Leather Gloves" }, { "id": 285, "name": "Scalemail Vest" }, { "id": 286, "name": "Scalemail Pants" }, { "id": 287, "name": "Scalemail Boots" }, { "id": 414, "name": "Dalaran Sharp" }, { "id": 422, "name": "Dwarven Mild" }, { "id": 537, "name": "Dull Frenzy Scale" }, { "id": 555, "name": "Rough Vulture Feathers" }, { "id": 556, "name": "Buzzard Beak" }, { "id": 647, "name": "Destiny" }, { "id": 710, "name": "Bracers of the People's Militia" }, { "id": 711, "name": "Tattered Cloth Gloves" }, { "id": 714, "name": "Dirty Leather Gloves" }, { "id": 718, "name": "Scalemail Gloves" }, { "id": 719, "name": "Rabbit Handler Gloves" }, { "id": 720, "name": "Brawler Gloves" }, { "id": 723, "name": "Goretusk Liver" }, { "id": 724, "name": "Goretusk Liver Pie" }, { "id": 725, "name": "Gnoll Paw" }, { "id": 727, "name": "Notched Shortsword" }, { "id": 728, "name": "Recipe: Westfall Stew" }, { "id": 729, "name": "Stringy Vulture Meat" }, { "id": 730, "name": "Murloc Eye" }, { "id": 731, "name": "Goretusk Snout" }, { "id": 732, "name": "Ripe Okra" }, { "id": 733, "name": "Westfall Stew" }, { "id": 735, "name": "Rolf and Malakai's Medallions" }, { "id": 737, "name": "Holy Spring Water" }, { "id": 738, "name": "Sack of Barley" }, { "id": 739, "name": "Sack of Corn" }, { "id": 740, "name": "Sack of Rye" }, { "id": 742, "name": "A Sycamore Branch" }, { "id": 743, "name": "Bundle of Charred Oak" }, { "id": 744, "name": "Thunderbrew's Boot Flask" }, { "id": 745, "name": "Marshal McBride's Documents" }, { "id": 748, "name": "Stormwind Armor Marker" }, { "id": 750, "name": "Tough Wolf Meat" }, { "id": 752, "name": "Red Burlap Bandana" }, { "id": 753, "name": "Dragonmaw Shortsword" }, { "id": 754, "name": "Shortsword of Vengeance" }, { "id": 755, "name": "Melted Candle" }, { "id": 756, "name": "Tunnel Pick" }, { "id": 763, "name": "Ice-Covered Bracers" }, { "id": 765, "name": "Silverleaf" }, { "id": 766, "name": "Flanged Mace" }, { "id": 767, "name": "Long Bo Staff" }, { "id": 768, "name": "Lumberjack Axe" }, { "id": 769, "name": "Chunk of Boar Meat" }, { "id": 770, "name": "Pointy Crocolisk Tooth" }, { "id": 771, "name": "Chipped Boar Tusk" }];
        var countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Arfrican Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

        $scope.reloadItemsList = function () {
            console.log("attempting to reload");
            $http({
                method: 'GET',
                url: 'http://localhost:5000/api/ahprices/items/local'
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                console.log('get ok');
                var countries = response.data.map(item => item.name);
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log('get nok');
                var countries = items.map(item => item.name);
                $scope.ahData = "Couldnt load API data";
            });
        }



        //Autocomplete function from https://www.w3schools.com/howto/howto_js_autocomplete.asp
        function autocomplete(inp, arr) {
            /*the autocomplete function takes two arguments,
            the text field element and an array of possible autocompleted values:*/
            var currentFocus;
            /*execute a function when someone writes in the text field:*/
            inp.addEventListener("input", function (e) {
                var a, b, i, val = this.value;
                /*close any already open lists of autocompleted values*/
                closeAllLists();
                if (!val) { return false; }
                currentFocus = -1;
                /*create a DIV element that will contain the items (values):*/
                a = document.createElement("DIV");
                a.setAttribute("id", this.id + "autocomplete-list");
                a.setAttribute("class", "autocomplete-items");
                /*append the DIV element as a child of the autocomplete container:*/
                this.parentNode.appendChild(a);
                /*for each item in the array...*/
                for (i = 0; i < arr.length; i++) {
                    /*check if the item starts with the same letters as the text field value:*/
                    if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                        /*create a DIV element for each matching element:*/
                        b = document.createElement("DIV");
                        /*make the matching letters bold:*/
                        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                        b.innerHTML += arr[i].substr(val.length);
                        /*insert a input field that will hold the current array item's value:*/
                        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                        /*execute a function when someone clicks on the item value (DIV element):*/
                        b.addEventListener("click", function (e) {
                            /*insert the value for the autocomplete text field:*/
                            inp.value = this.getElementsByTagName("input")[0].value;
                            /*close the list of autocompleted values,
                            (or any other open lists of autocompleted values:*/
                            closeAllLists();
                        });
                        a.appendChild(b);
                    }
                }
            });
            /*execute a function presses a key on the keyboard:*/
            inp.addEventListener("keydown", function (e) {
                var x = document.getElementById(this.id + "autocomplete-list");
                if (x) x = x.getElementsByTagName("div");
                if (e.keyCode == 40) {
                    /*If the arrow DOWN key is pressed,
                    increase the currentFocus variable:*/
                    currentFocus++;
                    /*and and make the current item more visible:*/
                    addActive(x);
                } else if (e.keyCode == 38) { //up
                    /*If the arrow UP key is pressed,
                    decrease the currentFocus variable:*/
                    currentFocus--;
                    /*and and make the current item more visible:*/
                    addActive(x);
                } else if (e.keyCode == 13) {
                    /*If the ENTER key is pressed, prevent the form from being submitted,*/
                    e.preventDefault();
                    if (currentFocus > -1) {
                        /*and simulate a click on the "active" item:*/
                        if (x) x[currentFocus].click();
                    }
                }
            });
            function addActive(x) {
                /*a function to classify an item as "active":*/
                if (!x) return false;
                /*start by removing the "active" class on all items:*/
                removeActive(x);
                if (currentFocus >= x.length) currentFocus = 0;
                if (currentFocus < 0) currentFocus = (x.length - 1);
                /*add class "autocomplete-active":*/
                x[currentFocus].classList.add("autocomplete-active");
            }
            function removeActive(x) {
                /*a function to remove the "active" class from all autocomplete items:*/
                for (var i = 0; i < x.length; i++) {
                    x[i].classList.remove("autocomplete-active");
                }
            }
            function closeAllLists(elmnt) {
                /*close all autocomplete lists in the document,
                except the one passed as an argument:*/
                var x = document.getElementsByClassName("autocomplete-items");
                for (var i = 0; i < x.length; i++) {
                    if (elmnt != x[i] && elmnt != inp) {
                        x[i].parentNode.removeChild(x[i]);
                    }
                }
            }
            /*execute a function when someone clicks in the document:*/
            document.addEventListener("click", function (e) {
                closeAllLists(e.target);
            });
        }

        autocomplete(document.getElementById("myInput"), countries);

    }
]);
