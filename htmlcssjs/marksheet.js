var sub =["sem1 sub1","sem1 sub2","sem1 sub3","sem1 sub4","sem1 sub5","sem1 sub6","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",];
function dispSemTable()
{  
    var sem = parseInt(document.getElementById("sem_inp").value);

    document.getElementById("sem_tab").style.visibility = "visible"; 
    document.getElementById("gen_ms").style.visibility = "visible"; 
    
    var i = (sem-1) * 6;

    for(i=(sem-1) * 6; i < sem * 6 ; i++)
    { 
        addRow(i);
    }
}

function addRow(i)
{
    var empTab = document.getElementById("sem_tab");
    
    /* while(empTab.hasChildNodes())
        {
            empTab.removeChild(empTab.firstChild);
        } */
    var rowCnt = empTab.rows.length;        // GET TABLE ROW COUNT.
    var tr = empTab.insertRow(rowCnt);      // TABLE ROW.
    tr = empTab.insertRow(rowCnt);

    for (var c = 0; c < 3; c++) 
    {
        var td = document.createElement('td');          // TABLE DEFINITION.
        td.setAttribute('style', 'border: solid black 1px');
        td = tr.insertCell(c);

        if (c == 0) {           // FIRST COLUMN.
            // ADD A BUTTON.
            var label = document.createElement('label');

            // SET INPUT ATTRIBUTE.
            label.setAttribute('type', 'text');
            label.textContent = sub[i];

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

function genMarksheet()
{

}