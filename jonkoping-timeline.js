google.charts.load("current", {packages:["timeline"]});
google.charts.setOnLoadCallback(drawChartSpring);
google.charts.setOnLoadCallback(drawChartAutumn);
var today = new Date();

function date(day, month, year)
{
  return new Date(year, month - 1, day);
}

function start(day, month, year)
{
  return date(day, month, year);
}

function end(day, month, year)
{
  var d = date(day, month, year);
  d.setDate(d.getDate() + 1);
  return d;
}

function drawChartAutumn() {
  var container = document.getElementById('timeline-container-autumn');
  var chart = new google.visualization.Timeline(container);
  var dataTable = new google.visualization.DataTable();
  dataTable.addColumn({ type: 'string', id: 'Module' })
  dataTable.addColumn({ type: 'string', id: 'Project' });
  dataTable.addColumn({ type: 'date', id: 'Start' });
  dataTable.addColumn({ type: 'date', id: 'End' });
  var now = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  var left = date(4, 9, 2018);
  var autumnData = [
    //[ '\0', 'Now', now, now, { type: 'now' } ],	
	
	['Study period', 'Study period 3', start(13, 1, 2020), end(13, 3, 2020)],
	['Exam period', 'Exam period 3', start(14, 3, 2020), end(22, 3, 2020)],
	//['Re-exam', 'Re-exam 3', start(8, 2, 2020), end(16, 2, 2020)],
	
	['Study period', 'Study period 4', start(23, 3, 2020), end(20, 5, 2020)],
	['Exam period', 'Exam period 4', start(23, 5, 2020), end(31, 5, 2020)],
	['Re-exam', 'Re-exam 4', start(1, 6, 2020), end(7, 6, 2020)],
 
    
  ];

  var formatted = autumnData.slice();
  for (var i = 0; i < formatted.length; i++) {
    if (formatted[i].length > 4)
      formatted[i] = formatted[i].slice(0, 4);
  }
  dataTable.addRows(formatted);


  chart.draw(dataTable, {
    timeline: {
      colorByRowLabel: true
    }
  });

  nowLine('timeline-container-autumn');
  $("#timeline-container-autumn rect[width=3]").hide();

  google.visualization.events.addListener(chart, 'onmouseover', function(obj){
    var row = autumnData[obj.row];

    if (row.length > 4) {
      if (row[4].type && (row[4].type == 'now' || row[4].type == 'separator')) {
        $('.google-visualization-tooltip').css('display', 'none');
      }
    }

    nowLine('timeline-container-autumn');
    $("#timeline-container-autumn rect[width=3]").hide();
  })

  google.visualization.events.addListener(chart, 'onmouseout', function(obj){
    nowLine('timeline-container-autumn');
    $("#timeline-container-autumn rect[width=3]").hide();
  })

  google.visualization.events.addListener(chart, 'select', function(){
    var row = autumnData[chart.getSelection()[0].row];

    if (row.length > 4) {
      if (row[4].url) {
        var win = window.open(row[4].url, '_blank');
        win.focus();
      }
    }
  })
}

function drawChartSpring() {
  var container = document.getElementById('timeline-container-spring');
  var chart = new google.visualization.Timeline(container);
  var dataTable = new google.visualization.DataTable();
  dataTable.addColumn({ type: 'string', id: 'Module' })
  dataTable.addColumn({ type: 'string', id: 'Project' });
  dataTable.addColumn({ type: 'date', id: 'Start' });
  dataTable.addColumn({ type: 'date', id: 'End' });
  var now = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  var left = date(4, 9, 2018);
  var springData = [
    //[ '\0', 'Now', now, now, { type: 'now' } ],	
	['Introduction week', 'Introduction week', start(19, 8, 2019), end(25, 8, 2019)],
	
	['Study period', 'Study period 1', start(26, 8, 2019), end(11, 10, 2019)],
	['Exam period', 'Exam period 1', start(12, 10, 2019), end(20, 10, 2019)],
	
	['Study period', 'Study period 2', start(21, 10, 2019), end(6, 12, 2019)],
	['Exam period', 'Exam period 2', start(9, 12, 2019), end(17, 12, 2019)],
	['Re-exam', 'Re-exam', start(4, 1, 2020), end(12, 1, 2020)],
 
    
  ];

  var formatted = springData.slice();
  for (var i = 0; i < formatted.length; i++) {
    if (formatted[i].length > 4)
      formatted[i] = formatted[i].slice(0, 4);
  }
  dataTable.addRows(formatted);


  chart.draw(dataTable, {
    timeline: {
      colorByRowLabel: true
    }
  });

  nowLine('timeline-container-spring');
  $("#timeline-container-spring rect[width=3]").hide();

  google.visualization.events.addListener(chart, 'onmouseover', function(obj){
    var row = springData[obj.row];

    if (row.length > 4) {
      if (row[4].type && (row[4].type == 'now' || row[4].type == 'separator')) {
        $('.google-visualization-tooltip').css('display', 'none');
      }
    }

    nowLine('timeline-container-spring');
    $("#timeline-container-spring rect[width=3]").hide();
  })

  google.visualization.events.addListener(chart, 'onmouseout', function(obj){
    nowLine('timeline-container-spring');
    $("#timeline-container-spring rect[width=3]").hide();
  })

  google.visualization.events.addListener(chart, 'select', function(){
    var row = springData[chart.getSelection()[0].row];

    if (row.length > 4) {
      if (row[4].url) {
        var win = window.open(row[4].url, '_blank');
        win.focus();
      }
    }
  })
}

function nowLine(div) {

    //get the height of the timeline div
    var height;
    $('#' + div + ' rect').each(function(index) {
        var x = parseFloat($(this).attr('x'));
        var y = parseFloat($(this).attr('y'));

        if (x == 0 && y == 0) {
            height = parseFloat($(this).attr('height'))
        }
    })

    var nowWord = $('#' + div + ' text:contains("Now")');

    nowWord.prev().first().attr('height', height + 'px').attr('width', '1px').attr('y', '0');
    // add this line to remove the display:none style on the vertical line
    $('#' + div + '  text:contains("Now")').each(function(idx, value) {
        if (idx == 0) {
            $(value).parent().find("rect").first().removeAttr("style");
        } else if (idx == 1) {
            $(value).parent().find("rect").first().attr("style", "display:none;");
        }

    });
}

$(document).ready(function(){
  $.getJSON("https://api.github.com/repos/BruhJerem/jonkopingTimeline/commits", function(json){
    var msg, el, date;

    $("#changelog-container").empty();

    for (var i = 0; i < json.length; i++) {
      msg = json[i].commit.message.split("\n");
      date = moment(json[i].commit.committer.date);
      el = $(`<p class="commit">
<a href="${json[i].html_url}" target="_blank" class="commit-msg">${msg[0]}</a>
<span title="${date.format("dddd, MMMM Do YYYY, h:mm:ss a")}" class="commit-date">${date.fromNow()}</span>
</p>`);
      if (msg.length > 1){
        for (var j = msg.length - 1; j >= 1; j--) {
          if (msg[j].length > 0){
            el.addClass("expanded");
            el.find("a").after(`<span class="commit-desc">${msg[j]}</span>`);
          }
        }
      }
      el.appendTo($("#changelog-container"));
    }

    if (json.length <= 0){
      $("#changelog-container").text("No commits !? xO");
    }
  })
  .fail(function(){
    $("#changelog-container").text("Error while loading changelog :'(");
  });

  function set_theme(dark){
    var dark = dark || false;

    window.localStorage.setItem("dark", dark);

    if (dark){
      $("body").addClass("dark");
      $("#switch").text("Switch to light");
    }
    else{
      $("body").removeClass("dark");
      $("#switch").text("Switch to dark");
    }
  }

  $("#switch").on("click", function(){
    set_theme(!$("body").hasClass("dark"));
    return false;
  })

  set_theme(window.localStorage.getItem("dark") == "true" ? true : false);
  setTimeout(function(){
    $('body').addClass('ready');
  }, 500);
});
