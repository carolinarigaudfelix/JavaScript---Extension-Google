
const buttonEl = document.getElementById("input-btn")
const deleteEl = document.getElementById("delete-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const tabBtn = document.getElementById("tab-btn")

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

let myLeads = []

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

function render(leads){    
    let listItems = ""
    for(count=0; count < leads.length; count+=1){
        listItems += `
            <li> 
                <a  target ='_blank' href='${leads[count]}'>
                    ${leads[count]}
                </a> 
            </li>
        `
    }

    ulEl.innerHTML = listItems
}

buttonEl.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
   

})

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        console.log(tabs) 
        myLeads.push(tabs[0].url)  //   matriz de guias
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })

})

deleteEl.addEventListener("click", function() {
    localStorage.clear()
    myLeads = [];
    render(myLeads);

})


