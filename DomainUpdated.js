/*------------------------------- var --------------------------*/  
var routinesArray = [] //For Store the value of routine
var contextualArray = [] //For Store the value of contextual
var programUnitArray = [] //For Store the value of programUnit 
var routineDbValue = []//For Store the value of routine Database value to be send
var contextualDbValue = [] //For Store the value of contextual Database value to be send
var appendedValue //For Store value of  Schedule
var appendedIndividualValue //For Store value of  Individual
var dynamicUrnProgramUnit //For Store URN of Schedule   
var dynamicIndividualUrnProgramUnit //For Store URN of Individual
var dynamicIDTable   //For Store Id of table Second
var dynamicIDIndividualTable //For Store Id of table Third
var scheduleLessonsArray = []  //Array for Schedule
var individualLessonsArray = [] //Array for Individual
var pathWindowUrl   // For Window path
var uuid // For Store value of UUID
var doaminTitle // For store value of domain Title  
var domainDataDatabase = [] //For store value when  GetApi is called. 
var fullUrl = location.href;//For window URl. 
var splitData = fullUrl.split('=') //For window URl
var windowIdValue = splitData[1].split('&') //For window URl
var windowUrl = windowIdValue[0] //For window URl
var obj = {},//For Preloader
someBlock = $('.someBlock'); //For Preloader
/*-------------------------------End------------------------------------------------------*/ 

/* This getDomainReference function is called for getApi is called for get values for contextual dropdown , routine DropDown, scheduleLesson & IndividualLesson Pop-up value  */
function getDomainReference() {
    $.ajax({
        type: 'GET',
        url: '/content-service/domain/references',
        contentType: 'application/json; charset=utf-8'
    }).done(function(msg) {
        $.each(msg.routines, function(i, v) {
            routinesArray.push(v)
        })
        $.each(msg.contextual_identifiers, function(i, v) {
            contextualArray.push(v)
        })
        $.each(msg.program_unit_instances, function(i, v) {
            programUnitArray.push(v)
        })
        $.each(contextualArray, function(i, v) {
            $('#contextualData').append('<li> <label> <input onclick="getContextual(this)" name="lesson1" type="radio" value="' + v.urn + '" data-name="' + v.text + '">' + v.text + ' </label> </li>')
        })
        $.each(routinesArray, function(i, v) {
            $('#routineDataTest').append('<li> <label> <input onclick="getRoutine(this)" name="lesson1" type="radio" value="' + v.urn + '" data-name="' + v.text + '">' + v.text + ' </label> </li>')
        })
        $.each(programUnitArray, function(i, v) {
            $('#scheduleLessons').append('<li id=' + i + '><label><input onclick="getScheduleValue(this)" name="lesson1" type="radio" value="' + v.urn + '" data-name="' + v.internal_name + '">' + v.internal_name + '</label></li>')
        })
        $.each(programUnitArray, function(i, v) {
            $('#individualLessons').append('<li><label><input onclick="getIndividualValue(this)" name="lesson2" type="radio" value="' + v.urn + '" name="" data-name="' + v.internal_name + '">' + v.internal_name + '</label></li>')
        })
       var urlParams = window.location.pathname
        if(urlParams == '/content-service/admin/skilldomain/edit/'){
           getDomainContent()
            /*@This is for loader@*/
            function getValues() {
                obj.textVal = $('#textInput').val('Please wait');
                obj.percentVal = $('#percentInput').val();
                obj.durationVal = $('#durationInput').val();
            }
            getValues();
            someBlock.preloader({
                text: obj.textVal,
                percent: obj.percentVal,
                duration: obj.durationVal
            });
            /*@This is for loader End@*/
        }

    })
}
getDomainReference()
/*-------------------------------End------------------------------------------------------*/

/* getDomainContent function is called when user edit domain a get api is called  */
function getDomainContent() {
    $.ajax({
        type: 'GET',
        url: '/content-service/domain/urn:vida:domain:' + windowUrl,
        contentType: 'application/json; charset=utf-8'
    }).done(function(msg) {
        domainDataDatabase.push(msg)
        onReloadGetData()
    })
}
/*-------------------------------End------------------------------------------------------*/

/* onReloadGetData function is to append data to html when user edit domain  */
function onReloadGetData() {
    if (domainDataDatabase.length > 0) {
        $('#mainTableBody').find('#confirm_appointment_0').remove()
        $('#mainTableTwoBody').find('#confirm_lessonTwo_0').remove()
        $.each(domainDataDatabase, function(i, v) {
            $('#title').val(v.title)
            doaminTitle = v.title

            $.each(routinesArray, function(ri, rv) {
                if (v.routine_urn == rv.urn) {
                    $('#routineButton').empty();
                    $('#routineButton').append(rv.text + '<span class="glyphicon glyphicon-triangle-bottom pull-right"></span>')
                    $('ul[id=routineDataTest] li label input').each(function() { // id of ul
                        var valueRutine = $(this).val()
                        if (rv.urn == valueRutine) {
                            $(this).addClass('checkboxCheckedNew')
                        }
                    })
                    routineDbValue.push(rv.urn)
                }
            })
            $.each(contextualArray, function(ci, cv) {
                if (v.contextual_identifier_urn == cv.urn) {
                    $('#contextualButton').empty();
                    $('#contextualButton').append(cv.text + '<span class="glyphicon glyphicon-triangle-bottom pull-right"></span>')
                    $('ul[id=contextualData] li label input').each(function() { // id of ul
                        var valueRutine = $(this).val()
                        if (cv.urn == valueRutine) {
                            $(this).addClass('checkboxCheckedNew')
                        }
                    })
                    contextualDbValue.push(cv.urn)
                }
            })
            if (v.schedule_lessons.length > 0) {

                $.each(v.schedule_lessons, function(si, sv) {
                    scheduleLessonsArray.push(sv)
                    $('#mainTableBody').append('<tr id="confirm_appointment_' + si + '"> <td style="width: 30%;"onclick="getInsertPlace(this)" id="td' + si + '"><a class="input_border_add form-control" href="#lessonOne" data-toggle="modal" data-target="#lessonOne"></a> <input type="hidden" value="' + sv.program_unit_urn + '" class="lessonTitle"> </td><td id=""><a ><input onchange="getlessonOneValue(this)" class="completeLesson form-control" type="number" name="" value="' + sv.days_until_next_lesson_on_completion + '"></a></td><td id=""><a ><input onchange="getlessonOneValue(this)" class="incompleteLesson form-control" type="number" name="" value="' + sv.days_until_next_lesson_on_incomplete + '" ></a></td><td style="width: 5%; vertical-align: middle" class="remove" onclick="removeFirst(this)"><i class="glyphicon glyphicon-trash"></i></td></tr>')
                    $.each(programUnitArray, function(pi, pv) {
                        if (pv.urn == sv.program_unit_urn) {
                            $("#td" + si).find('a').append(pv.internal_name)
                        }
                    })
                    $("#confirm_appointment_" + si).find('#saveInput').addClass('hideBtn')
                    $("#confirm_appointment_" + si).find('#editInput').removeClass('hideBtn')

                })
                var valueCase = (scheduleLessonsArray.length - 1)
                $("#confirm_appointment_" + valueCase).find('.incompleteLesson').attr('onchange', 'getlessonOneValue(this)')
                $("#confirm_appointment_" + valueCase).find('.incompleteLesson').attr('onkeyup', ' addNewRowTableOne(this)')
            } else {
                $('#mainTableBody').append('<tr id="confirm_appointment_0"> <td style="width: 30%;"onclick="getInsertPlace(this)" id="td0"><a class="input_border_add form-control" href="#lessonOne" data-toggle="modal" data-target="#lessonOne"></a> <input type="hidden" value="" class="lessonTitle"> </td><td id=""><a ><input onchange="getlessonOneValue(this)" class="completeLesson form-control" type="number" name="" value=""></a></td><td id=""><a ><input onkeyup="addNewRowTableOne(this)" onchange="getlessonOneValue(this)" class="incompleteLesson form-control" type="number" name="" value="" readonly></a></td><td style="width: 5%; vertical-align: middle" class="remove" onclick="removeFirst(this)"><i class="glyphicon glyphicon-trash"></i></td></tr>')
            }
            if (v.individual_lessons.length > 0) {
                $.each(v.individual_lessons, function(li, lv) {
                    individualLessonsArray.push(lv)
                    $('#mainTableTwoBody').append('<tr id="confirm_lessonTwo_' + li + '"><td style="width: 30%;" onclick="getInsertPlacelessonTwo(this)" id="lessonTwo' + li + '"><a class="input_border_add form-control" href="#lessonTwo" data-toggle="modal" data-target="#lessonTwo">&nbsp;</a><input type="hidden" value="' + lv.program_unit_urn + '" class="lessonTitle"></td><td id=""><a ><input  onchange="getlessonTwoValue(this)" class="completeLesson form-control" type="number" name="" value="' + lv.send_days_after_start + '" ></a></td><td id=""><a ><input  onchange="getlessonTwoValue(this)" class="incompleteLesson form-control" type="number" name="" value="' + lv.expires_after_days + '" ></a></td><td id=""><a ><input onchange="getlessonTwoValue(this)" class="intervelDays form-control" type="number" name="" value="' + lv.repetition_interval_days + '" ></a></td><td style="width: 5%; vertical-align: middle" class="remove" onclick="removeSecond(this)"><i class="glyphicon glyphicon-trash"></i></td></tr>')
                    $.each(programUnitArray, function(pi, pv) {
                        if (pv.urn == lv.program_unit_urn) {
                            $("#lessonTwo" + li).find('a').append(pv.internal_name)
                        }
                    })
                    $("#confirm_lessonTwo_" + li).find('#saveInput').addClass('hideBtn')
                    $("#confirm_lessonTwo_" + li).find('#editInput').removeClass('hideBtn')
                })
                var valuedata = (individualLessonsArray.length - 1)
                $("#confirm_lessonTwo_" + valuedata).find('.intervelDays').attr('onchange', 'getlessonTwoValue(this)')
                $("#confirm_lessonTwo_" + valuedata).find('.intervelDays').attr('onkeyup', 'addNewRowTableTwo(this)')
            } else {
                $('#mainTableTwoBody').append('<tr id="confirm_lessonTwo_0"><td style="width: 30%;" onclick="getInsertPlacelessonTwo(this)" id="lessonTwo0"><a class="input_border_add form-control" href="#lessonTwo" data-toggle="modal" data-target="#lessonTwo">&nbsp;</a><input type="hidden" value="" class="lessonTitle"></td><td id=""><a ><input  onchange="getlessonTwoValue(this)" class="completeLesson form-control" type="number" name="" value="" ></a></td><td id=""><a ><input onchange="getlessonTwoValue(this)" class="incompleteLesson form-control" type="number" name="" value="" ></a></td><td id=""><a ><input onkeyup="addNewRowTableTwo(this)" onchange="getlessonTwoValue(this)" class="intervelDays form-control" type="number" name="" value="" readonly></a></td><td style="width: 5%; vertical-align: middle" class="remove" onclick="removeSecond(this)"><i class="glyphicon glyphicon-trash"></i></td></tr>')
            }

        })

    }
      setTimeout(function(){
        someBlock.preloader('remove');
        }, 2000)
      /*@-----------------------End-------------------@*/
}
/*-------------------------------End------------------------------------------------------*/

/*getRoutine function is called to get value from  routine pop-up */
function getRoutine(e) {
    $('#routineButton').empty()
    routineDbValue = []
    routineDbValue.push(e.value)
    var name = e.getAttribute('data-name')
    $('#routineButton').append(name + '<span class="glyphicon glyphicon-triangle-bottom pull-right"></span>')
}
/*-------------------------------End------------------------------------------------------*/
/* getContextual is called to get value from contextual pop-up  */
function getContextual(e) {
    $('#contextualButton').empty()
    contextualDbValue = []
    contextualDbValue.push(e.value)
    var name = e.getAttribute('data-name')

    $('#contextualButton').append(name + '<span class="glyphicon glyphicon-triangle-bottom pull-right"></span>')
}
/*-------------------------------End------------------------------------------------------*/

/*getScheduleValue is called when user select schedulelesson from pop-up and append in UI  */
function getScheduleValue(e) {
    appendedValue = e.getAttribute('data-name')
    dynamicUrnProgramUnit = e.value
    $('#' + dynamicIDTable).find('a').empty()
    $('#' + dynamicIDTable).find('a').append(appendedValue)
    $('#' + dynamicIDTable).find('input').attr('value', dynamicUrnProgramUnit)
    getlessonOneValue(dynamicIDTable)
    appendedValue = ''
}
/*-------------------------------End------------------------------------------------------*/

/*getIndividualValue is called when user select Individuallesson from pop-up and append in UI  */
function getIndividualValue(e) {
    appendedIndividualValue = e.getAttribute('data-name')
    dynamicIndividualUrnProgramUnit = e.value
    $('#' + dynamicIDIndividualTable).find('a').empty()
    $('#' + dynamicIDIndividualTable).find('a').append(appendedIndividualValue)
    $('#' + dynamicIDIndividualTable).find('input').attr('value', dynamicIndividualUrnProgramUnit)
    getlessonTwoValue(dynamicIDIndividualTable)
    appendedIndividualValue = ''
}
/*-------------------------------End------------------------------------------------------*/

/*getInsertPlace to get the place were to append value of schedulelesson in ui  */
function getInsertPlace(e) {
    dynamicIDTable = e.id
    var val = dynamicIDTable.split('d')
    var indexOF = val[1]

    $('ul[id=scheduleLessons] li label input').each(function() { // id of ul
        $(this).attr('checked', false)
        $(this).removeClass('checkboxCheckedNew')
    })
    $.each(scheduleLessonsArray, function(i, v) {
        $('ul[id=scheduleLessons] li label input').each(function() { // id of ul
            var valueRutine = $(this).val()
            if (v.program_unit_urn == valueRutine) {
                if (indexOF == i)
                    $(this).addClass('checkboxCheckedNew')
            }
        })
    })
    $('#' + dynamicIDTable).find('input').removeAttr('readonly')
    $('#' + dynamicIDTable).find('button').removeClass('hideBtn')
}
/*-------------------------------End------------------------------------------------------*/
/*getInsertPlacelessonTwo to get the place were to append value of individuallesson in ui  */
	function getInsertPlacelessonTwo(e) {
		dynamicIDIndividualTable = e.id
		var val = dynamicIDIndividualTable.split('o')
		var indexOF = val[2]
		$('ul[id=individualLessons] li label input').each(function() { // id of ul
			$(this).attr('checked', false)
			$(this).removeClass('checkboxCheckedNew')
		})
		$.each(individualLessonsArray, function(i, v) {
			$('ul[id=individualLessons] li label input').each(function() { // id of ul
				var valueRutine = $(this).val()
				if (v.program_unit_urn == valueRutine) {
					if (indexOF == i) {
						$(this).addClass('checkboxCheckedNew')
					}
				}
			})
		})
	}
/*-------------------------------End------------------------------------------------------*/


/* getlessonOneValue is for getting the each value from schedule Lesson and push in array scheduleLessonsArray*/
	function getlessonOneValue(e) {
		if (e.length != undefined) {
			var id = $("#" + e).parent().attr('id');
			var val = e.split('d')
			var arrayValue = val[1]
			var lessonOneTitle = $('#' + e).find('.lessonTitle').attr('value')
			var lessonOneComplete = $('#' + id).find('.completeLesson').attr('value')
			var lessonOneInCompleteLesson = $('#' + id).find('.incompleteLesson').attr('value')
			var indexOF = arrayValue
			var staticOrder = indexOF
			if (scheduleLessonsArray[indexOF] == undefined) {
				scheduleLessonsArray.push({
					days_until_next_lesson_on_completion: parseInt(lessonOneComplete),
					days_until_next_lesson_on_incomplete: parseInt(lessonOneInCompleteLesson),
					order: parseInt(staticOrder),
					program_unit_urn: lessonOneTitle
				})
			} else {
				scheduleLessonsArray.splice(indexOF, 1, {
					days_until_next_lesson_on_completion: parseInt(lessonOneComplete),
					days_until_next_lesson_on_incomplete: parseInt(lessonOneInCompleteLesson),
					order: parseInt(staticOrder),
					program_unit_urn: lessonOneTitle
				})
			}
			$('#' + id).find('.incompleteLesson').attr("readonly", false);
		} else {

			var TrIdCardOne = e.parentNode.parentNode.parentNode.id
			var arrayValue = TrIdCardOne.split('_')
			var lessonOneTitle = $('#' + TrIdCardOne).find('.lessonTitle').attr('value')
			var lessonOneComplete = $('#' + TrIdCardOne).find('.completeLesson').val()
			$('#' + TrIdCardOne).find('.completeLesson').attr('value', lessonOneComplete)
			var lessonOneInCompleteLesson = $('#' + TrIdCardOne).find('.incompleteLesson').val()
			$('#' + TrIdCardOne).find('.incompleteLesson').attr('value', lessonOneInCompleteLesson)
			var indexOF = arrayValue[2]
			var staticOrder = indexOF
			if (scheduleLessonsArray[indexOF] == undefined) {
				scheduleLessonsArray.push({
					days_until_next_lesson_on_completion: parseInt(lessonOneComplete),
					days_until_next_lesson_on_incomplete: parseInt(lessonOneInCompleteLesson),
					order: parseInt(staticOrder),
					program_unit_urn: lessonOneTitle
				})
			} else {
				scheduleLessonsArray.splice(indexOF, 1, {
					days_until_next_lesson_on_completion: parseInt(lessonOneComplete),
					days_until_next_lesson_on_incomplete: parseInt(lessonOneInCompleteLesson),
					order: parseInt(staticOrder),
					program_unit_urn: lessonOneTitle
				})
			}
			$('#' + TrIdCardOne).find('.incompleteLesson').attr("readonly", false);
			var className = e.getAttribute('class')
			var newCase = $(e).hasClass(className)
			if (newCase = true) {
				$(e).attr('onchange', 'getlessonOneValue(this)')
			}
			$('#' + TrIdCardOne).find('#saveInput').addClass('hideBtn')
			$('#' + TrIdCardOne).find('#editInput').removeClass('hideBtn')
			$('#addNewRow').show()
		}

	}
/*-------------------------------End------------------------------------------------------*/

/* getlessonTwoValue is for getting the each value from individual Lesson and push in array individualLessonsArray*/

	function getlessonTwoValue(e) {
		if (e.length != undefined) {
			var id = $("#" + e).parent().attr('id');
			var val = e.split('o')
			var arrayValue = val[2]
			var lessonTwoTitle = $('#' + e).find('.lessonTitle').attr('value')
			var lessonTwoComplete = $('#' + id).find('.completeLesson').attr('value')
			var lessonTwoInCompleteLesson = $('#' + id).find('.incompleteLesson').attr('value')
			var lessonTwoIntervalDays = $('#' + id).find('.intervelDays').attr('value')
			var indexOF = arrayValue

			if (individualLessonsArray[indexOF] == undefined) {
				individualLessonsArray.push({
					send_days_after_start: parseInt(lessonTwoComplete),
					expires_after_days: parseInt(lessonTwoInCompleteLesson),
					repetition_interval_days: parseInt(lessonTwoIntervalDays),
					program_unit_urn: lessonTwoTitle
				})
			} else {
				individualLessonsArray.splice(indexOF, 1, {
					send_days_after_start: parseInt(lessonTwoComplete),
					expires_after_days: parseInt(lessonTwoInCompleteLesson),
					repetition_interval_days: parseInt(lessonTwoIntervalDays),
					program_unit_urn: lessonTwoTitle
				})
			}
			$('#' + id).find('.intervelDays').attr("readonly", false);
		} else {
			var dynamicTrId = e.parentNode.parentNode.parentNode.id
			var arrayValue = dynamicTrId.split('_')
			var lessonTwoTitle = $('#' + dynamicTrId).find('.lessonTitle').attr('value')
			var lessonTwoComplete = $('#' + dynamicTrId).find('.completeLesson').val()
			$('#' + dynamicTrId).find('.completeLesson').attr('value', lessonTwoComplete)
			var lessonTwoInCompleteLesson = $('#' + dynamicTrId).find('.incompleteLesson').val()
			$('#' + dynamicTrId).find('.incompleteLesson').attr('value', lessonTwoInCompleteLesson)
			var lessonTwoIntervalDays = $('#' + dynamicTrId).find('.intervelDays').val()
			$('#' + dynamicTrId).find('.intervelDays').attr('value', lessonTwoIntervalDays)
			var indexOF = arrayValue[2]
			if (individualLessonsArray[indexOF] == undefined) {
				individualLessonsArray.push({
					send_days_after_start: parseInt(lessonTwoComplete),
					expires_after_days: parseInt(lessonTwoInCompleteLesson),
					repetition_interval_days: parseInt(lessonTwoIntervalDays),
					program_unit_urn: lessonTwoTitle
				})
			} else {
				individualLessonsArray.splice(indexOF, 1, {
					send_days_after_start: parseInt(lessonTwoComplete),
					expires_after_days: parseInt(lessonTwoInCompleteLesson),
					repetition_interval_days: parseInt(lessonTwoIntervalDays),
					program_unit_urn: lessonTwoTitle
				})
			}
			$('#' + dynamicTrId).find('.intervelDays').attr("readonly", false);
			var className = e.getAttribute('class')
			var newCase = $(e).hasClass(className)
			if (newCase = true) {
				$(e).attr('onchange', 'getlessonTwoValue(this)')
			}
		}
	}
/*-------------------------------End------------------------------------------------------*/


/* saveAllData is called when user click save buton and all data is push into array  */
	function saveAllData() {
		$.each(scheduleLessonsArray, function(i, v) {
			var program = v.program_unit_urn
			var completion = v.days_until_next_lesson_on_completion
			var incomplete = v.days_until_next_lesson_on_incomplete
			var nanIncomplete = isNaN(incomplete)
			var nanComplete = isNaN(completion)
			if (nanIncomplete != false || nanComplete != false || program == '123') {
				scheduleLessonsArray.splice(i, 1)
			}
		})

		$.each(individualLessonsArray, function(i, v) {
			var programIndividual = v.program_unit_urn
			var completionIndividual = v.send_days_after_start
			var incompleteIndividual = v.expires_after_days
			var repetitionIndividual = v.repetition_interval_days
			var nanIndiIncomplete = isNaN(incompleteIndividual)
			var nanIndiComplete = isNaN(completionIndividual)
			var nanIndiRepetition = isNaN(repetitionIndividual)
			if (programIndividual == '123' || nanIndiIncomplete != false || nanIndiIncomplete != false || nanIndiRepetition != false) {
				individualLessonsArray.splice(i, 1)
			}
		})
		if (routineDbValue != '' && contextualDbValue != '' && doaminTitle != undefined) {
			var domainPutData = {
				routine_urn: routineDbValue[0],
				contextual_identifier_urn: contextualDbValue[0],
				schedule_lessons: scheduleLessonsArray,
				individual_lessons: individualLessonsArray,
				title: doaminTitle,
			};

			saveRuleToDb(domainPutData)
		} else {
			alert('Title, Routine And Contextual Identifier is Required')
		}
	}
/*-------------------------------End------------------------------------------------------*/
//***-------------------For uuid-------------*>
	function uuidv4() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}
/*-------------------------------End------------------------------------------------------*/

/*For checking window url pathname */
	function getWindowUrl() {
		pathWindowUrl = window.location.pathname

	}

	getWindowUrl()
	if (pathWindowUrl == '/content-service/admin/skilldomain/new/') {
		uuid = uuidv4()
	}
	if (pathWindowUrl == '/content-service/admin/skilldomain/edit/') {
		uuid = windowUrl
	}
/*-------------------------------End------------------------------------------------------*/

/* This function is for get value of title input by user */
	function getTitle() {
		doaminTitle = $('#title').val()
	}
/*-------------------------------End------------------------------------------------------*/


/*Save PUT Api  is Called */
	function saveRuleToDb(domainData) {
		$.ajax({
			type: 'PUT',
			url: '/content-service/domain/urn:vida:domain:' + uuid,
			data: JSON.stringify(domainData),
			dataType: 'json',
			contentType: 'application/json; charset=utf-8'
		}).done(function(msg) {
			alert(msg)
		})
		window.location = '/content-service/admin/skilldomain/'
	}
/*-------------------------------End------------------------------------------------------*/

/*This function is for Add new row for schedule lesson  */
	function addNewRowTableOne(e) {
		var className = e.getAttribute('class')
		var newCase = $(e).hasClass(className)
		if (newCase = true) {
			$(e).attr('onkeyup', '')
		}
		$('ul[id=scheduleLessons] li label input').each(function() { // id of ul
			$(this).attr('checked', false)
		})
		var length = scheduleLessonsArray.length

		$('#mainTableBody').append('<tr id="confirm_appointment_' + length + '"> <td style="width: 30%;"onclick="getInsertPlace(this)" id="td' + length + '"><a class="input_border_add form-control" href="#lessonOne" data-toggle="modal" data-target="#lessonOne">&nbsp;</a> <input type="hidden" value="123" class="lessonTitle"> </td><td id=""><a ><input onchange="getlessonOneValue(this)" class="completeLesson form-control" type="number" name="" value=""></a></td><td id=""><a ><input onkeyup="addNewRowTableOne(this)" onchange="getlessonOneValue(this)" class="incompleteLesson form-control" type="number" name="" value="" readonly></a></td><td style="width: 5%; vertical-align: middle" class="remove" onclick="removeFirst(this)"><i class="glyphicon glyphicon-trash"></i></td></tr>')
	}
/*-------------------------------End------------------------------------------------------*/

/*This function is for Add new row for Individual lesson  */
	function addNewRowTableTwo(e) {
		var className = e.getAttribute('class')
		var newCase = $(e).hasClass(className)
		if (newCase = true) {
			$(e).attr('onkeyup', '')
		}
		var length = individualLessonsArray.length
		$('#mainTableTwoBody').append('<tr id="confirm_lessonTwo_' + length + '"><td style="width: 30%;" onclick="getInsertPlacelessonTwo(this)" id="lessonTwo' + length + '"><a class="input_border_add form-control" href="#lessonTwo" data-toggle="modal" data-target="#lessonTwo">&nbsp;</a><input type="hidden" value="123" class="lessonTitle"></td><td id=""><a><input  onchange="getlessonTwoValue(this)"  class="completeLesson form-control" type="number" name="" value="" ></a></td><td id=""><a ><input  onchange="getlessonTwoValue(this)" class="incompleteLesson form-control" type="number" name="" value="" ></a></td><td id=""><a ><input onkeyup=" addNewRowTableTwo(this)" onchange="getlessonTwoValue(this)" class="intervelDays form-control" type="number" name="" value="" readonly ></a></td><td onclick="removeSecond(this)" style="width: 5%; vertical-align: middle" class="removeContextual" ><i  class="glyphicon glyphicon-trash"></i></td></tr>')
	}
/*-------------------------------End------------------------------------------------------*/

/*This function is for order schedule lesson  */
	function dragScheduleLessons() {
		$(function() {
			var manipulate, oldIndex;
			$("#mainTableBody").sortable({
				start: function(event, ui) {
					var updt = ui.item.index();
					manipulate = updt;
					oldIndex = scheduleLessonsArray[manipulate];
				},
				update: function(e, ui) {
					var newIndex = ui.item.index();
					scheduleLessonsArray.splice(manipulate, 1);
					scheduleLessonsArray.splice(newIndex, 0, oldIndex);
					rankTest = newIndex

					$("#mainTableBody tr").each(function(i, elm) {

						$elm = $(elm); // cache the jquery object
						$elm.attr("id", 'confirm_appointment_' + $elm.index("#mainTableBody tr"));
					});
					$.each(scheduleLessonsArray, function(iNew, vNew) {
						scheduleLessonsArray.splice(iNew, 1, {
							days_until_next_lesson_on_completion: vNew.days_until_next_lesson_on_completion,
							days_until_next_lesson_on_incomplete: vNew.days_until_next_lesson_on_incomplete,
							program_unit_urn: vNew.program_unit_urn,
							order: iNew
						})
					})
				}
			});
			$("#drag_div").disableSelection();


		});
	}
	dragScheduleLessons()
/*-------------------------------End------------------------------------------------------*/

/*This function is for delete row from schedule lesson  */
	function removeFirst(e) {
		var valueOf = e.parentNode.id
		var dynamicId = valueOf.split('_')
		var removeIndex = dynamicId[2]
		$(e).parent().remove();
		scheduleLessonsArray.splice(removeIndex, 1)
		var testValue = scheduleLessonsArray.length
		var counter = 0;
		$("#mainTableBody tr").each(function() {

			$(this).attr('id', 'confirm_appointment_' + counter);
			$(this).find('td:first-child').attr('id', 'td' + counter) //just to show the result
			var count = (testValue - 1)
			if (count == counter) {
				$(this).find('td:nth-child(3)').attr('onkeyup', ' addNewRowTableOne(this)')
			}
			counter++;
		});
		$.each(scheduleLessonsArray, function(iNew, vNew) {
			scheduleLessonsArray.splice(iNew, 1, {
				days_until_next_lesson_on_completion: vNew.days_until_next_lesson_on_completion,
				days_until_next_lesson_on_incomplete: vNew.days_until_next_lesson_on_incomplete,
				program_unit_urn: vNew.program_unit_urn,
				order: iNew
			})
		})
		if (scheduleLessonsArray.length === 0) {
			$('#mainTableBody').append('<tr id="confirm_appointment_0"> <td style="width: 30%;"onclick="getInsertPlace(this)" id="td0"><a class="input_border_add form-control" href="#lessonOne" data-toggle="modal" data-target="#lessonOne"></a> <input type="hidden" value="" class="lessonTitle"> </td><td id=""><a ><input onchange="getlessonOneValue(this)" class="completeLesson form-control" type="number" name="" value=""></a></td><td id=""><a ><input onkeyup="addNewRowTableOne(this)" onchange="getlessonOneValue(this)" class="incompleteLesson form-control" type="number" name="" value="" readonly></a></td><td style="width: 5%; vertical-align: middle" class="remove" onclick="removeFirst(this)"><i class="glyphicon glyphicon-trash"></i></td></tr>')
		}
	}

/*-------------------------------End------------------------------------------------------*/

/*This function is for delete row from individual lesson  */
	function removeSecond(e) {
		var valueOf = e.parentNode.id
		var dynamicId = valueOf.split('_')
		var removeIndex = dynamicId[2]
		$(e).parent().remove();
		individualLessonsArray.splice(removeIndex, 1)
		var testValue = individualLessonsArray.length
		var counter = 0;
		$("#mainTableTwoBody tr").each(function() {

			$(this).attr('id', 'confirm_lessonTwo_' + counter);
			$(this).find('td:first-child').attr('id', 'lessonTwo' + counter) //just to show the result
			var count = (testValue - 1)
			if (count == counter) {
				$(this).find('td:nth-child(3)').attr('onkeyup', ' addNewRowTableTwo(this)')
			}
			counter++;
		});
		if (individualLessonsArray.length === 0) {
			$('#mainTableTwoBody').append('<tr id="confirm_lessonTwo_0"><td style="width: 30%;" onclick="getInsertPlacelessonTwo(this)" id="lessonTwo0"><a class="input_border_add form-control" href="#lessonTwo" data-toggle="modal" data-target="#lessonTwo">&nbsp;</a><input type="hidden" value="" class="lessonTitle"></td><td id=""><a ><input  onchange="getlessonTwoValue(this)" class="completeLesson form-control" type="number" name="" value="" ></a></td><td id=""><a ><input onchange="getlessonTwoValue(this)" class="incompleteLesson form-control" type="number" name="" value="" ></a></td><td id=""><a ><input onkeyup="addNewRowTableTwo(this)" onchange="getlessonTwoValue(this)" class="intervelDays form-control" type="number" name="" value="" readonly></a></td><td style="width: 5%; vertical-align: middle" class="remove" onclick="removeSecond(this)"><i class="glyphicon glyphicon-trash"></i></td></tr>')
		}
	}
/*-------------------------------End------------------------------------------------------*/

/*This is  for search  */
	$(document).ready(function() {
		$("#routineSearchContent").on("keyup", function() {
			var value = $(this).val().toLowerCase();
			$("#routineDataTest li").filter(function() {
				$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
			});
		});
		$("#contextualSearchContent").on("keyup", function() {
			var value = $(this).val().toLowerCase();
			$("#contextualData li").filter(function() {
				$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
			});
		});

		$("#scheduleLessonsSearch").on("keyup", function() {
			var value = $(this).val().toLowerCase();
			$("#scheduleLessons li").filter(function() {
				$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
			});
		});

		$("#individualLessonsSearch").on("keyup", function() {
			var value = $(this).val().toLowerCase();
			$("#individualLessons li").filter(function() {
				$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
			});
		});
	});
/*-------------------------------End------------------------------------------------------*/