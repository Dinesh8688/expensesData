let expenses = JSON.parse(localStorage.getItem('expenses')) || []

document.querySelector(".adding").addEventListener('submit',function(e){
    e.preventDefault()
    const item = document.querySelector('#addInput').value
    const price = document.querySelector('#cost').value
    if((item!='')&&(price!=''))
    {
        expenses.push({
            title : item,
            cost : price
        })
        localStorage.setItem('expenses',JSON.stringify(expenses))
    }
    
    console.log(expenses)
    renderExpenses(expenses,filters)
    document.querySelector('#addInput').value=''
    document.querySelector('#cost').value=''
})

const filters = {
    searchText : ''
}

const renderExpenses = function(expenses,filters)
{
    const filteredExpenses = expenses.filter(function(e){
        const searchTex = e.title.toLowerCase().includes(filters.searchText.toLowerCase())
        return searchTex
    })

    document.querySelector(".expenses").innerHTML = '';

    filteredExpenses.forEach((e,index)=>{

        const firstDiv = document.createElement('div')
        firstDiv.className = 'firstDiv'
        firstDiv.textContent = e.title

        const secondDiv = document.createElement('div')
        secondDiv.className = 'secondDiv'
        secondDiv.textContent = e.cost

        const subDiv = document.createElement('div')
        subDiv.className = 'subDiv'
        subDiv.style.display = 'flex'

        const divTag = document.createElement('div')
        divTag.className = 'divTag'
        divTag.style.display = 'flex'

        const deleteExpenses = document.createElement('button')
        deleteExpenses.className = 'deleteExpenses'
        deleteExpenses.textContent = 'DELETE'

        const edit = document.createElement('button')
        edit.className = 'edit'
        edit.textContent = 'EDIT'

        subDiv.appendChild(firstDiv)
        subDiv.appendChild(secondDiv)
        divTag.appendChild(subDiv)
        divTag.appendChild(deleteExpenses)
        divTag.appendChild(edit)
        document.querySelector(".expenses").appendChild(divTag)

        deleteExpenses.addEventListener('click',function(){
            expenses.splice(index,1);
            localStorage.setItem('expenses',JSON.stringify(expenses))
            renderExpenses(expenses,filters)
        })

        edit.addEventListener('click',function(){
            
        })
    })
}
renderExpenses(expenses,filters)

document.querySelector(".searching").addEventListener('input',function(e){
    filters.searchText = e.target.value
    renderExpenses(expenses,filters)
})

document.getElementById("clear1").addEventListener('click',()=>{
    expenses.length = 0
    document.querySelector('.expenses').innerHTML = ''
})

    

 