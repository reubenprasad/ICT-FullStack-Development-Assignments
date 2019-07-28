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
                }
            }
        }
        if(emptyFlag == 1)
        {
            alert("Please fill out all the marks");
            break;
        }
    }
    
    /* var resTab = document.getElementById("res_tab");

    var rowCnt = resTab.rows.length;        // GET TABLE ROW COUNT.
    var tr = resTab.insertRow(rowCnt);      // TABLE ROW.

    for (var c = 0; c < 3; c++) 
    {
        var td = document.createElement('td');          // TABLE COLUMN.
        td = tr.insertCell(c);

        if (c == 0) {           // FIRST COLUMN.
            var label = document.createElement('label');

            // SET INPUT ATTRIBUTE.
            label.setAttribute('type', 'text');
            label.textContent = allSub[i];

            var j = i % 6;
            semSub[j] = allSub[i];

            td.appendChild(label);
        }
        else {
            // CREATE AND ADD TEXTBOX IN EACH CELL.
            var ele = document.createElement('input');
            ele.setAttribute('type', 'number');
            ele.setAttribute('min', '0');
            ele.setAttribute('step', '0.01');
            ele.setAttribute('style', 'border: solid black 1px');
        
            ele.required = true;

            td.appendChild(ele);
        }
    } */

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