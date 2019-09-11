var routinesArray = []
	var contextualArray = []
	var programUnitArray = []
    var routineDbValue = []
	var contextualDbValue = []
	var appendedValue
	var appendedIndividualValue
	var dynamicUrnProgramUnit
	var dynamicIndividualUrnProgramUnit
	var dynamicIDTable
	var dynamicIDIndividualTable

	var scheduleLessonsArray = []
	var individualLessonsArray = []
	var pathWindowUrl
	var uuid
	var doaminTitle
    var domainDataDatabase = []
    var edit
    var disableEdit



var fullUrl = location.href;
// console.log(testCASE,'sagh')
var splitData = fullUrl.split('=')
var windowIdValue= splitData[1].split('&')
var windowUrl =windowIdValue[0]

	$('#editTitle').hide()
    $('#addNewRow').hide()
    $('#addNewRowTwo').hide()
	 function getDomainReference() {
		 $.ajax({
			 type: 'GET',
			 url: '/content-service/domain/references',
			 contentType: 'application/json; charset=utf-8'
		 }).done(function (msg) {
			 /*console.log(msg, 'msg')*/

			 $.each(msg.routines, function (i, v) {

				routinesArray.push(v)
			 })
			 $.each(msg.contextual_identifiers, function (i, v) {
				 /*console.log(v, 'v')*/
				contextualArray.push(v)
			 })
			 $.each(msg.program_unit_instances, function (i , v) {
				 programUnitArray.push(v)
			 })
			 $.each(contextualArray , function (i , v) {
                 //console.log(v, 'hagsahsg')
			  $('#contextualData').append('<li> <label> <input onclick="getContextual(this)" name="lesson1" type="radio" value="'+v.urn+'" data-name="'+v.text+'">'+v.text+' </label> </li>')
			 })
             $.each(routinesArray , function (i , v) {
                // console.log(v, 'hagsahsg')
			  $('#routineDataTest').append('<li> <label> <input onclick="getRoutine(this)" name="lesson1" type="radio" value="'+v.urn+'" data-name="'+v.text+'">'+v.text+' </label> </li>')
			 })

			 $.each(programUnitArray, function (i,v){
			     //console.log(v , 'asafsasf')
				$('#scheduleLessons').append('<li id='+i+'><label><input onclick="getScheduleValue(this)" name="lesson1" type="radio" value="'+v.urn+'" data-name="'+v.internal_name+'">'+v.internal_name+'</label></li>')
			 })
			 $.each(programUnitArray, function (i,v){
				$('#individualLessons').append('<li><label><input onclick="getIndividualValue(this)" name="lesson2" type="radio" value="'+v.urn+'" name="" data-name="'+v.internal_name+'">'+v.internal_name+'</label></li>')
			 })

             getDomainContent()

		})
	 }
	 getDomainReference()



     function getDomainContent() {
        $.ajax({
            type: 'GET',
            url: '/content-service/domain/urn:vida:domain:'+windowUrl,
            contentType: 'application/json; charset=utf-8'
        }).done(function (msg) {
            // console.log(msg)
            domainDataDatabase.push(msg)
            onReloadGetData()
        })
        console.log(domainDataDatabase, 'domainDataDatabase')
    }

     function onReloadGetData(){
        // console.log(domainDataDatabase.schedule_lessons)
        if(domainDataDatabase.length > 0){
            $('#mainTableBody').find('#confirm_appointment_0').remove()
            $('#mainTableTwoBody').find('#confirm_lessonTwo_0').remove()
            $.each(domainDataDatabase, function(i, v){
                $('#title').val(v.title)
                doaminTitle = v.title

                $.each(routinesArray,function(ri,rv){
                    if(v.routine_urn == rv.urn){
                        $('#routineButton').empty();
                        $('#routineButton').append(rv.text+'<span class="glyphicon glyphicon-triangle-bottom pull-right"></span>')
                        $('ul[id=routineDataTest] li label input').each(function () {// id of ul
                            var valueRutine = $(this).val()
                            if(rv.urn == valueRutine){
                                $(this).addClass('checkboxCheckedNew')
                            }
                        })
                        routineDbValue.push(rv.urn)
                    }
                })
                $.each(contextualArray,function(ci,cv){
                    if(v.contextual_identifier_urn == cv.urn){
                        $('#contextualButton').empty();
                        $('#contextualButton').append(cv.text+'<span class="glyphicon glyphicon-triangle-bottom pull-right"></span>')
                        $('ul[id=contextualData] li label input').each(function () {// id of ul
                            var valueRutine = $(this).val()
                            if(cv.urn == valueRutine){
                                $(this).addClass('checkboxCheckedNew')
                            }
                        })
                        contextualDbValue.push(cv.urn)
                    }
                })
				if(v.schedule_lessons.length > 0 ){

					$.each(v.schedule_lessons, function(si , sv){
						scheduleLessonsArray.push(sv)
						$('#mainTableBody').append('<tr id="confirm_appointment_' + si + '"> <td style="width: 30%;"onclick="getInsertPlace(this)" id="td' + si + '"><a class="input_border_add form-control" href="#lessonOne" data-toggle="modal" data-target="#lessonOne"></a> <input type="hidden" value="'+sv.program_unit_urn+'" class="lessonTitle"> </td><td id=""><a ><input onchange="getlessonOneValue(this)" class="completeLesson form-control" type="number" name="" value="'+sv.days_until_next_lesson_on_completion+'"></a></td><td id=""><a ><input onchange="getlessonOneValue(this)" class="incompleteLesson form-control" type="number" name="" value="'+sv.days_until_next_lesson_on_incomplete+'" ></a></td><td style="width: 5%; vertical-align: middle" class="remove" onclick="removeFirst(this)"><i class="glyphicon glyphicon-trash"></i></td></tr>')
						$.each(programUnitArray, function (pi,pv){
						if(pv.urn == sv.program_unit_urn){
							$("#td" + si).find('a').append(pv.internal_name)
							}
						})
						$("#confirm_appointment_" + si ).find('#saveInput').addClass('hideBtn')
						$("#confirm_appointment_" + si ).find('#editInput').removeClass('hideBtn')

					})
					var valueCase= (scheduleLessonsArray.length-1)
                    $("#confirm_appointment_" + valueCase ).find('.incompleteLesson').attr('onchange', 'getlessonOneValue(this)')
                    $("#confirm_appointment_" + valueCase ).find('.incompleteLesson').attr('onkeyup', ' addNewRowTableOne(this)')
				}else{
					$('#mainTableBody').append('<tr id="confirm_appointment_0"> <td style="width: 30%;"onclick="getInsertPlace(this)" id="td0"><a class="input_border_add form-control" href="#lessonOne" data-toggle="modal" data-target="#lessonOne"></a> <input type="hidden" value="" class="lessonTitle"> </td><td id=""><a ><input onchange="getlessonOneValue(this)" class="completeLesson form-control" type="number" name="" value=""></a></td><td id=""><a ><input onkeyup="addNewRowTableOne(this)" onchange="getlessonOneValue(this)" class="incompleteLesson form-control" type="number" name="" value="" readonly></a></td><td style="width: 5%; vertical-align: middle" class="remove" onclick="removeFirst(this)"><i class="glyphicon glyphicon-trash"></i></td></tr>')
				}
				if(v.individual_lessons.length > 0){
					$.each(v.individual_lessons, function(li , lv){
						individualLessonsArray.push(lv)
						$('#mainTableTwoBody').append('<tr id="confirm_lessonTwo_' + li + '"><td style="width: 30%;" onclick="getInsertPlacelessonTwo(this)" id="lessonTwo' + li + '"><a class="input_border_add form-control" href="#lessonTwo" data-toggle="modal" data-target="#lessonTwo">&nbsp;</a><input type="hidden" value="'+lv.program_unit_urn+'" class="lessonTitle"></td><td id=""><a ><input  onchange="getlessonTwoValue(this)" class="completeLesson form-control" type="number" name="" value="'+lv.send_days_after_start+'" ></a></td><td id=""><a ><input  onchange="getlessonTwoValue(this)" class="incompleteLesson form-control" type="number" name="" value="'+lv.expires_after_days+'" ></a></td><td id=""><a ><input onchange="getlessonTwoValue(this)" class="intervelDays form-control" type="number" name="" value="'+lv.repetition_interval_days+'" ></a></td><td style="width: 5%; vertical-align: middle" class="remove" onclick="removeSecond(this)"><i class="glyphicon glyphicon-trash"></i></td></tr>')
						$.each(programUnitArray, function (pi,pv){
						if(pv.urn == lv.program_unit_urn){
							$("#lessonTwo" + li).find('a').append(pv.internal_name)
							}
						})
						$("#confirm_lessonTwo_" + li ).find('#saveInput').addClass('hideBtn')
						$("#confirm_lessonTwo_" + li ).find('#editInput').removeClass('hideBtn')
					})
					var valuedata= (individualLessonsArray.length-1)
                    $("#confirm_lessonTwo_" + valuedata ).find('.intervelDays').attr('onchange','getlessonTwoValue(this)')
                    $("#confirm_lessonTwo_" + valuedata ).find('.intervelDays').attr('onkeyup','addNewRowTableTwo(this)')
				}else{
					$('#mainTableTwoBody').append('<tr id="confirm_lessonTwo_0"><td style="width: 30%;" onclick="getInsertPlacelessonTwo(this)" id="lessonTwo0"><a class="input_border_add form-control" href="#lessonTwo" data-toggle="modal" data-target="#lessonTwo">&nbsp;</a><input type="hidden" value="" class="lessonTitle"></td><td id=""><a ><input  onchange="getlessonTwoValue(this)" class="completeLesson form-control" type="number" name="" value="" ></a></td><td id=""><a ><input onchange="getlessonTwoValue(this)" class="incompleteLesson form-control" type="number" name="" value="" ></a></td><td id=""><a ><input onkeyup="addNewRowTableTwo(this)" onchange="getlessonTwoValue(this)" class="intervelDays form-control" type="number" name="" value="" readonly></a></td><td style="width: 5%; vertical-align: middle" class="remove" onclick="removeSecond(this)"><i class="glyphicon glyphicon-trash"></i></td></tr>')
				}

            })

        }
    }

	 //console.log(programUnitArray, 'program')
	 //console.log(contextualArray, 'contextual')
	// console.log(routinesArray , 'routine')

    function getRoutine (e) {
        $('#routineButton').empty()
        //console.log( e.value,'routine')
        routineDbValue = []
        routineDbValue.push(e.value)
        var name = e.getAttribute('data-name')
        $('#routineButton').append(name+'<span class="glyphicon glyphicon-triangle-bottom pull-right"></span>')
    }

    function getContextual (e) {
	    //console.log(value);
        $('#contextualButton').empty()
	    contextualDbValue = []
        contextualDbValue.push(e.value)
       var name = e.getAttribute('data-name')

       $('#contextualButton').append(name+'<span class="glyphicon glyphicon-triangle-bottom pull-right"></span>')
       /* console.log(contextualDbValue, 'cccc')*/
    }

     function getScheduleValue (e){
		 console.log(e.getAttribute('data-name'), 'hdfasdfa')

		 appendedValue = e.getAttribute('data-name')
		 dynamicUrnProgramUnit = e.value
		// var dynamicId = e.id

		// console.log(("#"+dynamicId).find('input').attr('name'))
		 $('#'+dynamicIDTable).find('a').empty()
		 $('#'+dynamicIDTable).find('a').append(appendedValue)
		 $('#'+dynamicIDTable).find('input').attr('value',dynamicUrnProgramUnit )
		 /*$('#tda').append(appendedValue)*/
		 getlessonOneValue(dynamicIDTable)
		  appendedValue = ''
		 /*$('#tda').a*/

	}
	function getIndividualValue (e) {
		appendedIndividualValue = e.getAttribute('data-name')
		dynamicIndividualUrnProgramUnit =  e.value
		console.log(dynamicIndividualUrnProgramUnit, 'shagsasg')

		$('#'+dynamicIDIndividualTable).find('a').empty()
		$('#'+dynamicIDIndividualTable).find('a').append(appendedIndividualValue)
		$('#'+dynamicIDIndividualTable).find('input').attr('value',dynamicIndividualUrnProgramUnit )
		getlessonTwoValue(dynamicIDIndividualTable)
		appendedIndividualValue = ''
	}
     function getInsertPlace(e){
	  /*console.log(appendedValue, 'safsgas')*/
		 dynamicIDTable = e.id
		 console.log(dynamicIDTable)
         var  val = dynamicIDTable.split('d')
		 var indexOF = val[1]

		 $('ul[id=scheduleLessons] li label input').each(function () {// id of ul
            $(this).attr('checked',false)
            $(this).removeClass('checkboxCheckedNew')
        })
		$.each(scheduleLessonsArray,function(i,v){
			$('ul[id=scheduleLessons] li label input').each(function () {// id of ul
				var valueRutine = $(this).val()
				if(v.program_unit_urn == valueRutine){
				if(indexOF == i)
					$(this).addClass('checkboxCheckedNew')
				}
			})
		})
		 $('#'+dynamicIDTable).find('input').removeAttr('readonly')
		 $('#'+dynamicIDTable).find('button').removeClass('hideBtn')
  }
  function getInsertPlacelessonTwo (e) {
	dynamicIDIndividualTable = e.id
	console.log(dynamicIDIndividualTable)
	var  val = dynamicIDIndividualTable.split('o')
	var indexOF = val[2]
	console.log(indexOF)
	$('ul[id=individualLessons] li label input').each(function () {// id of ul
				$(this).attr('checked',false)
				$(this).removeClass('checkboxCheckedNew')
			})
	$.each(individualLessonsArray,function(i,v){
		$('ul[id=individualLessons] li label input').each(function () {// id of ul
			var valueRutine = $(this).val()
			if(v.program_unit_urn == valueRutine){
				console.log(v, 'value')
				if(indexOF == i) {
					$(this).addClass('checkboxCheckedNew')
				}
			}
		})
	})
  }




  function getlessonOneValue (e) {
	  console.log(e)
	  if (e.length != undefined){
		  var id = $("#"+e).parent().attr('id');
		  console.log(id, 'hereID')
		 var  val = e.split('d')
		 var arrayValue = val[1]
		  console.log(arrayValue)
		  console.log($('#'+e).find('.lessonTitle').attr('value'))
		console.log($('#'+id).find('.completeLesson').attr('value'))
		console.log($('#'+id).find('.incompleteLesson').attr('value'))
		var lessonOneTitle = $('#'+e).find('.lessonTitle').attr('value')
		var lessonOneComplete = $('#'+id).find('.completeLesson').attr('value')
		var lessonOneInCompleteLesson = $('#'+id).find('.incompleteLesson').attr('value')
		var  indexOF=arrayValue
		var staticOrder =indexOF
		if( scheduleLessonsArray[indexOF] == undefined){
		scheduleLessonsArray.push({
			days_until_next_lesson_on_completion:parseInt(lessonOneComplete),
			days_until_next_lesson_on_incomplete:parseInt(lessonOneInCompleteLesson),
			order:parseInt(staticOrder),
			program_unit_urn: lessonOneTitle
		})
		}else{
			scheduleLessonsArray.splice(indexOF , 1 , {days_until_next_lesson_on_completion:parseInt(lessonOneComplete),
			days_until_next_lesson_on_incomplete:parseInt(lessonOneInCompleteLesson),
			order:parseInt(staticOrder),
			program_unit_urn: lessonOneTitle})
		}
		console.log(scheduleLessonsArray, 'scheduleLessonsArray')
		$('#'+id).find('.incompleteLesson').attr("readonly", false); 
	  }else{

		var TrIdCardOne = e.parentNode.parentNode.parentNode.id
		var arrayValue = TrIdCardOne.split('_')
		console.log(arrayValue, 'sasas')
		// $('#'+TrIdCardOne).addClass('borderRemove')
		console.log($('#'+TrIdCardOne).find('.lessonTitle').attr('value'))
		console.log($('#'+TrIdCardOne).find('.completeLesson').val())
		console.log($('#'+TrIdCardOne).find('.incompleteLesson').val())
		var lessonOneTitle = $('#'+TrIdCardOne).find('.lessonTitle').attr('value')

		var lessonOneComplete = $('#'+TrIdCardOne).find('.completeLesson').val()
		$('#'+TrIdCardOne).find('.completeLesson').attr('value',lessonOneComplete)
		var lessonOneInCompleteLesson = $('#'+TrIdCardOne).find('.incompleteLesson').val()
		$('#'+TrIdCardOne).find('.incompleteLesson').attr('value',lessonOneInCompleteLesson)
		var  indexOF=arrayValue[2]
		var staticOrder =indexOF
		if(scheduleLessonsArray[indexOF] == undefined){
		scheduleLessonsArray.push({
			days_until_next_lesson_on_completion:parseInt(lessonOneComplete),
			days_until_next_lesson_on_incomplete:parseInt(lessonOneInCompleteLesson),
			order:parseInt(staticOrder),
			program_unit_urn: lessonOneTitle
		})
		}else{
			scheduleLessonsArray.splice(indexOF , 1 , {days_until_next_lesson_on_completion:parseInt(lessonOneComplete),
			days_until_next_lesson_on_incomplete:parseInt(lessonOneInCompleteLesson),
			order:parseInt(staticOrder),
			program_unit_urn: lessonOneTitle})
		}

		console.log(scheduleLessonsArray, 'scheduleLessonsArray')
		$('#'+TrIdCardOne).find('.incompleteLesson').attr("readonly", false); 
		console.log(e.getAttribute('class'), 'asas')
		var className =  e.getAttribute('class')
		var newCase = $(e).hasClass(className)
		if(newCase = true){
			$(e).attr('onchange','getlessonOneValue(this)')
		}
		$('#'+TrIdCardOne).find('#saveInput').addClass('hideBtn')
		$('#'+TrIdCardOne).find('#editInput').removeClass('hideBtn')
		$('#addNewRow').show()
	  }

    }


//   For third Card

  	function getlessonTwoValue (e) {
		console.log(e)
		if (e.length != undefined){
			var id = $("#"+e).parent().attr('id');
			console.log(id, 'hereID')
			var  val = e.split('o')
			var arrayValue = val[2]
			console.log(arrayValue, 'sasssas')
		    console.log($('#'+e).find('.lessonTitle').attr('value'))
			console.log($('#'+id).find('.completeLesson').attr('value'))
			console.log($('#'+id).find('.incompleteLesson').attr('value'))
			console.log($('#'+id).find('.intervelDays').attr('value'))
			var lessonTwoTitle = $('#'+e).find('.lessonTitle').attr('value')
			var lessonTwoComplete = $('#'+id).find('.completeLesson').attr('value')
			var lessonTwoInCompleteLesson = $('#'+id).find('.incompleteLesson').attr('value')
			var lessonTwoIntervalDays = $('#'+id).find('.intervelDays').attr('value')
			var indexOF=arrayValue

			if(individualLessonsArray[indexOF] == undefined){
				individualLessonsArray.push({
					send_days_after_start:parseInt(lessonTwoComplete),
					expires_after_days:parseInt(lessonTwoInCompleteLesson),
					repetition_interval_days:parseInt(lessonTwoIntervalDays),
					program_unit_urn: lessonTwoTitle
				})
			}else{
				individualLessonsArray.splice(indexOF , 1, { send_days_after_start:parseInt(lessonTwoComplete),
					expires_after_days:parseInt(lessonTwoInCompleteLesson),
					repetition_interval_days:parseInt(lessonTwoIntervalDays),
					program_unit_urn: lessonTwoTitle})
			}
			console.log(individualLessonsArray, 'individualLessonsArray')
			$('#'+id).find('.intervelDays').attr("readonly", false); 
		}else{
				var dynamicTrId = e.parentNode.parentNode.parentNode.id
				var arrayValue = dynamicTrId.split('_')
				// $('#'+dynamicTrId).addClass('borderRemove')
				console.log($('#'+dynamicTrId).find('.lessonTitle').attr('value'))
				console.log($('#'+dynamicTrId).find('.completeLesson').val())
				console.log($('#'+dynamicTrId).find('.incompleteLesson').val())
				console.log($('#'+dynamicTrId).find('.intervelDays').val())
				var lessonTwoTitle = $('#'+dynamicTrId).find('.lessonTitle').attr('value')
				var lessonTwoComplete = $('#'+dynamicTrId).find('.completeLesson').val()
				$('#'+dynamicTrId).find('.completeLesson').attr('value',lessonTwoComplete)
				var lessonTwoInCompleteLesson = $('#'+dynamicTrId).find('.incompleteLesson').val()
				$('#'+dynamicTrId).find('.incompleteLesson').attr('value',lessonTwoInCompleteLesson)
				var lessonTwoIntervalDays = $('#'+dynamicTrId).find('.intervelDays').val()
				$('#'+dynamicTrId).find('.intervelDays').attr('value',lessonTwoIntervalDays)
				var  indexOF=arrayValue[2]
				if( individualLessonsArray[indexOF] == undefined){
					individualLessonsArray.push({
						send_days_after_start:parseInt(lessonTwoComplete),
						expires_after_days:parseInt(lessonTwoInCompleteLesson),
						repetition_interval_days:parseInt(lessonTwoIntervalDays),
						program_unit_urn: lessonTwoTitle
					})
				}else{
					individualLessonsArray.splice(indexOF , 1, { send_days_after_start:parseInt(lessonTwoComplete),
						expires_after_days:parseInt(lessonTwoInCompleteLesson),
						repetition_interval_days:parseInt(lessonTwoIntervalDays),
						program_unit_urn: lessonTwoTitle})
				}
				console.log(individualLessonsArray, 'individualLessonsArray')
				$('#'+dynamicTrId).find('.intervelDays').attr("readonly", false);
				console.log(e.getAttribute('class'), 'asas')
		    	var className =  e.getAttribute('class')
		  		var newCase = $(e).hasClass(className)
				if(newCase = true){
					$(e).attr('onchange','getlessonTwoValue(this)')
				}
			}
  	}


  function editTable (e) {
    edit = 'clicked'
    if(disableEdit != undefined) {
        alert('Please save another then Add!');
        return false;
    }
    disableEdit = 'clicked'
	//   alert('sdas')
        var dynamicTrId = e.parentNode.parentNode.id
        console.log(dynamicTrId)
        var arrayValue = dynamicTrId.split('_')
        var  indexOF=arrayValue[2]
      $('ul[id=scheduleLessons] li label input').each(function () {// id of ul
            $(this).attr('checked',false)
            $(this).removeClass('checkboxCheckedNew')
        })
      $.each(scheduleLessonsArray,function(i,v){
        $('ul[id=scheduleLessons] li label input').each(function () {// id of ul
            var valueRutine = $(this).val()
            if(v.program_unit_urn == valueRutine){
               if(indexOF == i)
                $(this).addClass('checkboxCheckedNew')
            }
        })
      })

	$('#'+dynamicTrId).find('#saveInput').removeClass('hideBtn')
	$('#'+dynamicTrId).find('#editInput').addClass('hideBtn')
    // $('#'+dynamicTrId).removeClass('borderRemove')
  }


  	function  saveAllData(){
          $.each(scheduleLessonsArray, function(i , v){
             var program = v.program_unit_urn
             var completion = v.days_until_next_lesson_on_completion
             var incomplete = v.days_until_next_lesson_on_incomplete
             console.log(isNaN(incomplete),'sa')
			  var nanIncomplete = isNaN(incomplete)
			  var nanComplete = isNaN(completion)
             console.log(nanIncomplete ,nanComplete, 'first')
             if(nanIncomplete != false || nanComplete != false|| program == '123'){
                 //alert('here')
                 scheduleLessonsArray.splice(i, 1)
             }
          })
         console.log(scheduleLessonsArray, 'one')

          $.each(individualLessonsArray, function(i , v){
              console.log(v)
            var programIndividual = v.program_unit_urn
            var completionIndividual = v.send_days_after_start
            var incompleteIndividual = v.expires_after_days
            var repetitionIndividual = v.repetition_interval_days
            // console.log(isNaN(incomplete),'sa')
             var nanIndiIncomplete = isNaN(incompleteIndividual)
             var nanIndiComplete = isNaN(completionIndividual)
             var nanIndiRepetition = isNaN(repetitionIndividual)
            console.log(nanIndiIncomplete , nanIndiComplete, nanIndiRepetition, 'two')
            if(programIndividual=='123' || nanIndiIncomplete != false || nanIndiIncomplete != false || nanIndiRepetition != false ){
               // alert('individual')
                individualLessonsArray.splice(i, 1)
            }
         })
         console.log(individualLessonsArray, 'sasa')
		if(routineDbValue != '' && contextualDbValue!= '' && doaminTitle!= undefined ){
			alert('not null ')
			var domainPutData = {
				routine_urn:routineDbValue[0],
				contextual_identifier_urn: contextualDbValue[0],
				schedule_lessons: scheduleLessonsArray,
				individual_lessons: individualLessonsArray,
				title: doaminTitle,
			};
			console.log(domainPutData, 'domainPutData')

			saveRuleToDb(domainPutData)
		}else{

			alert('Title, Routine And Contextual Identifier is Required')

		}
	}
//***-------------------For uuid-------------*>
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


function getWindowUrl() {
	 pathWindowUrl = window.location.pathname
    //  console.log(pathWindowUrl, 'sasasa')
}
getWindowUrl()
if (pathWindowUrl == '/content-service/admin/skilldomain/new/'){
	//console.log('here')
	//console.log(uuidv4())
	uuid = uuidv4()
}
if(pathWindowUrl == '/content-service/admin/skilldomain/edit/'){
    uuid = windowUrl
}
function getTitle(){
	//console.log(e.parentNode.id)
	// var titleId = e.parentNode.id
	// $('#'+titleId).addClass('borderRemove')
	doaminTitle = $('#title').val()
	// $('#saveTitle').hide()
	// $('#editTitle').show()
	console.log(doaminTitle,'asas')
}


function hideEdit(e) {
	var titleId = e.parentNode.id
	$('#'+titleId).removeClass('borderRemove')
	$('#saveTitle').show()
	$('#editTitle').hide()
}

function saveRuleToDb (domainData) {
	//console.log('/content-service/domain/urn:vida:domain:'+uuid);
	$.ajax({
        type: 'PUT',
        url: '/content-service/domain/urn:vida:domain:'+uuid,
        data: JSON.stringify(domainData),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8'
    }).done(function (msg) {
       alert(msg)
	})
    // after success response take this on done function
	alert('saved')
	window.location = '/content-service/admin/skilldomain/'
}

function addNewRowTableOne(e){
    console.log(e.getAttribute('class'), 'asas')
    var className =  e.getAttribute('class')
    var newCase = $(e).hasClass(className)
    console.log(newCase)
    if(newCase = true){
        $(e).attr('onkeyup','')
    }
    $('ul[id=scheduleLessons] li label input').each(function () {// id of ul
            $(this).attr('checked',false)
        })
   var length = scheduleLessonsArray.length
   ///console.log(scheduleLessonsArray ,'addnEW1')

   $('#mainTableBody').append('<tr id="confirm_appointment_' + length + '"> <td style="width: 30%;"onclick="getInsertPlace(this)" id="td' + length + '"><a class="input_border_add form-control" href="#lessonOne" data-toggle="modal" data-target="#lessonOne">&nbsp;</a> <input type="hidden" value="123" class="lessonTitle"> </td><td id=""><a ><input onchange="getlessonOneValue(this)" class="completeLesson form-control" type="number" name="" value=""></a></td><td id=""><a ><input onkeyup="addNewRowTableOne(this)" onchange="getlessonOneValue(this)" class="incompleteLesson form-control" type="number" name="" value="" readonly></a></td><td style="width: 5%; vertical-align: middle" class="remove" onclick="removeFirst(this)"><i class="glyphicon glyphicon-trash"></i></td></tr>')
}
function addNewRowTableTwo (e) {
    console.log(e.getAttribute('class'), 'asas')
		    	var className =  e.getAttribute('class')
                  var newCase = $(e).hasClass(className)
                  console.log(newCase)
				if(newCase = true){
					$(e).attr('onkeyup','')
				}
    var length = individualLessonsArray.length
   // console.log(individualLessonsArray, 'addnEW2')
    $('#mainTableTwoBody').append('<tr id="confirm_lessonTwo_' + length + '"><td style="width: 30%;" onclick="getInsertPlacelessonTwo(this)" id="lessonTwo' + length + '"><a class="input_border_add form-control" href="#lessonTwo" data-toggle="modal" data-target="#lessonTwo">&nbsp;</a><input type="hidden" value="123" class="lessonTitle"></td><td id=""><a><input  onchange="getlessonTwoValue(this)"  class="completeLesson form-control" type="number" name="" value="" ></a></td><td id=""><a ><input  onchange="getlessonTwoValue(this)" class="incompleteLesson form-control" type="number" name="" value="" ></a></td><td id=""><a ><input onkeyup=" addNewRowTableTwo(this)" onchange="getlessonTwoValue(this)" class="intervelDays form-control" type="number" name="" value="" readonly ></a></td><td onclick="removeSecond(this)" style="width: 5%; vertical-align: middle" class="removeContextual" ><i  class="glyphicon glyphicon-trash"></i></td></tr>')
}



function dragScheduleLessons() {
    $(function () {
        var manipulate, oldIndex;
        $("#mainTableBody").sortable({
            start: function (event, ui) {
                var updt = ui.item.index();
                manipulate = updt;
                oldIndex = scheduleLessonsArray[manipulate];
            },
            update: function (e, ui) {
                var newIndex = ui.item.index();
                scheduleLessonsArray.splice(manipulate, 1);
                scheduleLessonsArray.splice(newIndex, 0, oldIndex);
                rankTest = newIndex

                $("#mainTableBody tr").each(function (i, elm) {

                    $elm = $(elm); // cache the jquery object

                    //console.log($elm.context.innerHTML)
                    $elm.attr("id", 'confirm_appointment_' + $elm.index("#mainTableBody tr"));
                });
                $.each(scheduleLessonsArray, function (iNew, vNew) {
                    scheduleLessonsArray.splice(iNew, 1, { days_until_next_lesson_on_completion: vNew.days_until_next_lesson_on_completion,days_until_next_lesson_on_incomplete:vNew.days_until_next_lesson_on_incomplete,program_unit_urn:vNew.program_unit_urn, order: iNew })
                })
            }
        });
        $("#drag_div").disableSelection();


    });
}
dragScheduleLessons()


function removeFirst(e){
	console.log(e.parentNode.id)
	var valueOf = e.parentNode.id
	var dynamicId = valueOf.split('_')
	var removeIndex = dynamicId[2]
	$(e).parent().remove();
	scheduleLessonsArray.splice(removeIndex, 1)
	///console.log(scheduleLessonsArray, 'after delete')
	var testValue = scheduleLessonsArray.length
	var counter = 0;
	$("#mainTableBody tr").each(function() {
  
	  $(this).attr('id', 'confirm_appointment_'+counter);
	  $(this).find('td:first-child').attr('id', 'td'+counter) //just to show the result
	  var count = (testValue - 1)	
	  if(count == counter){
		  $(this).find('td:nth-child(3)').attr('onkeyup', ' addNewRowTableOne(this)')
	  }
	  counter++; 
	  console.log(counter)
	});
	$.each(scheduleLessonsArray, function (iNew, vNew) {
		scheduleLessonsArray.splice(iNew, 1, { days_until_next_lesson_on_completion: vNew.days_until_next_lesson_on_completion,days_until_next_lesson_on_incomplete:vNew.days_until_next_lesson_on_incomplete,program_unit_urn:vNew.program_unit_urn, order: iNew })
	})
	console.log(scheduleLessonsArray, 'after delete')
	if(scheduleLessonsArray.length === 0){
		//alert('here')
		$('#mainTableBody').append('<tr id="confirm_appointment_0"> <td style="width: 30%;"onclick="getInsertPlace(this)" id="td0"><a class="input_border_add form-control" href="#lessonOne" data-toggle="modal" data-target="#lessonOne"></a> <input type="hidden" value="" class="lessonTitle"> </td><td id=""><a ><input onchange="getlessonOneValue(this)" class="completeLesson form-control" type="number" name="" value=""></a></td><td id=""><a ><input onkeyup="addNewRowTableOne(this)" onchange="getlessonOneValue(this)" class="incompleteLesson form-control" type="number" name="" value="" readonly></a></td><td style="width: 5%; vertical-align: middle" class="remove" onclick="removeFirst(this)"><i class="glyphicon glyphicon-trash"></i></td></tr>')
	}
}


function removeSecond(e){
	console.log(e.parentNode.id)
	var valueOf = e.parentNode.id
	var dynamicId = valueOf.split('_')
	var removeIndex = dynamicId[2]
	$(e).parent().remove();
	individualLessonsArray.splice(removeIndex, 1)
	console.log(individualLessonsArray, 'after delete')
	var testValue = individualLessonsArray.length
	var counter = 0;
	$("#mainTableTwoBody tr").each(function() {
  
	  $(this).attr('id', 'confirm_lessonTwo_'+counter);
	  $(this).find('td:first-child').attr('id', 'lessonTwo'+counter) //just to show the result
	  var count = (testValue - 1)	
	  if(count == counter){
		  $(this).find('td:nth-child(3)').attr('onkeyup', ' addNewRowTableTwo(this)')
	  }
	  counter++; 
	});
	if(individualLessonsArray.length === 0){
		//alert('null')
		$('#mainTableTwoBody').append('<tr id="confirm_lessonTwo_0"><td style="width: 30%;" onclick="getInsertPlacelessonTwo(this)" id="lessonTwo0"><a class="input_border_add form-control" href="#lessonTwo" data-toggle="modal" data-target="#lessonTwo">&nbsp;</a><input type="hidden" value="" class="lessonTitle"></td><td id=""><a ><input  onchange="getlessonTwoValue(this)" class="completeLesson form-control" type="number" name="" value="" ></a></td><td id=""><a ><input onchange="getlessonTwoValue(this)" class="incompleteLesson form-control" type="number" name="" value="" ></a></td><td id=""><a ><input onkeyup="addNewRowTableTwo(this)" onchange="getlessonTwoValue(this)" class="intervelDays form-control" type="number" name="" value="" readonly></a></td><td style="width: 5%; vertical-align: middle" class="remove" onclick="removeSecond(this)"><i class="glyphicon glyphicon-trash"></i></td></tr>')
	}
}


$(document).ready(function () {
    $("#routineSearchContent").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#routineDataTest li").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $("#contextualSearchContent").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#contextualData li").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

	$("#scheduleLessonsSearch").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#scheduleLessons li").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

	$("#individualLessonsSearch").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#individualLessons li").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});


