var app = angular.module("myApp", [])
.controller("myCtrl", function($scope){
    var himSelf = this;
    $scope.matrixBack = function(){
        $scope.ret_arr = [];
        $scope.big_array = [
            [0,1,2,5,6,7,10,11,12],
            [1,2,3,6,7,8,11,12,13],
            [2,3,4,7,8,9,12,13,14],
            [5,6,7,10,11,12,15,16,17],
            [6,7,8,11,12,13,16,17,18],
            [7,8,9,12,13,14,17,18,19],
            [10,11,12,15,16,17,20,21,22],
            [11,12,13,16,17,18,21,22,23],
            [12,13,14,17,18,19,22,23,24]
        ];
        $scope.a = Math.floor(Math.random()*24);
        $scope.big_array.map((elm, mls)=>{
            $scope.ListOfWomen = $scope.big_array[mls].filter(function (i) {
                return (i == $scope.a);
            }, $scope.a);
            if($scope.ListOfWomen.length == 1){
               $scope.ret_arr.push($scope.big_array[mls])  
            }
        })
        console.log($scope.ret_arr)
        return $scope.ret_arr
    }
    $scope.dirOptNext = {};
    $scope.help = function(){
        $scope.dirOptNext.helpFunction()
    }
   
    $scope.back = function(){
        $scope.dirOptNext.backFunction()
    }

})
.directive("myMatrec", function($http, $window){
    return {
        restrict:"A",
        scope: { opt: '=', matrixBack:'&'},
      
        link: function(scope, elem, attrs){
            $http.get('js/images_data.json').success(function(data) {
                var name_images=[];
                for(var i =0 ; i < 25; i++){
                    var newEle = angular.element("<div class='red'><div class='back'></div><div class='front'></div></div>");
                    var target = document.querySelector('.main_content');
                    angular.element(target).append(newEle);
                }
                var emp_arr = [];
                var name_atLats, boolean = false;
                scope.count = 0;
                scope.Price_count = 0;
                const begin_image = () =>{
                    scope.count++;
                    if(scope.count > 30){
                        alert("Շնորհավորում եմ Դուք հաղթեցիք....")
                        $window.location.reload();
                    }
                    angular.element($(document.querySelector(".ng_binding_null"))[0]).html(" 1")
                    angular.element($(document.querySelector(".ng_binding_price"))[0]).html(scope.Price_count)
                    angular.element($(document.querySelector(".level_count"))[0]).html(scope.count)
                    scope.Price_count+=100;
                    $(document.querySelectorAll(".front")).css({
                        transform:"rotateY(0deg)"
                    })
                    const rand_ind = [[0,1,2], [0,3,6], [0,4,8],[0,1,4], [1,4,5],[2,4,1],[6,4,7],[3,4,7],[7,5,8],[3,1,4],[2,5,8], [1,4,7], [3,4,5], [6,7,8], [2,4,6]]; 
                    var shuffleArray = function(array) {
                    var m = array.length, t, i;
                      while (m) {
                        i = Math.floor(Math.random() * m--);
                        t = array[m];
                        array[m] = array[i];
                        array[i] = t;
                      }
                      return array;
                    }
                    
                    function diffArray(arr1, arr2) {
                     var newArr = [];
                      arr1.map(function(val){
                       arr2.indexOf(val) < 0 ? newArr.push(val) : '';
                      });
                      arr2.map(function(val){
                       arr1.indexOf(val) < 0 ? newArr.push(val) : '';
                      });
                      return newArr;
                    }
                    
                    var ret_func = scope.matrixBack()[0];
                    const any_obj_data = shuffleArray(data)
                    const any_obj_rand_ind = shuffleArray(rand_ind);
                    var child_back;
                    for(var i =0; i< ret_func.length; i++){
                        child_back = angular.element(target).children()[ret_func[i]] 
                        angular.element(child_back).children()[0].innerHTML = "<img src='img/baza_img/"+any_obj_data[0].img_parts+ret_func[i]+".png' class='img-fluid'>";
                    }
                    angular.forEach(any_obj_rand_ind[0], function(elm, mls){
                        $($(angular.element(target).children()[ret_func[any_obj_rand_ind[0][mls]]]).children()[0]).css({
                            transform:"rotateY(0deg)"
                        })
                        $($(angular.element(target).children()[ret_func[any_obj_rand_ind[0][mls]]]).children()[1]).css({
                            transform:"rotateY(-180deg)"
                        })
                    })
                    var ind  = diffArray([0,1,2,3,4,5,6,7,8], any_obj_rand_ind[0])
                    const help = () =>{
                        $($(angular.element(target).children()[ret_func[ind[0]]]).children()[0]).css({
                            transform:"rotateY(0deg)"
                        })
                        $($(angular.element(target).children()[ret_func[ind[0]]]).children()[1]).css({
                            transform:"rotateY(-180deg)"
                        })
                        angular.element($(document.querySelector(".ng_binding_null"))[0]).html(" 0")
                    }
                    angular.extend(scope.opt, {
                        helpFunction: function(){
                            help()
                        }
                    });
                    
                    const safe = any_obj_data[0];
                    
                    const wrk_func = () =>{
                        var bott_letter = angular.element(document.querySelector(".bottom_letters")),
                            count_letter = safe.letterCount; 
                        bott_letter.empty()
                        var newLetter = angular.element("<div class='d-flex justify-content-center'></div>"),
                            new_letter_change = angular.element("<div class='d-flex justify-content-center mt-2 bottom_child_letters flex-wrap '></div>");
                        angular.element(bott_letter).append(newLetter);
                        angular.element(bott_letter).append(new_letter_change);
                        for(var i =0; i< count_letter; i++){
                            angular.element(newLetter).append("<div class='letter' data-num="+i+"></div>");
                        }
                        const alphabet = ["Ա", "Բ", "Գ", "Դ", "Ե", "Զ", "Է", "Ը", "Թ", "Ժ", "Ի", "Լ", "Խ", "Ծ", "Կ", "Հ", "Ձ", "Ղ", "Ճ", "Մ", "Յ", "Ն", "Ո", "Չ", "Պ", "Ջ", "Ռ", "Ս", "Վ", "Տ", "Ր", "Ց", "ՈՒ", "Փ", "Ք", "և", "Օ", "Ֆ"];
                        const spl_name = safe.name.split(" ").join(" ").toUpperCase().split(" "),
                              shuffle_alpha = shuffleArray(diffArray(alphabet, spl_name));
                        var read_arr = [];
                        
                        for(var i =0; i< 16; i++){
                            if(read_arr.length < 16 - safe.letterCount){
                                read_arr.push(spl_name)
                                read_arr[0].unshift(shuffle_alpha[i])
                                shuffleArray(read_arr[0])
                            } 
                        }
                        var newLetterChange,
                            count_attr = -1,
                            right_count = -1;
                        const lett_back = document.querySelectorAll(".letter");
                        const back = () =>{
                            if(count_attr >= 0){
//                                console.log(count_attr)
                                $(".letter").removeClass("data_red")
                                $("[data-num="+count_attr+"].letter_change").html($("[data-num="+count_attr+"].letter").html());
                                $("[data-num="+count_attr+"].letter").html("");
                                $("[data-num="+count_attr+"].letter_change").removeAttr("data-num");
                                count_attr--
                                emp_arr.pop();
                            }
                        }
                        angular.extend(scope.opt, {
                            backFunction: function(){
                                back()
                            }
                        });
                        var newIMG = angular.element("<img class='img_rright' src='../img/baza_img/"+safe.imgFull+".png'>");
                        var rotALL = function (){
                            angular.element(target).append(newIMG);
                        }
                        angular.forEach(read_arr[0], function(elm, mls){
                            newLetterChange = angular.element("<div class='letter_change mt-2'>"+read_arr[0][mls]+"</div>");
                            angular.element(new_letter_change).append(newLetterChange);
                            $(newLetterChange).on("click", function(event){
                                if(count_attr < safe.letterCount - 1 && $(this).html() != ""){
                                    count_attr++;
                                    $("[data-num="+count_attr+"].letter").html($(this).html())
                                    $(this).attr("data-num", count_attr)
                                    $(this).html("")
                                    emp_arr.push($("[data-num="+count_attr+"].letter").html())
                                }
                                if(count_attr == safe.letterCount - 1){
                                    if(emp_arr.join(" ") == name_atLats){
                                        emp_arr.join(" ")
                                        emp_arr = [];
                                        rotALL()
                                        setTimeout(function(){
                                            newIMG.remove()
                                            begin_image()
                                        }, 1000)
                                    }
                                    else{
                                        $(".letter").addClass("data_red")
                                    }
                                }
                            })
                        })
                        return bott_letter
                    }
                    wrk_func()
                   name_atLats = data.splice(any_obj_data[0], 1)[0].name;
                }
                begin_image()
                
            })
        }
    }
})


