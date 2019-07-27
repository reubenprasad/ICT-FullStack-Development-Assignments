var allSub = ["sem1 sub1","sem1 sub2","sem1 sub3","sem1 sub4","sem1 sub5","sem1 sub6","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",];
var semSub = Array();
function dispSemTable()
{  
    var sem = parseInt(document.getElementById("sem_inp").value);
    var empTab = document.getElementById("sem_tab");
    var name = document.getElementById("name_inp").value;
    var ecode = document.getElementById("ecode_inp").value;

    if(name.length!=0 && ecode.length!=0 && sem!=0)
    {
        var rowCount = empTab.rows.length;
        for (var j = rowCount - 1; j > 0; j--) 
        {
            empTab.deleteRow(j);
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
    var empTab = document.getElementById("sem_tab");
    
    var rowCnt = empTab.rows.length;        // GET TABLE ROW COUNT.
    var tr = empTab.insertRow(rowCnt);      // TABLE ROW.
    /* tr = empTab.insertRow(rowCnt); */

    for (var c = 0; c < 3; c++) 
    {
        var td = document.createElement('td');          // TABLE DEFINITION.
        td = tr.insertCell(c);

        if (c == 0) {           // FIRST COLUMN.
            // ADD A BUTTON.
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
    var empTab = document.getElementById("sem_tab");
    var marks = Array();
    var totMarks = Array();
    var perc = Array();
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
                marks[i] = document.getElementById("sem_tab").rows[i].cells[j].children[0].value;
                if(j == 2)
                {
                    totMarks[i] = document.getElementById("sem_tab").rows[i].cells[j].children[0].value;
                    perc[i] = (marks[i]/totMarks[i]) * 100;
                }
            }
        }
        if(emptyFlag == 1)
        {
            alert("Please fill out all the marks");
            break;
        }
    }
    
}