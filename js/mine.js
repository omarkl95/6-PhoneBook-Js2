

//DATA BASE

if(JSON.parse(localStorage.getItem('DB')) == null){
    var DB = [];
}else {
    var DB = JSON.parse(localStorage.getItem('DB'));
}


// get data from user
var userName = document.getElementById('userName');
var userPhone = document.getElementById('userPhone');
var userAddress = document.getElementById('userAddress');
var search = document.getElementById('search');
var list = document.getElementById('list');
var hideIcon = document.getElementById('hide-icon');
var showIcon = document.getElementById('show-icon');
var editLayer = document.getElementById('editLayer');
var contactCount ;

// get tags belong to contacts
var contactsList = document.getElementById('contactsList');
var count = document.getElementById('count');
var deleteContact = document.getElementById('deleteContact');



//get input alert object
var nameAlert = document.getElementById('nameAlert');
var phoneAlert = document.getElementById('phoneAlert');
var addressAlert = document.getElementById('addressAlert');
var DBAlert = document.getElementById('DB-alert');


var inputs = document.getElementsByTagName('input');
for(var i =0; i< inputs.length; i++){
    inputs[i].value.length = "10";
}

function add() {

    var falg = true;

 

    if(validationAll()) {
        DBAlert.style.display = "none";

        //create object and add contact to object

        if(DB.length == 0) {
            newContact(userName.value, userPhone.value, userAddress.value);
        } else {
            outer:
            for(var i = 0; i< DB.length; i++){
                if (userName.value.toLowerCase().trim() == DB[i].name  || userPhone.value.toLowerCase().trim() == DB[i].phone ||                 userAddress.value.toLowerCase().trim() == DB[i].address  ) {
                  falg = false;
                  break outer;
                }
 
            }

            if(falg) {
                newContact(userName.value, userPhone.value, userAddress.value);
            }else {
                alert("Contact info already exist!!")
            }
        }

    }
   
}

function newContact(name , phone , address) {
    var contact = {
        name: name,
        phone: phone,
        address: address
    }

    //push obj to DB
    DB.push(contact);

    sortArray(DB);

    //push DB to localStorage
    localStorage.setItem('DB', JSON.stringify(DB));

    //clear input data
    clear();

    //print data in screen
    show();
}

// load all data 
(function(){
    show();
})();


function lists(contactsNumber) {
    show(contactsNumber);
}

//Sort array by name
function sortArray(arr) {
    var temp = 0;
    for(var i = 0 ; i < arr.length ; ++i) {
        for(var j = 0 ; j < arr.length - 1 ; ++j) {
            if(arr[j].name.charCodeAt(0) <  arr[j+1].name.charCodeAt(0)){
                temp = arr[j+1] ;
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    console.log(arr);
}

// print contacts 
function show(numberOfContacts) {
    var temp = "";
    DBAlert.style.display = "none";;
    var counter = 0;
    if(numberOfContacts === undefined || numberOfContacts > DB.length || numberOfContacts == "") {
        numberOfContacts = DB.length;
    }
    if(DB.length != 0) {
        for(var i = 0 ; i < numberOfContacts ; ++i) {
            counter = i+1;
            temp+= '<div class="contact"><div>'+ DB[i].name +'</div> <div>'+DB[i].phone +'</div> <div>'+DB[i].address+'</div> <div><i onClick="deletes(\''+i+' \')" id="deleteContact" onmouseover="dHover(this.parentElement)" onmouseout="sHover(this.parentElement)" class="fas contact-icon fa-minus-circle"></i><i  class="fas contact-icon fa-edit"></i> <a href=tel:\''+DB[i].phone+'\'><i class="fas contact-icon fa-phone-volume"></i></a></div></div>'
        }   

        contactsList.innerHTML = temp;
        counters(counter);
    }else {
        contactsList.innerHTML = temp;
        counters(counter);
        DBAlert.style.display = "block";
    }
}

//search for client by name / phone /address
function searcher() {
    var temp ="";
    var length  = search.value.length;
    if(!searchValidation()) {
        contactsList.innerHTML= "";
        DBAlert.innerHTML = "NOT FOUND";
        DBAlert.style.display = "block";
     
        for(var i = 0; i< DB.length; i++) {
                length  = search.value.length;
                if(check(DB[i].name , length , search) || check(DB[i].phone , length , search) || check(DB[i].address , length , search)) {
                    DBAlert.style.display = "none";
                    //alert( search.value.length)
                    temp+= '<div class="contact"><div>'+ DB[i].name +'</div> <div>'+DB[i].phone +'</div> <div>'+DB[i].address+'</div> <div><i onClick="deletes(\''+i+' \')" id="deleteContact"  class="fas contact-icon fa-minus-circle"></i><i   class="fas contact-icon fa-edit"></i> <a href=tel:\''+DB[i].phone+'\'><i class="fas contact-icon fa-phone-volume"></i></a></div></div>'
                    contactsList.innerHTML= temp;
                }
        }
    }
}

//object validation 
function check(index , length , search) {
    var z = 0, j = 0;
    inner:
    while(length-- != 0) {
        if(index.charCodeAt(j) ==  search.value.charCodeAt(z)){
            z++;
            j++;
            continue inner;
        }
        return false;
    }
    return true;
}

// delete all contacts
function deleteAllContacts() {
  if( DB.length == 0) {
    alert('No any contacts to delete!!')
  }else {
    if (confirm('Are you sure, you will delete '+ calc() +' conatact!')) {
        // remove all contacts form DB
        DB.splice(0,20000000);
        localStorage.removeItem('DB');
        //print data in screen
        show();
      } 
}
}

//delete one contact 
function deletes(key) {
     
    var removeItem = JSON.parse(localStorage.getItem('DB'));
    for(var i = 0; i< removeItem.length; i++) {
        if(i == key) {
            removeItem.splice(i,1);
            break;
        }
    }
    localStorage.setItem('DB' , JSON.stringify(removeItem));
    DB = JSON.parse(localStorage.getItem('DB'));
    show();
}

//delete all conatacts hove
function deleteHoverShow(obj){
  
    var contact = document.querySelectorAll('.contact');
    for(var i = 0 ; i < contact.length ; ++i) {
        contact[i].setAttribute("style", "background-color: rgba(255, 0, 0, 0.548");
    }
 }

 //delete one contact hover
 function  dHover(obj){
     obj.parentElement.setAttribute("style", "background-color: rgba(255, 0, 0, 0.548");
 }

 //set to normal style 
 function  sHover(obj){
    obj.parentElement.setAttribute("style", "background-color: #f1f1f1");
}

//all set to normail style after delete hover
function deleteHoverHide(obj){
    var contact = document.querySelectorAll('.contact');
    for(var i = 0 ; i < contact.length ; ++i) {
        contact[i].setAttribute("style", "background-color: #f1f1f1");
    }
 }

//show /hide all conatacts hove
function toggleShow(){

    if(contactsList.innerHTML == "") {
        hideIcon.setAttribute('class','fas fa-eye-slash show-all');
        show(100000);
    }else {
        hideIcon.setAttribute('class','fas fa-eye show-all show-all');
        hideIcon.setAttribute('id','show-icon');
        contactsList.innerHTML=""
    }
}

// clear input data
function clear() {
    userName.value = "";
    userPhone.value = "";
    userAddress.value = "";
    search.value = "";
    list.value = "";
}

//counter to count all contacts in DB
function counters( num ) {
    count.innerHTML = num;
    return num;
}

// validation function
function validationAll (){
    if(nameValidation()) {
        return false;
    }
    else if (phoneValidation()){
        return false;
    }
    else if(addressValidation()){
        return false;
    }
    else {
        return true;
    }
}

//search validation
function searchValidation() {
    if(search.value.trim() == "") {
        addAlertShadow(search);
        return true;
    } else {
        removeAlertShadow(search);
        return false;
    }
}

//list validation
function listValidation() {
    if(list.value.trim() == "") {
        addAlertShadow(list);
        return true;
    } else {
        removeAlertShadow(list);
        return false;
    }
}

//name validation
function nameValidation() {
    if(userName.value.trim() == "") {
        addAlertShadow(userName);
        addAlert(nameAlert);
        return true;
    } else {
        removeAlertShadow(userName);
        removeAlert(nameAlert);
        return false;
    }
}

//phone validation 
function phoneValidation() {
    if(userPhone.value.trim() == "") {
        addAlertShadow(userPhone);
        addAlert(phoneAlert);
        return true;
    } else {
        removeAlertShadow(userPhone);
        removeAlert(phoneAlert);
        return false;
    }
}
// address validiation
function addressValidation() {
    if(userAddress.value.trim() == "") {
        addAlertShadow(userAddress);
        addAlert(addressAlert);
        return true;
    } else {
        removeAlertShadow(userAddress);
        removeAlert(addressAlert);
        return false;
    }

}

//remove alert 
function removeAlert(obj) { 
    obj.style.display = "none";
}

//add alert  
function addAlert(obj) {
    obj.style.display = "block";
}

//remove alert shadow
function removeAlertShadow(obj) { 
    obj.style.boxShadow="0 0 3px 3px rgba(30, 143, 255, 0.5)";
    obj.style.border="1px solid #1e90ff";
}

//add alert shadow 
function addAlertShadow(obj) {
    obj.style.boxShadow="0 0 3px 3px #f8d7da"
    obj.style.border="1px solid #f8d7da";
}


function calc(){
    for(var i = 0; i <  DB.length ; i++) {
        contactCount = i;
    }
    return contactCount;
}