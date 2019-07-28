var allSub = ["sem1 sub1","sem1 sub2","sem1 sub3","sem1 sub4","sem1 sub5","sem1 sub6","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",];
var semSub = Array();
function dispSemTable()
{  
    var sem = parseInt(document.getElementById("sem_inp").value);
    var semTab = document.getElementById("sem_tab");
    var name = document.getElementById("name_inp").value;
    var ecode = document.getElementById("ecode_inp").value;

    if(name.length!=0 && ecode.length!=0 && sem!=0)
    {
        var rowCount = semTab.rows.length;
        for (var j = rowCount - 1; j > 0; j--) 
        {
            semTab.deleteRow(j);
        }
        document.getElementById("sem_tab").style.visibility = "visible"; 
        document.getElementById("gen_ms").style.visibility = "visible"; 
        document.getElementById("clr2").style.visibility = "visible"; 
        
        /* var i = (sem-1) * 6; */

        for(var i=(sem-1) * 6; i < sem * 6; i++)
        {   
            addRow(i);
        }

    }
    else
    {
        alert("Please fill out all the fields");
    }

}

function addRow(i)
{
    var semTab = document.getElementById("sem_tab");
    
    var rowCnt = semTab.rows.length;        // GET TABLE ROW COUNT.
    var tr = semTab.insertRow(rowCnt);      // TABLE ROW.
   
    for (var c = 0; c < 3; c++) 
    {
        var td = document.createElement('td');          // TABLE COLUMN.
        td = tr.insertCell(c);

        if (c == 0) {           // FIRST COLUMN.
            
            var label = document.createElement('label');

            label.setAttribute('type', 'text');
            label.textContent = allSub[i];          //INSERT SUBJECT NAMES INTO FIRST COLUMN

            var j = i % 6;
            semSub[j] = allSub[i];

            td.appendChild(label);
        }
        else {
            // CREATE AND ADD TEXTBOX IN EACH CELL FOR MARKS.
            var ele = document.createElement('input');
            ele.setAttribute('type', 'number');
            ele.setAttribute('min', '0');
            ele.setAttribute('step', '0.01');
            ele.setAttribute('style', 'border: solid black 1px');
        
            ele.required = true;

            td.appendChild(ele);
        }
    }
}

function clearData(x)
{
    if(x == 1)
    document.getElementById("form1").reset();
    if(x == 2)
    document.getElementById("form2").reset(); 
}

function genMarksheet()
{
    var semTab = document.getElementById("sem_tab");
    var marks = Array();
    var totMarks = Array();
    var perc = Array();
    var grade = Array();
    var statusFlag = 0;
    for( var i=1; i < 7; i++)
    { 
        var emptyFlag = 0;
        for(var j=1; j<3; j++)
        {   
        
            if(document.getElementById("sem_tab").rows[i].cells[j].children[0].value == "")
            {
                emptyFlag = 1;
                break;
            }
            else
            {
                if(j == 1)
                marks[i] = parseFloat(document.getElementById("sem_tab").rows[i].cells[j].children[0].value);
                if(j == 2)
                {
                    totMarks[i] = parseFloat(document.getElementById("sem_tab").rows[i].cells[j].children[0].value);
                    perc[i] = (marks[i]/totMarks[i]) * 100;
                    grade[i] = calcGrade(perc[i]);
                    if(grade[i] == "F")
                    {
                        statusFlag = 1;      // To Check Status - Pass or Fail
                    }
                }
            }
        }
        if(emptyFlag == 1)
        {
            alert("Please fill out all the marks");
            break;
        }
    }
    if(emptyFlag == 0)
    {
            var resStudTab = document.getElementById("resstud_tab");
            var rowCnt = resStudTab.rows.length;
            for (var j = rowCnt; j > 0; j--) 
            {
                resStudTab.deleteRow(j);
            }
            document.getElementById("resstud_tab").style.visibility = "visible"; 
            var tr = resStudTab.insertRow(rowCnt);
            for(var c=0; c<4; c++)
            {
                var td = document.createElement("td");
                td = tr.insertCell(c);
                if(c == 0)
                td.textContent = `Name : ${document.getElementById("name_inp").value}`;
                if(c == 1)
                td.textContent = `Semester : ${document.getElementById("sem_inp").value}`;
                if(c == 2)
                td.textContent = `Exam Code :`;
                if(c == 3)
                td.textContent = `${document.getElementById("ecode_inp").value}`;
            }

            var resTab = document.getElementById("res_tab");
            rowCnt =resTab.rows.length;
            for (var j = rowCnt -1; j > 0; j--) 
            {
                resTab.deleteRow(j);
            }
            document.getElementById("res_tab").style.visibility = "visible"; 
            for(var i=1; i < 8 ;i++)
            {
                    rowCnt = resTab.rows.length;        // GET TABLE ROW COUNT.
                    tr = resTab.insertRow(rowCnt);      // TABLE ROW.

                    for (var c = 0; c < 4; c++) 
                    {
                        var td = document.createElement('td');          // TABLE COLUMN.
                        td = tr.insertCell(c);

                        if (c == 0) 
                        {           // FIRST COLUMN.
                            var label = document.createElement('label');
                            label.setAttribute('type', 'text');
                            label.textContent = semSub[i-1];
                            td.appendChild(label);
                        }
                        if(c == 1) 
                        {
                            var ele = document.createElement('label');
                            ele.setAttribute('type', 'text');
                            ele.textContent = marks[i];
                            td.appendChild(ele);
                        }
                        if(c == 2) 
                        {
                            if(i<7)
                            {
                                var ele = document.createElement('label');
                                ele.setAttribute('type', 'text');
                                ele.textContent = totMarks[i];
                                td.appendChild(ele);
                            }
                            else
                            {
                            var ele = document.createElement('label');
                            ele.setAttribute('type', 'text');
                            ele.textContent = "Status :";
                            td.appendChild(ele);     
                            }
                        }
                        if(c == 3) 
                        {
                            if(i<7)
                            {
                            var ele = document.createElement('label');
                            ele.setAttribute('type', 'text');
                            ele.textContent = grade[i];
                            td.appendChild(ele);
                            }
                            else
                            {
                                if(statusFlag == 0)
                                {
                                    var ele = document.createElement('label');
                                    ele.setAttribute('type', 'text');
                                    ele.textContent = "Passed";
                                    td.setAttribute('background-color', 'green');  
                                    td.appendChild(ele); 
                                }
                                else
                                {
                                    var ele = document.createElement('label');
                                    ele.setAttribute('type', 'text');
                                    ele.textContent = "Failed";
                                    td.setAttribute('background-color', 'red');  
                                    td.appendChild(ele); 
                                }
                            }
                        }

                    }
            }
    }

}

function calcGrade(perc)
{
    if(perc >= 95)
        return("S");
    else if(perc >= 90)
        return("A+");
    else if(perc >= 85)
        return("A");
    else if(perc >= 80)
        return("B+");
    else if(perc >= 75)
        return("B");
    else if(perc >= 70)
        return("C+");
    else if(perc >= 65)
        return("C");
    else if(perc >= 60)
        return("D+");
    else if(perc >= 55)
        return("D");
    else if(perc >= 50)
        return("E");
    else 
    return("F");                
}