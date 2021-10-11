/**
 * Function To Add New Task in the JSON List
 */
function addTask() {

    tit = document.getElementById("title").value;
    desc = document.getElementById("description").value;
    
    tDate = new Date();
    date = tDate.toLocaleDateString();
    time = tDate.getHours() + ' : ' + tDate.getMinutes() + ' : ' + tDate.getSeconds();
    
    tdDate = "<small>"+time+"</small>"+" <b>|</b> "+"<small>"+date+"</small>";    

    if (localStorage.getItem('itemsJson') == null) {
        itemsJsonArray = [];
        itemJsonObj = {'title':tit, 'description':desc, 'date':tdDate};
        // console.log(itemJsonObj);

        itemsJsonArray.push(itemJsonObj);
        localStorage.setItem('itemsJson',JSON.stringify(itemsJsonArray))
    }else{
        itemsJsonArrayStr = localStorage.getItem('itemsJson')
        itemsJsonArray = JSON.parse(itemsJsonArrayStr);
        itemJsonObj = {'title':tit, 'description':desc, 'date':tdDate};
        // console.log(itemJsonObj);

        itemsJsonArray.push(itemJsonObj);
        localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray));
    }
    updateTable();
}

/**
 * Event Listener to start add task process 
 * when OnClick Add button on Modal box
 */
add = document.getElementById("add");

add.addEventListener("click", ()=>{
    addTask();
    window.location.reload();
});
updateTable();

/**
 * Update Table function to update table on every add,edit and delete activity.
 */
function updateTable(){
    if (localStorage.getItem('itemsJson') == null) {
        itemsJsonArray = [];
        localStorage.setItem('itemsJson',JSON.stringify(itemsJsonArray));
    }else{
        itemsJsonArrayStr = localStorage.getItem('itemsJson')
        itemsJsonArray = JSON.parse(itemsJsonArrayStr);
    }
    // Populate the Table
    let tableBody = document.getElementById("tableBody");
    let str = "";
    itemsJsonArray.forEach((element, index) => {
        str += `
            <tr class="tr-bar">
            <th scope="row">${index + 1}</th>
            <td>${element.title}</td>
            <td>${element.description}</td>
            <td>${element.date}</td>
            <td>
            <button type="button" class="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#editTaskModal" onclick="editTask(${index})" value="${element.title}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg></button> &nbsp;
            <button class="btn btn-sm btn-outline-danger" onclick="deleted(${index})">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg></button>
            </td>
            </tr>
        `;
    });
    tableBody.innerHTML = str;
}

/**
 * Delete function to delete specific row in the table.
 */
function deleted(itemIndex) {
    // console.log("Delete", itemIndex);
    itemsJsonArrayStr = localStorage.getItem('itemsJson')
    itemsJsonArray = JSON.parse(itemsJsonArrayStr);
    //  Delete itemIndex element from the array
    if (confirm("Do you really want to Delete this Task?"
        )) {
            itemsJsonArray.splice(itemIndex, 1);
            localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray));
            updateTable();
    }
}

/**
 *  Edit function to update the Specific JSON Row in the Array
 */
function saveEditTask() {
    
    id = document.getElementById("editId").value;
    tit = document.getElementById("editTitle").value;
    desc = document.getElementById("editDesc").value;
    
    tDate = new Date();
    date = tDate.toLocaleDateString();
    time = tDate.getHours() + ' : ' + tDate.getMinutes() + ' : ' + tDate.getSeconds();
    
    tdDate = "<small>"+time+"</small>"+" <b>|</b> "+"<small>"+date+"</small>";    
    
    if (localStorage.getItem('itemsJson') != null) {

        itemsJsonArrayStr = localStorage.getItem('itemsJson');
        itemsJsonArray = JSON.parse(itemsJsonArrayStr);
        
        itemsJsonArray[id].title = tit;
        itemsJsonArray[id].description = desc;
        itemsJsonArray[id].date = tdDate;
        // console.log(itemsJsonArray[id]);
        // console.log(itemsJsonArray);
        localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray));
    }
    updateTable();
}

/**
 *  Edit function to start edit of the Specific row of the Table
 */
function editTask(itemIndex) {
        
        console.log("Edit Task", itemIndex);
        
        let filterRow = [];
        itemsJsonArrayStr = localStorage.getItem('itemsJson');
        itemsJsonArray = JSON.parse(itemsJsonArrayStr);
        filterRow = itemsJsonArray[itemIndex];
        
        // console.log(filterRow);

        // Populate the Model
        let modalLabel = document.getElementById("editTaskModalLabel");
        let modalId = document.getElementById("editId");
        let modalTitle = document.getElementById("editTitle");
        let modalDesc = document.getElementById("editDesc");

        modalLabel.innerHTML = "Editing "+filterRow.title;
        modalId.value = itemIndex
        modalTitle.value = filterRow.title;
        modalDesc.innerHTML = filterRow.description;        
         
}
/**
 * Event Listener to save editing task process 
 * when OnClick edit button on Modal box
 */
saveEdit = document.getElementById("edit");

saveEdit.addEventListener("click", ()=>{
    saveEditTask();
    window.location.reload();
});

/**
 * function to clear complete localstorage of the browser.
 */
function clearStorage() {
    if (confirm(
        "Do you really want clear the table?"
    )) {
    // console.log('Clearing the Storage');
    localStorage.clear();
    updateTable();
    }
}

function search() {
    let input, filter, table, tr, td, txtValue;

    input = document.getElementById("searchBar");
    filter = input.value.toUpperCase();
    table = document.getElementById("searchTable");
    tr = document.getElementsByTagName("tr");

    for (let i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        } 
    }
}

function sortTable() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("tableBody");
    switching = true;

    while (switching) {
      switching = false;
      rows = table.rows;

      for (i = 1; i < (rows.length - 1); i++) {

        shouldSwitch = false;
       
        x = rows[i].getElementsByTagName("TD")[0];
        y = rows[i + 1].getElementsByTagName("TD")[0];
        
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }