var rankTest
var rule_urn_value
let program_urns = []
let goal_urns = []
let condition_urns = []
let domain_urns = []

let multiple_rules = []
var rules = []
var programsArray = [];
var goalArray = [];
var conditionArray = [];
var domainArray = [];

var allConditions = []
var allPrograms = []
var allGoals = []
var allDomains = []
var parentDivloop
var tempRuleArray = [];
var tempKlon
var tempDragRule
var editAndClone
var obj = {},
    someBlock = $('.someBlock');
// --------------------------Tooltip------------------------------------------------
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})



var button_value = JSON.parse(localStorage.getItem("button_dynamic"))
var pageUrl = $(location).attr('href')
var behaviorUrn = pageUrl.split("=")[1]

function getRulesOnload() {

    if (rules.length > 0) {

        $('#divloop0').remove()
        $.each(rules, function (i, v) {
            multiple_rules.push({ rule_urn: v.rule_urn, rank: v.rank })
            $('#drag_div').append('<div class="col-sm-12 divloop" id="divloop' + i + '"> <div class="main_card"> <div class="row"> <div class="col-md-3 col-sm-3 col-xs-12"> <div class="inner_card"> <h4>Programs <a data-toggle="tooltip" data-placement="top" title="Add New" class="" id="program_Modal" onclick="openModal(this)"><i class="glyphicon glyphicon-plus" data-id="programs" data-toggle="modal" ></i></a></h4> <div class="max_content"> <ul id="programsAppend"> </ul> </div></div></div><div class="col-md-2 col-sm-3 col-xs-12"> <div class="inner_card"> <h4>Goals <a data-toggle="tooltip" data-placement="top" title="Add New" onclick="openModal(this)" class="" id="goal_id"><i class="glyphicon glyphicon-plus" data-toggle="modal" data-id="Goals"></i></a></h4> <div class="max_content"> <ul id="goalAppend"> </ul> </div></div></div><div class="col-md-2 col-sm-3 col-xs-12"> <div class="inner_card"> <h4>Conditions <a data-toggle="tooltip" data-placement="top" title="Add New" onclick="openModal(this)" class="" id="condition_id"><i class="glyphicon glyphicon-plus" data-toggle="modal" data-id="Conditions"></i></a></h4> <div class="max_content"> <ul id="conditionAppend"> </ul> </div></div></div><div class="col-md-1 col-sm-2 col-xs-12"> <div class="inner_card_arrow"> <div class="arrow"> <i class="glyphicon glyphicon-menu-right"></i> </div></div></div><div class="col-md-3 col-sm-3 col-xs-12"> <div class="inner_card"> <h4>Domains <a data-toggle="tooltip" data-placement="top" title="Add New" class="" id="domain_id" onclick="openModal(this)"><i class="glyphicon glyphicon-plus" data-toggle="modal" data-id="domains"></i></a></h4> <div class="max_content"> <ul id="domainAppend"> </ul> </div></div></div><div class="col-md-1 col-sm-1 col-xs-12"> <div class="inner_card_arrow"> <div class="arrow"> <a class="rigth_icon edit_show" onclick="fun_edit(this)"><i class="glyphicon glyphicon-edit " data-toggle="tooltip" data-placement="top" title="Edit" id="changeIcon"></i></a> <a class="rigth_icon side_check" onclick="onSaveRule(this)"><i class="glyphicon glyphicon-saved " data-toggle="tooltip" data-placement="top" title="Save" id="changeIcon"></i></a> <a class="rigth_icon duplicate_rule" onclick="duplicateDiv(this)"><i class="glyphicon glyphicon-duplicate" data-toggle="tooltip" data-placement="top" title="Duplicate"></i></a> <a class="rigth_icon delete_rule" onclick="deleteAllRule(this)"><i class=" glyphicon glyphicon-trash" data-toggle="tooltip" data-placement="top" title="Delete"></i></a> </div></div></div></div></div></div>'); $('#divloop' + i).find("#program_Modal").hide()
            $('#divloop' + i).find("#goal_id").hide()
            $('#divloop' + i).find("#condition_id").hide()
            $('#divloop' + i).find("#domain_id").hide()
            $('#divloop' + i).find(".delete_list").hide()
            $('#divloop' + i).find(".main_card").removeClass('active')
            $('#divloop' + i).find(".edit_show").show()
            $('#divloop' + i).find(".side_check").hide()
            $('#divloop' + i).find(".activeClick").hide()
        })
        $.each(rules, function (i, v) {
            $.each(v.programs, function (index, value) {
                $.each(allPrograms, function (api, apv) {
                    if (apv[0] == value) {
                        $("#divloop" + i).find("ul[id^='programsAppend']").append('<li id="programLi_' + index + '">' + apv[1] + '  <a onclick="hoverDataProgram(this)" value="' + apv[0] + '" data-toggle="tooltip" data-placement="left" title="Delete" class=" activeClick"><i class=" glyphicon glyphicon-trash delete_list"></i></a></li>')
                    }
                })
            });
        })
        $.each(rules, function (i, v) {
            $.each(v.goals, function (index, value) {
                $.each(allGoals, function (agi, agv) {
                    if (agv[0] == value) {
                        $("#divloop" + i).find("ul[id^='goalAppend']").append('<li id="goalLi_' + index + '">' + agv[1] + '<a onclick="hoverDataGoal(this)" value="' + agv[0] + '" data-toggle="tooltip" data-placement="left" title="Delete" class=" activeClick"><i class=" glyphicon glyphicon-trash delete_list"></i></a></li>')
                    }
                })
            })
        });
        $.each(rules, function (i, v) {
            $.each(v.conditions, function (index, value) {
                $.each(allConditions, function (aci, acv) {
                    if (acv[0] == value) {
                        $("#divloop" + i).find("ul[id^='conditionAppend']").append('<li id="conditionLi_' + index + '">' + acv[1] + '<a onclick="hoverDataCondition(this)" value="' + acv[0] + '"  data-toggle="tooltip" data-placement="left" title="Delete" class=" activeClick"><i class=" glyphicon glyphicon-trash delete_list"></i></a></li>')
                    }
                })
            })
        });
        $.each(rules, function (i, v) {
            $.each(v.domains, function (index, value) {
                $.each(allDomains, function (adi, adv) {
                    if (adv[0] == value) {
                        $("#divloop" + i).find("ul[id^='domainAppend']").append('<li id="domainLi_' + index + '">' + adv[1] + '<a onclick="hoverDataDomain(this)" value="' + adv[0] + '"  data-toggle="tooltip" data-placement="left" title="Delete" class=" activeClick"><i class=" glyphicon glyphicon-trash delete_list" ></i></a></li>')
                    }
                })
            })
        });

        $("#program_Modal").hide()
        $("#goal_id").hide()
        $("#condition_id").hide()
        $("#domain_id").hide()
        $(".delete_list").hide()
        $(".main_card").removeClass('active')
        $(".edit_show").show()
        $(".side_check").hide()
        $(".activeClick").removeClass('not-active')


    }
    if (rules.length == 0) {
        parentDivloop = 'divloop0'
        $("#divloop0").find('.delete_rule').addClass('not-active')
        $("#divloop0").find('.duplicate_rule').addClass('not-active')
        dragDomain()
        $('#program_Modal').show()
        $("#goal_id").show()
        $("#domain_id").show()
        $("#condition_id").show()
        $(".delete_list").show()
        $("#program_Modal").removeClass('not-active')
        $("#goal_id").removeClass('not-active')
        $("#condition_id").removeClass('not-active')
        $("#domain_id").removeClass('not-active')
        $(".main_card").addClass('active')
        $(".edit_show").hide()
        $(".side_check").show()
        $(".activeClick").removeClass('not-active')
    }
}

function dragDomain() {
    console.log(domainArray)
    var manipulate, oldIndex;
    $('#' + parentDivloop).find("#domainAppend").sortable({
        start: function (event, ui) {
            var updt = ui.item.index();
            manipulate = updt;

            oldIndex = domainArray[manipulate];
        },

        update: function (e, ui) {
            var newIndex = ui.item.index();

            domainArray.splice(manipulate, 1);
            domainArray.splice(newIndex, 0, oldIndex);

            $('#' + parentDivloop).find("#domainAppend li").each(function (i, elm) {
                $elm = $(elm); // cache the jquery object

                $elm.attr("id", 'domainLi_' + $elm.index("#domainAppend li"));
                $elm.find('a').attr("onclick", 'hoverDataDomain(this)')
            });
            domain_urns = []
            console.log(domainArray, 'aft')
        }
    });
    $('#' + parentDivloop).find("#domainAppend").disableSelection();
}

dragDomain()

function openModal(e) {
    var dynamicValue = e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
    var $dynamicId = dynamicValue.id
    $('#' + $('#' + e.id).find('i').attr("data-id")).attr('data-id', $dynamicId);
    $('#' + $('#' + e.id).find('i').attr("data-id")).modal('show');
}
// ------------for Clone--------------------------------------
function duplicateDiv(e) {
    if (tempKlon != undefined) {
        alert('please save other and then clone')
        return false
    }

    $("#drag_div").sortable("disable");
    $("#" + parentDivloop).sortable("enable");
    tempKlon = 'clicked'
    editAndClone = 'clicked'
    var $Clone = e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
    var $div = $Clone.id;
    var $editIdValue = $div.split('p')
    var testfail = document.getElementById($div).innerHTML
    //var num = parseInt($div.match(/\d+/g), 10) + 1;
    var num = tempRuleArray.length
    var $klon = 'divloop' + num;
    parentDivloop = $klon

    $temp_rule_urn = multiple_rules[$editIdValue[1]].rule_urn

    console.log(rules, 'clor')
    $.each(rules, function (i, v) {
        if (v.rule_urn == $temp_rule_urn) {
            programsArray = [];
            $.each(v.programs, function (ip, vp) {
                programsArray.push({ id: vp })
            })
        }
    })
    $.each(rules, function (i, v) {
        if (v.rule_urn == $temp_rule_urn) {
            goalArray = [];
            $.each(v.goals, function (ip, vp) {
                goalArray.push({ id: vp })
            })
        }
    })
    $.each(rules, function (i, v) {
        if (v.rule_urn == $temp_rule_urn) {
            conditionArray = [];
            $.each(v.conditions, function (ip, vp) {
                conditionArray.push({ id: vp })
            })
        }
    })
    $.each(rules, function (i, v) {
        if (v.rule_urn == $temp_rule_urn) {
            domainArray = [];
            $.each(v.domains, function (ip, vp) {
                domainArray.push({ id: vp })
            })
        }
    })
    $('#drag_div').append('<div class="col-sm-12 divloop" id="' + $klon + '">' + testfail + '</div>')
    dragDomain()
    $('.divloop').css("cursor", "move")
    $('#' + parentDivloop).find("#domainAppend").addClass("ui-sortable");

    $('#' + $klon).find('.delete_rule').addClass('hello')
    $('#' + $klon).find('.delete_rule').attr('onclick', 'deleteData()')
    $('#' + $klon).find('#program_Modal').show()
    $('#' + $klon).find("#goal_id").show()
    $('#' + $klon).find("#domain_id").show()
    $('#' + $klon).find("#condition_id").show()
    $('#' + $klon).find(".delete_list").show()
    $('#' + $klon).find("#program_Modal").removeClass('not-active')
    $('#' + $klon).find("#goal_id").removeClass('not-active')
    $('#' + $klon).find("#condition_id").removeClass('not-active')
    $('#' + $klon).find("#domain_id").removeClass('not-active')
    $('#' + $klon).find(".main_card").addClass('active')
    $('#' + $klon).find(".edit_show").hide()
    $('#' + $klon).find(".side_check").show()
    $('#' + $klon).find(".activeClick").removeClass('not-active')
    $('#' + $klon).find(".duplicate_rule").addClass('not-active')

    $('html, body').animate({
        scrollTop: $("#divloop" + num).offset().top
    }, 2000);
    //this section is for checked box
    $('ul[id=programGetContent] li label input').each(function () {// id of ul
        $(this).attr('checked', false)
        $(this).attr('disabled', false)
        $(this).removeClass('checkboxChecked')
    })
    if (programsArray.length > 0) {
        console.log(programsArray)
        $.each(programsArray, function (i, v) {
            $('ul[id=programGetContent] li label input').each(function () {// id of ul
                var value = $(this).val() //get each li in ul
                if (value == v.id) {
                    $(this).addClass('checkboxChecked')
                    $(this).attr('checked', false)
                    $(this).attr('disabled', false)
                }
            })
        })
    } else {
        $('ul[id=programGetContent] li label input').each(function () {// id of ul
            $(this).attr('checked', false)
            $(this).attr('disabled', false)
        })
    }
    $('ul[id=goalGetContent] li label input').each(function () {// id of ul
        $(this).attr('checked', false)
        $(this).attr('disabled', false)
        $(this).removeClass('checkboxChecked')
    })
    if (goalArray.length > 0) {
        $.each(goalArray, function (i, v) {
            $('ul[id=goalGetContent] li label input').each(function () {// id of ul
                var value = $(this).val() //get each li in ul
                if (value == v.id) {
                    $(this).addClass('checkboxChecked')
                    $(this).attr('checked', true)
                    $(this).attr('disabled', true)
                }
            })
        })
    } else {
        $('ul[id=goalGetContent] li label input').each(function () {// id of ul
            $(this).attr('checked', false)
            $(this).attr('disabled', false)
        })
    }
    $('ul[id=conditionGetContent] li label input').each(function () {// id of ul
        $(this).attr('checked', false)
        $(this).attr('disabled', false)
        $(this).removeClass('checkboxChecked')
    })
    if (conditionArray.length > 0) {
        $.each(conditionArray, function (i, v) {
            $('ul[id=conditionGetContent] li label input').each(function () {// id of ul
                var value = $(this).val() //get each li in ul
                if (value == v.id) {
                    $(this).addClass('checkboxChecked')
                    $(this).attr('checked', true)
                    $(this).attr('disabled', true)
                }
            })
        })
    } else {
        $('ul[id=conditionGetContent] li label input').each(function () {// id of ul
            $(this).attr('checked', false)
            $(this).attr('disabled', false)
        })
    }
    $('ul[id=domainGetContent] li label input').each(function () {// id of ul
        $(this).attr('checked', false)
        $(this).attr('disabled', false)
        $(this).removeClass('checkboxChecked')
    })

    if (domainArray.length > 0) {
        $.each(domainArray, function (i, v) {
            $('ul[id=domainGetContent] li label input').each(function () {// id of ul
                var value = $(this).val() //get each li in ul
                if (value == v.id) {
                    $(this).addClass('checkboxChecked')
                    $(this).attr('checked', true)
                    $(this).attr('disabled', true)
                }
            })
        })
    } else {
        $('ul[id=domainGetContent] li label input').each(function () {// id of ul
            $(this).attr('checked', false)
            $(this).attr('disabled', false)
        })
    }
    //end here
}

function fun_edit(e) {
    if (parentDivloop != undefined) {
        alert('please save edited rule first!');
        return false;
    }

    $("#drag_div").sortable("disable");
    tempDragRule = 'clicked'
    editAndClone = 'clicked'

    var getParentDiv = e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
    var parent_id = getParentDiv.id

    var $editIdValue = parent_id.split('p')
    $temp_rule_urn = multiple_rules[$editIdValue[1]].rule_urn

    parentDivloop = parent_id
    $.each(rules, function (i, v) {
        console.log(v, 'edit', $temp_rule_urn)
        if (v.rule_urn == $temp_rule_urn) {
            programsArray = [];
            $.each(v.programs, function (ip, vp) {
                programsArray.push({ id: vp })
            })
        }
    })

    $.each(rules, function (i, v) {
        if (v.rule_urn == $temp_rule_urn) {
            goalArray = [];
            $.each(v.goals, function (ip, vp) {
                goalArray.push({ id: vp })
            })
        }
    })

    $.each(rules, function (i, v) {
        if (v.rule_urn == $temp_rule_urn) {
            conditionArray = [];
            $.each(v.conditions, function (ip, vp) {
                conditionArray.push({ id: vp })
            })
        }
    })
    console.log(domainArray, 'bef')
    $.each(rules, function (i, v) {
        if (v.rule_urn == $temp_rule_urn) {
            domainArray = [];
            $.each(v.domains, function (ip, vp) {
                domainArray.push({ id: vp })
            })
        }
    })
    console.log(domainArray, 'aftr')

    //this section is for checked box
    $('ul[id=programGetContent] li label input').each(function () {// id of ul
        $(this).attr('checked', false)
        $(this).attr('disabled', false)
        $(this).removeClass('checkboxChecked')
    })
    if (programsArray.length > 0) {
        console.log(programsArray)
        $.each(programsArray, function (i, v) {
            $('ul[id=programGetContent] li label input').each(function () {// id of ul
                var value = $(this).val() //get each li in ul
                if (value == v.id) {
                    $(this).addClass('checkboxChecked')
                    $(this).attr('checked', false)
                    $(this).attr('disabled', false)
                }
            })
        })
    } else {
        $('ul[id=programGetContent] li label input').each(function () {// id of ul
            $(this).attr('checked', false)
            $(this).attr('disabled', false)
        })
    }
    $('ul[id=goalGetContent] li label input').each(function () {// id of ul
        $(this).attr('checked', false)
        $(this).attr('disabled', false)
        $(this).removeClass('checkboxChecked')
    })
    if (goalArray.length > 0) {
        $.each(goalArray, function (i, v) {
            $('ul[id=goalGetContent] li label input').each(function () {// id of ul
                var value = $(this).val() //get each li in ul
                if (value == v.id) {
                    $(this).addClass('checkboxChecked')
                    $(this).attr('checked', true)
                    $(this).attr('disabled', true)
                }
            })
        })
    } else {
        $('ul[id=goalGetContent] li label input').each(function () {// id of ul
            $(this).attr('checked', false)
            $(this).attr('disabled', false)
        })
    }
    $('ul[id=conditionGetContent] li label input').each(function () {// id of ul
        $(this).attr('checked', false)
        $(this).attr('disabled', false)
        $(this).removeClass('checkboxChecked')
    })
    if (conditionArray.length > 0) {
        $.each(conditionArray, function (i, v) {
            $('ul[id=conditionGetContent] li label input').each(function () {// id of ul
                var value = $(this).val() //get each li in ul
                if (value == v.id) {
                    $(this).addClass('checkboxChecked')
                    $(this).attr('checked', true)
                    $(this).attr('disabled', true)
                }
            })
        })
    } else {
        $('ul[id=conditionGetContent] li label input').each(function () {// id of ul
            $(this).attr('checked', false)
            $(this).attr('disabled', false)
        })
    }
    $('ul[id=domainGetContent] li label input').each(function () {// id of ul
        $(this).attr('checked', false)
        $(this).attr('disabled', false)
        $(this).removeClass('checkboxChecked')
    })

    if (domainArray.length > 0) {
        $.each(domainArray, function (i, v) {
            $('ul[id=domainGetContent] li label input').each(function () {// id of ul
                var value = $(this).val() //get each li in ul
                if (value == v.id) {
                    $(this).addClass('checkboxChecked')
                    $(this).attr('checked', true)
                    $(this).attr('disabled', true)
                }
            })
        })
    } else {
        $('ul[id=domainGetContent] li label input').each(function () {// id of ul
            $(this).attr('checked', false)
            $(this).attr('disabled', false)
        })
    }
    //end here

    $("#" + getParentDiv.id).find('#program_Modal').show()
    $("#" + getParentDiv.id).find("#goal_id").show()
    $("#" + getParentDiv.id).find("#domain_id").show()
    $("#" + getParentDiv.id).find("#condition_id").show()
    $("#" + getParentDiv.id).find(".delete_list").show()
    $("#program_Modal").removeClass('not-active')
    $("#goal_id").removeClass('not-active')
    $("#condition_id").removeClass('not-active')
    $("#domain_id").removeClass('not-active')

    $("#" + getParentDiv.id).find(".main_card").addClass('active')
    $("#" + getParentDiv.id).find(".edit_show").hide()
    $("#" + getParentDiv.id).find(".side_check").show()
    $("#" + getParentDiv.id).find(".activeClick").removeClass('not-active')
    $("#" + getParentDiv.id).find(".duplicate_rule").removeClass('not-active')
    $("#" + getParentDiv.id).find('.duplicate_rule').addClass('not-active')
    $("#" + getParentDiv.id).find('.delete_rule').addClass('not-active')
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
    dragDomain()
    $("#" + getParentDiv.id).find("#domainAppend").sortable("enable");
    $('#domainAppend').css("cursor", "move")
}


var p = 0;
function fun_programAppend(e, idName) {
    var modalParent = e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
    var modalParentId = modalParent.id
    if ($(e).prop('checked') == true) {
        $(e).attr('disabled', true)
    } else {
        $(e).attr('disabled', false)
    }
    if (idName == 'programsAppend') {
        var programName = e.name
        var programValue = e.value

        programsArray.push({
            id: programValue,
            name: programName
        });
        console.log(programsArray)
    }
    $('#' + $('#' + modalParentId).attr('data-id')).find('#' + idName).append('<li id="program_' + p + '">' + e.name + '<a onclick="removeWithOutSave(this)" value="' + programValue + '" data-id="' + p + '" data-name="' + idName + '" data-toggle="tooltip" data-placement="left" title="Delete"><i class=" glyphicon glyphicon-trash delete_list"></i></a></li>')
    p++;
}

var g = 0;
function fun_GoalAppend(e, idName) {
    var modalParent = e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
    var modalParentId = modalParent.id
    if ($(e).prop('checked') == true) {
        $(e).attr('disabled', true)
    } else {
        $(e).attr('disabled', false)
    }
    if (idName == 'goalAppend') {
        var goalName = e.name
        var goalValue = e.value
        goalArray.push({
            id: goalValue,
            name: goalName
        });
    }
    $('#' + $('#' + modalParentId).attr('data-id')).find('#' + idName).append('<li id="goal_' + g + '">' + e.name + '<a onclick="removeWithOutSave(this)"  value="' + goalValue + '"data-id="' + g + '" data-name="' + idName + '" data-toggle="tooltip" data-placement="left" title="Delete"><i class=" glyphicon glyphicon-trash delete_list"></i></a></li>')
    g++;
}

var c = 0
function fun_ConditionAppend(e, idName) {
    var modalParent = e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
    var modalParentId = modalParent.id
    if ($(e).prop('checked') == true) {
        $(e).attr('disabled', true)
    } else {
        $(e).attr('disabled', false)
    }
    if (idName == 'conditionAppend') {
        var conditionName = e.name
        var conditionValue = e.value
        conditionArray.push({
            id: conditionValue,
            name: conditionName
        });
    }
    $('#' + $('#' + modalParentId).attr('data-id')).find('#' + idName).append('<li id="condition_' + c + '">' + e.name + '<a onclick="removeWithOutSave(this)" value="' + conditionValue + '" data-id="' + c + '" data-name="' + idName + '" data-toggle="tooltip" data-placement="left" title="Delete"><i class=" glyphicon glyphicon-trash delete_list"></i></a></li>')
    c++;
}

var d = 0
function fun_DomainAppend(e, idName) {
    var modalParent = e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
    var modalParentId = modalParent.id
    if ($(e).prop('checked') == true) {
        $(e).attr('disabled', true)
    } else {
        $(e).attr('disabled', false)
    }
    if (idName == 'domainAppend') {
        domainArray.push({
            id: e.value,
            name: e.name
        });
        $('#domainAppend').addClass("drag")
    }
    $('#' + $('#' + modalParentId).attr('data-id')).find('#' + idName).append('<li id="domainLi_' + d + '">' + e.name + '<a onclick="removeWithOutSave(this)" value="' + e.value + '" data-id="' + d + '" data-name="' + idName + '" data-toggle="tooltip" data-placement="left" title="Delete"><i class=" glyphicon glyphicon-trash delete_list"></i></a></li>')
    d++;
}
$(document).ready(function () {
    $("#programSearchContent").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#programGetContent li").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $("#goalSearchContent").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#goalGetContent li").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $("#conditionSearchContent").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#conditionGetContent li").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $("#domainSearchContent").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#domainGetContent li").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

//---------------------------- Delete function------------------------
function hoverDataGoal(e) {

    var elementId = e.parentNode.id;
    var id = $('#' + elementId).find('a').attr('value');

    $('ul[id=goalGetContent] li label input').each(function () {// id of ul
        var val = $(this).val();
        if (id == val) {
            console.log(id, val)
            $(this).attr('checked', false)
            $(this).attr('disabled', false)
        }
    })
    for (let index = 0; index < goalArray.length; index++) {
        console.log()
        if (goalArray[index].id == id) {
            goalArray.splice(index, 1)
        }
    }
    $('#' + parentDivloop).find('#' + elementId).remove();
}

function hoverDataCondition(e) {
    var elementId = e.parentNode.id;
    var id = $('#' + elementId).find('a').attr('value');
    $('ul[id=conditionGetContent] li label input').each(function () {// id of ul
        var val = $(this).val();
        if (id == val) {
            console.log(id, val)
            $(this).attr('checked', false)
            $(this).attr('disabled', false)
        }
    })
    for (let index = 0; index < conditionArray.length; index++) {
        if (conditionArray[index].id == id) {
            conditionArray.splice(index, 1)
        }
    }
    $('#' + parentDivloop).find('#' + elementId).remove();
}

function hoverDataDomain(e) {
    var elementId = e.parentNode.id;
    var id = $('#' + elementId).find('a').attr('value');
    $('ul[id=domainGetContent] li label input').each(function () {// id of ul
        var val = $(this).val();
        if (id == val) {
            console.log(id, val)
            $(this).attr('checked', false)
            $(this).attr('disabled', false)
        }
    })
    for (let index = 0; index < domainArray.length; index++) {
        if (domainArray[index].id == id) {
            domainArray.splice(index, 1)
        }
    }
    $('#' + parentDivloop).find('#' + elementId).remove();
}

function hoverDataProgram(e) {
    var elementId = e.parentNode.id;
    var id = $('#' + elementId).find('a').attr('value');
    console.log(id)
    $('ul[id=programGetContent] li label input').each(function () {// id of ul
        var val = $(this).val();

        if (id == val) {
            console.log(id, val)
            $(this).attr('checked', false)
            $(this).attr('disabled', false)
        }
    })
    for (let index = 0; index < programsArray.length; index++) {
        if (programsArray[index].id == id) {
            programsArray.splice(index, 1)
        }
    }
    $('#' + parentDivloop).find('#' + elementId).remove();
}
//---------------------------- Delete function------------------------


///----drag Rules-------
function dragRules() {
    $(function () {
        var manipulate, oldIndex;
        $("#drag_div").sortable({
            start: function (event, ui) {
                var updt = ui.item.index();
                manipulate = updt;
                oldIndex = multiple_rules[manipulate];
            },
            update: function (e, ui) {
                var newIndex = ui.item.index();
                multiple_rules.splice(manipulate, 1);
                multiple_rules.splice(newIndex, 0, oldIndex);
                rankTest = newIndex

                $("#drag_div .divloop").each(function (i, elm) {

                    $elm = $(elm); // cache the jquery object

                    //console.log($elm.context.innerHTML)
                    console.log($elm.index("#drag_div .divloop"))
                    $elm.attr("id", 'divloop' + $elm.index("#drag_div .divloop"));
                });
                $.each(multiple_rules, function (iNew, vNew) {
                    multiple_rules.splice(iNew, 1, { rule_urn: vNew.rule_urn, rank: (iNew + 1) })
                })
                var behavior = {
                    behavior_urn: behaviorUrn,
                    rules: multiple_rules,
                };
                saveBehavior(behavior);
            }
        });
        $("#drag_div").disableSelection();


    });
}
if (tempDragRule == undefined) {

    dragRules()
}



//---------Save to database LocalStorage------------------------
var rank = [];
function onSaveRule(e) {
    /*$("#" + parentDivloop).sortable("disable");*/
    parentDivloop = undefined
    tempKlon = undefined
    tempDragRule = undefined
    editAndClone = undefined
    $("#drag_div").sortable("enable");
    var getParentDiv = e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
    console.log(getParentDiv.id)
    $("#" + getParentDiv.id).find("#domainAppend").sortable("disable");



    $('#' + getParentDiv.id).find('.delete_rule').attr('onclick', 'deleteAllRule(this)')

    $("#" + getParentDiv.id).find('.duplicate_rule').removeClass('not-active')
    $("#" + getParentDiv.id).find('.delete_rule').removeClass('not-active')

    $("#" + getParentDiv.id).find('#program_Modal').hide()
    $("#" + getParentDiv.id).find("#goal_id").hide()
    $("#" + getParentDiv.id).find("#domain_id").hide()
    $("#" + getParentDiv.id).find("#condition_id").hide()
    $("#" + getParentDiv.id).find(".delete_list").hide()

    $('#domainAppend li').css("cursor", "pointer")
    var nm = e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
    var Id = nm.id
    var $testValue = Id.split('p')
    var rank_front = parseInt($testValue[1]) + parseInt(1)

    $('#' + Id).find(".edit_show").show()
    $('#' + Id).find(".side_check").hide()
    $('#' + Id).find(".main_card").removeClass('active')
    $('#' + Id).find("#program_Modal").hide()
    $('#' + Id).find("#goal_id").hide()
    $('#' + Id).find("#domain_id").hide()
    $('#' + Id).find("#condition_id").hide()
    $('#' + Id).find(".delete_list").hide()
    $('#' + Id).find(".duplicate_rule").removeClass('not-active')

    program_urns = []
    $.each(programsArray, function (i, v) {
        if (program_urns.includes(programsArray[i].id) != true) {
            program_urns.push(programsArray[i].id)
        }
    })
    goal_urns = []
    $.each(goalArray, function (i, v) {
        if (goal_urns.includes(goalArray[i].id) != true) {
            goal_urns.push(goalArray[i].id)
        }
    })
    condition_urns = []
    $.each(conditionArray, function (i, v) {
        if (condition_urns.includes(conditionArray[i].id) != true) {
            condition_urns.push(conditionArray[i].id)
        }
    })
    domain_urns = []
    $.each(domainArray, function (i, v) {
        if (domain_urns.includes(domainArray[i].id) != true) {
            domain_urns.push(domainArray[i].id)
        }
    })



    var tempRule
    var rule = {

        rule_urn: multiple_rules[$testValue[1]] != undefined ? multiple_rules[$testValue[1]].rule_urn : tempRule,
        behavior_urn: behaviorUrn,
        goal_urns: goal_urns,
        condition_urns: condition_urns,
        program_urns: program_urns,
        domain_urns: domain_urns
    };
    console.log(rule)
    if (tempRuleArray[$testValue[1]] == undefined) {
        tempRuleArray.push(rule)
    }
    saveRule(rule, rank_front)

    programsArray = [];
    goalArray = [];
    conditionArray = [];
    domainArray = [];
    program_urns = []
    goal_urns = []
    condition_urns = []
    domain_urns = []

}
//---------Save to database LocalStorage------------------------

function deleteAllRule(e) {


    if (editAndClone != undefined) {
        alert('Please save another rule then delete!');
        return false;
    }
    //this section only for loader
    function getValues() {
        obj.textVal = $('#textInput').val();
        obj.percentVal = $('#percentInput').val();
        obj.durationVal = $('#durationInput').val();
    }
    getValues();
    someBlock.preloader({
        text: obj.textVal,
        percent: obj.percentVal,
        duration: obj.durationVal
    });
    //end loader section


    parentDivloop = undefined
    tempKlon = undefined
    var ruleAll = e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
    var ruleId = ruleAll.id
    var $testValue = ruleId.split('p')

    if (multiple_rules[$testValue[1]] != undefined) {
        deleteRule(multiple_rules[$testValue[1]].rule_urn);
        multiple_rules.splice($testValue[1], 1)
        tempRuleArray.splice($testValue[1], 1)
        //use this on after delete sucess respomse
        $("#" + ruleId).remove()
    } else {
        $("#" + ruleId).remove()
    }
    //$("#drag_div").load(document.URL + ' #drag_div');

}


//----------------------drag and drop Rules-------------------------
/*$(function () {
	var manipulate, oldIndex;
	$("#drag_div").sortable({
		start: function (event, ui) {
			var updt = ui.item.index();
			manipulate = updt;
			oldIndex = multiple_rules[manipulate];
		},
		update: function (e, ui) {
			var newIndex = ui.item.index();
			multiple_rules.splice(manipulate, 1);
			multiple_rules.splice(newIndex, 0, oldIndex);
			rankTest = newIndex

			$("#drag_div div").each(function (i, elm) {
				$elm = $(elm); // cache the jquery object
			});
            $.each(multiple_rules,function(iNew,vNew){
            	multiple_rules.splice(iNew,1,{rule_urn:vNew.rule_urn,rank:(iNew+1)})
			})
			var behavior = {
				behavior_urn: behaviorUrn,
				rules: multiple_rules,
			};
			saveBehavior(behavior);
		}
	});
	$("#drag_div").disableSelection();


});*/



function saveRule(rule, rank_front) {
    alert(rank_front)
    $.ajax({
        type: 'POST',
        url: '/content-service/rule',
        data: JSON.stringify(rule),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8'
    }).done(function (msg) {
        rule_urn_value = JSON.parse(msg)

        if (multiple_rules.some(rulesValue => rulesValue.rule_urn == rule_urn_value) != true) {
            multiple_rules.push({ rule_urn: rule_urn_value, rank: rank_front })
            rules.push({ behavior: behaviorUrn, conditions: rule.condition_urns, domains: rule.domain_urns, goals: rule.goal_urns, programs: rule.program_urns, rank: rank_front, rule_urn: rule_urn_value })
        } else {

            var rulesIndex = rules.findIndex(ruleindex => ruleindex.rule_urn == rule_urn_value)

            rules.splice(rulesIndex, 1, { behavior: behaviorUrn, conditions: rule.condition_urns, domains: rule.domain_urns, goals: rule.goal_urns, programs: rule.program_urns, rank: rank_front, rule_urn: rule_urn_value })

        }

        var behavior = {
            behavior_urn: behaviorUrn,
            rules: multiple_rules,
        };
        //console.log(behavior)
        saveBehavior(behavior);

    });
}

function deleteRule(rule_urn) {

    $.ajax({
        type: 'DELETE',
        url: '/content-service/rule/' + rule_urn,
        contentType: 'application/json; charset=utf-8'
    }).done(function (msg) {
        //someBlock.preloader('remove');
        //After delete we are not getting any reponse send some response in api
        var behavior = {
            behavior_urn: behaviorUrn,
            rules: multiple_rules,
        };
        saveBehavior(behavior);
        setTimeout(function () {

            window.location.reload()
        }, 2000);
    });
}

function saveBehavior(behavior) {
    console.log(behavior, 'behaviour')
    $.ajax({
        type: 'POST',
        url: '/content-service/behavior',
        data: JSON.stringify(behavior),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8'
    });
}

function getBehavior(behavior_urn) {
    $.ajax({
        type: 'GET',
        url: '/content-service/behavior' + behavior_urn,
        contentType: 'application/json; charset=utf-8'
    }).done(function (msg) {

        $.each(msg.rules, function (i, v) {
            rules.push(v)
            tempRuleArray.push(v)
        })
        $.each(msg.programs, function (pi, pv) {
            allPrograms.push(pv)
        })
        $.each(msg.goals, function (gi, gv) {
            allGoals.push(gv)
        })
        $.each(msg.conditions, function (ci, cv) {
            allConditions.push(cv)
        })
        $.each(msg.domains, function (di, dv) {
            allDomains.push(dv)
        })
        getRulesOnload()
    });

}

getBehavior('/' + behaviorUrn);

function removeWithOutSave(e) {

    var main_div = e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id
    var hideElement = e.parentNode.id

    var name = $(e).data("name")
    var value = $('#' + hideElement).find('a').attr('value')

    if (name == 'programsAppend') {

        var idOfProgram = value
        for (let ip = 0; ip < programsArray.length; ip++) {
            if (programsArray[ip].id == idOfProgram) {
                $('ul[id=programGetContent] li label input').each(function () {// id of ul
                    var val = $(this).val();

                    if (idOfProgram == val) {
                        $(this).attr('checked', false)
                        $(this).attr('disabled', false)
                    }
                })
                programsArray.splice(ip, 1)
                program_urns.splice(program_urns.indexOf(programsArray[ip]), 1)
            }
        }
    }
    if (name == 'goalAppend') {

        var idOfGoal = value
        for (let ig = 0; ig < goalArray.length; ig++) {
            if (goalArray[ig].id == idOfGoal) {
                $('ul[id=goalGetContent] li label input').each(function () {// id of ul
                    var val = $(this).val();

                    if (idOfGoal == val) {
                        $(this).attr('checked', false)
                        $(this).attr('disabled', false)
                    }
                })
                goalArray.splice(ig, 1)
                goal_urns.splice(goal_urns.indexOf(goalArray[ig]), 1)
            }
        }
    }
    if (name == 'conditionAppend') {

        var idOfCondition = value

        for (let ic = 0; ic < conditionArray.length; ic++) {

            if (conditionArray[ic].id == idOfCondition) {

                $('ul[id=conditionGetContent] li label input').each(function () {// id of ul
                    var val = $(this).val();
                    if (idOfCondition == val) {
                        $(this).attr('checked', false)
                        $(this).attr('disabled', false)
                    }
                })
                conditionArray.splice(ic, 1)
                condition_urns.splice(condition_urns.indexOf(conditionArray[ic]), 1)
            }
        }
    }
    if (name == 'domainAppend') {
        var idOfDomain = value
        for (let di = 0; di < domainArray.length; di++) {
            if (domainArray[di].id == idOfDomain) {
                $('ul[id=domainGetContent] li label input').each(function () {// id of ul
                    var val = $(this).val();
                    if (idOfDomain == val) {
                        $(this).attr('checked', false)
                        $(this).attr('disabled', false)
                    }
                })
                domainArray.splice(di, 1)
                domain_urns.splice(domain_urns.indexOf(domainArray[di]), 1)
            }
        }
    }
    $("#" + main_div).find('#' + hideElement).remove()
}


function getTilte(e) {
    var buttonTitle = []
    buttonTitle.push(e)
    localStorage.setItem('button_dynamic', JSON.stringify(buttonTitle))
    $('#after_show').empty()
    $('#before_show').hide()
    $('#after_show').append(e + '<span class="caret"></span>')
    $('#after_show').show()
}


if (button_value != null) {

    $('#after_show').append(button_value + '<span class="caret"></span>')
    $('#after_show').show()
    $('#before_show').hide()
}

if (behaviorUrn == null) {

    localStorage.removeItem('button_dynamic')
    $('#after_show').hide()
    $('#before_show').show()

}
function deleteData() {
    $('#' + parentDivloop).remove()
    parentDivloop = undefined
    tempKlon = undefined
    tempDragRule = undefined
    editAndClone = undefined

}