let titleEl = document.getElementById("title")
let noteEl = document.getElementById("note")
const addBtn = document.getElementById("addBtn")
let dataEl = document.getElementById("data")

let data = []
let count = 0

let localLead = JSON.parse(localStorage.getItem("note"))
if (localLead) //checking localStorage is empty or not
{
    data = localLead
    render()
}

addBtn.addEventListener('click', function ()  //runs when submit button clicked
{
    if (titleEl.value && noteEl.value) //checking if input is empty or not
    {
        data.push(              //pushing data in array
            {
                title: titleEl.value,
                note: noteEl.value
            })
        localStorage.setItem("note", JSON.stringify(data))
        titleEl.value = ""
        noteEl.value = ""
        render()
    }
    else
    {
        let error = ""
        let cnt = 0
        if(!titleEl.value)
        {
            error += "Title "
            cnt++
        }
        if(!noteEl.value)
        {
            error += "Note field "
            cnt++
        }
        if(cnt == 1)
        {
            alert(error + "is empty")
        }
        else
        {
            alert(error + "are empty")
        }
    }
})

function render()   //prints array to html page
{
    let listContent = ""
    for (let i = 0; i < data.length; i++) //fetch values in listContent to print
    {
        listContent += `
        <div class="box">
            <div class="content">
                <strong>${data[i].title}</strong>
                <p>${data[i].note}</p> 
            </div>
            <button onclick="openDetail(${i})">View Details</button>
            <button onclick="del(${i})" class="trash"><i class="fa fa-trash"></i></button>
        </div>`
    }
    dataEl.innerHTML = listContent
}

function del(indx) //delete values from array
{
    data.splice(indx, 1)
    localStorage.setItem("note", JSON.stringify(data))
    render()
}

const modal = document.getElementById("modal")
const modalEl = document.getElementById("modal-content")
const btn = document.getElementById("btn")

function openDetail(indx) //opens modal
{
    modal.style.display = "block"
    modalEl.innerHTML = `
        <button onclick="closeDetail()" id="closeBtn">X</button>
        <strong>${data[indx].title}</strong>
        <p>${data[indx].note}</p>`

}
function closeDetail()    //close modal
{
    modal.style.display = "none"
}