let expenses = JSON.parse(localStorage.getItem('expenses'))||[]

let TotalAmount = 1000
document.querySelector('.p1Tag').textContent = TotalAmount

let ItemSum = parseFloat(localStorage.getItem('UsedAmount')) || 0;
document.querySelector('.p2Tag').textContent = ItemSum

document.querySelector(".adding").addEventListener('submit',function(e){
    e.preventDefault()
    const item = document.querySelector('#addInput').value
    const price = document.querySelector('#cost').value

    if((item!=='')&&(price!=''))
    {
        if(parseFloat(price)>0)
        {
            ItemSum=ItemSum+parseFloat(price)
            
            if(ItemSum<=TotalAmount)
            {
                document.querySelector('.p2Tag').textContent = ItemSum
                localStorage.setItem('UsedAmount',ItemSum)
                expenses.push({
                title : item,
                cost : price
                }) 
            } 
        }
    }
    localStorage.setItem('expenses',JSON.stringify(expenses))
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
    document.querySelector('.matter').innerHTML = ''
    if(expenses.length==0)
    {
        document.querySelector('.matter').append('No Items Are Added')
    }

    localStorage.setItem('expenses',JSON.stringify(expenses))

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
        divTag.style.borderRadius = '5px'

        const deleteExpenses = document.createElement('button')
        deleteExpenses.className = 'deleteExpenses'
        deleteExpenses.textContent = 'DELETE'
        deleteExpenses.style.backgroundColor = 'rgb(8, 8, 126)'
        deleteExpenses.style.color = 'white'
        
        const edit = document.createElement('button')
        edit.className = 'edit'
        edit.textContent = 'EDIT'
        edit.style.backgroundColor = 'white'

        if(index%2==1)
        {
            divTag.style.backgroundColor = 'rgb(8, 2, 55)'
            firstDiv.style.color = 'white'
            secondDiv.style.color = 'white'
            deleteExpenses.style.color = 'black'
            edit.style.color = 'white'
            deleteExpenses.style.backgroundColor = 'white'
            edit.style.backgroundColor = 'rgb(8, 8, 126)'
        }

        subDiv.appendChild(firstDiv)
        subDiv.appendChild(secondDiv)
        divTag.appendChild(subDiv)
        divTag.appendChild(deleteExpenses)
        divTag.appendChild(edit)
        document.querySelector(".expenses").appendChild(divTag)

        deleteExpenses.addEventListener('click',function(){
            let costValue = parseFloat(expenses[index].cost)
            ItemSum = ItemSum-costValue
            expenses.splice(index,1);
            localStorage.setItem('UsedAmount',ItemSum)
            localStorage.setItem('expenses',JSON.stringify(expenses))
            document.querySelector('.p2Tag').textContent = ItemSum;
            renderExpenses(expenses,filters)
        })

       edit.addEventListener('click',function(e){

            const editPage = document.querySelector('.editPage')
            editPage.innerHTML = ''
            editPage.className = 'editPage'
            
            editPage.style.marginTop = '120px'
        
            const editInput = document.createElement('input')
            editInput.className = 'editInput'
            editInput.placeholder = 'NewCost'
            editInput.style.borderRadius = '5px'

            const saveButton = document.createElement('button')
            saveButton.className = 'saveButton'
            saveButton.textContent = 'Save'
            saveButton.style.borderRadius = '5px'
        
            editPage.appendChild(editInput)
            editPage.appendChild(saveButton)

            saveButton.addEventListener('click',function(e){
                const newCost = parseFloat(editInput.value);
                const previousValue = parseFloat(expenses[index].cost)

                if(!isNaN(newCost)&& newCost>0)
                {
                    ItemSum = ItemSum-previousValue
                    ItemSum+=newCost
                    if(ItemSum<=TotalAmount)
                    {
                        expenses[index].cost = newCost
                        localStorage.setItem('expenses',JSON.stringify(expenses))
                        localStorage.setItem('UsedItem',ItemSum)
                        document.querySelector('.p2Tag').textContent = ItemSum;
                        editPage.innerHTML = ''
                        document.querySelector('.main').style.marginLeft = '250px'
                        renderExpenses(expenses,filters)
                    }
                }
            })
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
    localStorage.setItem('expenses',JSON.stringify(expenses))
    renderExpenses(expenses,filters)
})



 
