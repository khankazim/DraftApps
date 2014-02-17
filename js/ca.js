function getAnswer(ans) {
	$(document.getElementById('ShowAnswerDiv')).html('<strong>Answer: '+ans+'</strong>');
}

function checkConnecvity() {
	if (!navigator.onLine )   {
		alert('It seems you are not connected to internet..');
	    return false;
	}
	var agent  = navigator.userAgent;
    $.ajax({
    	  async: false,
        jsonp: 'callback',
        url : 'http://careeraddons.com/MyAddons/MESC',
        dataType : 'jsonp',
        jsonpCallback : '_checkConnecvity',
        data : {
             method : 'jsonp',
             action:  'checkConnectivity',
             sourceAgent:  agent,
             },
        success: function( data, textStatus, jqXHR) {
        },
        error:function(){
        	 if (jqXHR.status === 0) {
                        alert('Not connect.\n Verify Network.');
                    } else if (jqXHR.status == 404) {
                        alert('Requested page not found. [404]');
                    } else if (jqXHR.status == 500) {
                        alert('Internal Server Error [500].');
                    } else if (exception === 'parsererror') {
                        alert('Requested JSON parse failed.');
                    } else if (exception === 'timeout') {
                       alert('Time out error.');
                    } else if (exception === 'abort') {
                       alert('Ajax request aborted.');
                    } else {
                        alert('Uncaught Error.\n' + jqXHR.responseText);
                    }
            }
     });

}
function _checkConnecvity(response) {

	if (response.Status==true ) {
		$(document.getElementById('checkConnecvityDiv')).html(response.WelcomeText);
   	}
	else
		{
		$(document.getElementById('checkConnecvityDiv')).html('<br/>');

		}
}






function startExam(_subaction) {
	var qc =0;

	if(typeof document.forms["dummy"]["QCounter"].value !== "undefined") {

		qc = document.forms["dummy"]["QCounter"].value;
}


	var cq =0;
	if ( typeof document.forms["dummy"]["CurrentQID"].value !== "undefined") {
		cq = document.forms["dummy"]["CurrentQID"].value;
	}


	se(document.forms["dummy"]["ExamCode"].value, _subaction,qc,cq);

    //alert ( 'After QCounter :'+document.forms["dummy"]["QCounter"].value);

	//alert ( 'After CurrentQID :'+document.forms["dummy"]["CurrentQID"].value);


}
function se(_examCode , _subaction,_QCounter, _CurrentQID) {
    $.ajax({
    	  async: false,
        jsonp: 'callback',
        url : 'http://careeraddons.com/MyAddons/MESC',
        dataType : 'jsonp',
        jsonpCallback : '_startExamcallback',
        data : {
             method : 'jsonp',
             action:  'Question',
             examCode: _examCode,
             subaction: _subaction,
             QCounter : _QCounter,
            CurrentQID :_CurrentQID,

         },
        success: function( data, textStatus, jqXHR) {
        	//alert(data);

        },
        error:function(){
        	 if (jqXHR.status === 0) {
                        alert('Not connect.\n Verify Network.');
                    } else if (jqXHR.status == 404) {
                        alert('Requested page not found. [404]');
                    } else if (jqXHR.status == 500) {
                        alert('Internal Server Error [500].');
                    } else if (exception === 'parsererror') {
                        alert('Requested JSON parse failed.');
                    } else if (exception === 'timeout') {
                       alert('Time out error.');
                    } else if (exception === 'abort') {
                       alert('Ajax request aborted.');
                    } else {
                        alert('Uncaught Error.\n' + jqXHR.responseText);
                    }
            }
     });
}

function _startExamcallback(response) {
	//alert("_startExamcallback Response from crossfff origin: " + response.Status);

		$(document.getElementById('QuestionMessageDiv')).html(' ');
		$(document.getElementById('QuestionPaneDiv')).html(' ');
		$(document.getElementById('ShowAnswerDiv')).html(' ');
		$(document.getElementById('PreviousDiv')).html(' ');

		$(document.getElementById('NextDiv')).html(' ');

	if (response.Status==true ) {
		$(document.getElementById('QuestionPaneDiv')).html(response.QuestionText);
 		$(document.getElementById('ShowAnswerDiv')).html('<br/> <a onclick="javaScript:getAnswer(\''+response.Answer+'\');"  class="ui-btn ui-btn-inline">Answer</a><br />  ');

 		document.forms["dummy"]["QCounter"].value = response.QCounter;
        document.forms["dummy"]["CurrentQID"].value = response.CurrentQID;
      //  document.forms["dummy"]["TotalQuestion"].value  = response.TotalQuestion;

        //alert('parseInt(document.forms["dummy"]["QCounter"].value) :'+parseInt(document.forms["dummy"]["QCounter"].value));

    	if (parseInt(document.forms["dummy"]["QCounter"].value) < parseInt(document.forms["dummy"]["TotalQuestion"].value) ) {
    		$(document.getElementById('NextDiv')).html('  <a onclick="javaScript:startExam(\'next\');"  class="ui-btn ui-shadow ui-corner-all">  Next  </a>');
    		}
    		else
    			{
    			$(document.getElementById('NextDiv')).html(' ');
    			}



	if (parseInt(document.forms["dummy"]["QCounter"].value) > 1 ) {
		$(document.getElementById('PreviousDiv')).html('  <a onclick="javaScript:startExam(\'previous\');"  class="ui-btn ui-shadow ui-corner-all">Previous</a>  ');
	}
	else
		{
		$(document.getElementById('PreviousDiv')).html(' <br /> ');
		}

	 //alert('parseInt(document.forms["dummy"]["QCounter"].value)) :'+parseInt(document.forms["dummy"]["QCounter"].value));

	 //alert('parseInt(document.forms["dummy"]["QCounter"].value) :'+parseInt(document.forms["dummy"]["QCounter"].value));

 	}
	else
		{
		    //alert("Response from crossfff origin: " + response.Status);

		}
}

function vendorChangeEvent() {
	 //alert($('#VendorList').find(":selected").text());
	// $(document.getElementById('selectedVendor')).html( $('#VendorList').find(":selected").text());
	 fetchExamsList('AvlExams',$('#VendorList').find(":selected").text());

 }


 function examChangeEvent() {
	 //alert($('#ExamList').find(":selected").text());
	// $(document.getElementById('selectedVendor')).html( $('#ExamList').find(":selected").text());
	 fetchExamDetails('DtlExam',$('#ExamList').find(":selected").text());

	document.forms["dummy"]["ExamCode"].value =  $('#ExamList').find(":selected").text();

 }

   function fetchExamDetails(_action,_subaction) {
     $.ajax({
         jsonp: 'callback',
         url : 'http://careeraddons.com/MyAddons/MESC',
         dataType : 'jsonp',
         jsonpCallback : '_fetchExamDetailscallback',
         data : {
              method : 'jsonp',
              action:  _action,
              subaction: _subaction,
          },
         success: function( data, textStatus, jqXHR) {
         	//alert(data);
         	$("#StartExamDiv").show();
         }
     });
 }
 function _fetchExamDetailscallback(response) {
 	//alert("Response from crossfff origin: " + response.Status);
 	if (response.Status==true ) {

 		$(document.getElementById('selectedExam')).html(response.ExamDetails);
 	 	//alert('begin _fetchExamDetailscallback..');
 		//$("#StartExamDiv").show();
 		$(document.getElementById('StartExamDiv')).html('<br/> <a href="#startExam" onclick="javaScript:startExam(\'next\');"  class="ui-btn ui-shadow ui-corner-all">Start '+$('#ExamList').find(":selected").text()+' Simulator </a>');

		document.forms["dummy"]["TotalQuestion"].value =  response.TotalQuestion;

 		//alert('<br/> <a href="#startExam" onclick="javaScript:hahastartExam();"  class="ui-btn ui-shadow ui-corner-all">Start '+$('#ExamList').find(":selected").text()+' Simulator </a>');
 	}
 	else
 		{
 		    //alert("Response from crossfff origin: " + response.StatusObject.statusDesc);
 		    //alert("Response from crossfff origin: " + response.StatusObject.message1);
 		}
 }


function delegateAction(actionParam) {
	if (actionParam=='SignUp') {
		doSignUp(document.forms["form1"]["fName"].value,document.forms["form1"]["userName1"].value,document.forms["form1"]["password1"].value);

	}

	if (actionParam=='SignIn') {

		doSignIn(document.forms["loginForm"]["userName"].value , document.forms["loginForm"]["password"].value);
	}


 	return false;

}


function doSignIn(uname,psswd) {
    $.ajax({
  	    async: false,
        jsonp: 'callback',
        url : 'http://careeraddons.com/MyAddons/MESC',
        dataType : 'jsonp',
        jsonpCallback : '_doSignIncallback',
        data : {
             method : 'jsonp',
             action: 'login',
             userName : uname,
             password: psswd ,
         },
        success: function( data, textStatus, jqXHR) {
        	//alert(data);
        }
    });
}
function _doSignIncallback(response) {

	if (response.Status==true ) {
		$(document.getElementById('counterDiv')).empty();
		$(document.getElementById('messageDiv1')).html( response.notice);
		$(document.getElementById('bodyDiv1')).empty();
		$(document.getElementById('bodyDiv1')).html(response.VendorPane);

	}
	else
		{
		alert(response.notice);
		//$(document.getElementById('counterDiv')).empty();
		$(document.getElementById('messageDiv1')).html( response.notice);
		$(document.getElementById('bodyDiv1')).empty();
		$(document.getElementById('bodyDiv1')).html(response.VendorPane);

		    //alert("Response from crossfff origin: " + response.StatusObject.statusDesc);
		    //alert("Response from crossfff origin: " + response.StatusObject.message1);
		}
}


function doSignUp(dispname, uname,psswd) {
    $.ajax({
  	  async: false,
        jsonp: 'callback',
        url : 'http://careeraddons.com/MyAddons/MESC',
        dataType : 'jsonp',
        jsonpCallback : '_doSignUpcallback',
        data : {
             method : 'jsonp',
             action: 'signup',
             fName: dispname,
             userName1 : uname,
             password1: psswd ,
         },
        success: function( data, textStatus, jqXHR) {
        	//alert(data);
        }
    });
}
function _doSignUpcallback(response) {

	if (response.Status==true ) {

		$(document.getElementById('signUpStatus')).html(response.SignupStatus);
		$(document.getElementById('registerDiv')).html('');
 	}
	else
		{
		alert(response.SignupStatus);
		}

	 }

 function fetchExamsList(_action,_subaction) {
    $.ajax({
        jsonp: 'callback',
        url : 'http://careeraddons.com/MyAddons/MESC',
        dataType : 'jsonp',
        jsonpCallback : '_fetchExamsListcallback',
        data : {
             method : 'jsonp',
             action:  _action,
             subaction: _subaction,
         },
        success: function( data, textStatus, jqXHR) {
        	//alert(data);
        }
    });
}
function _fetchExamsListcallback(response) {
	//alert("Response from crossfff origin: " + response.Status);
	if (response.Status==true ) {
		$(document.getElementById('counterDiv')).empty();
	 	$(document.getElementById('ExamListDiv')).html(response.ExamList);
	 	$(document.getElementById('StartExamDiv')).html('');
	 	$(document.getElementById('selectedVendor')).html(response.ExamAvailable);

	}
	else
		{
		    //alert("Response from crossfff origin: " + response.StatusObject.statusDesc);
		    //alert("Response from crossfff origin: " + response.StatusObject.message1);
		}
}

function validateForm()
{
	var x=document.forms["form1"]["userName1"].value;

	var atpos=x.indexOf("@");

	var dotpos=x.lastIndexOf(".");
	if (document.forms["form1"]["tnc"].checked == 'false'){
		//alert ("Please read & accept Term & Conditions");
		return false;
	}


	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length)
	  {
	  alert("Not a valid e-mail address");
	  return false;
	  }
	var fName=document.forms["form1"]["fName"].value;
	if (fName=='') {
	  alert("Not a valid user name");
	  return false;

	}
	var password1=document.forms["form1"]["password1"].value;
	if (password1=='') {
	  alert("Not a valid Password");
	  return false;

	}

 delegateAction('SignUp');
 return false;
}


function validateLoginForm()
{
	var x=document.forms["loginForm"]["userName"].value;

	var atpos=x.indexOf("@");

	var dotpos=x.lastIndexOf(".");

	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length)
	  {
	  alert("Not a valid e-mail address");
	  return false;
	  }

	var password1=document.forms["loginForm"]["password"].value;
	if (password1=='') {
	  alert("Not a valid Password");
	  return false;

	}
return delegateAction('SignIn');
}

