document.getElementById("expenselist").addEventListener("click", xyz);
var key = 0;
async function xyz() {
    let amount = document.getElementById("amount").value;
    let desc = document.getElementById("description").value;
    let category = document.getElementById("particulars").value;

    // let li = document.createElement('li');
    // li.className = 'itemsinlist';
    // li.appendChild(document.createTextNode(amount));
    // li.appendChild(document.createTextNode(desc));
    // li.appendChild(document.createTextNode(category));

    const obj = { amount, desc, category };

    await axios.post("http://localhost:3000/add-expense",obj)
    .then((response)=>{
      showNewUserOnScreen(response.data.newExpense);
    })
    .catch((err)=>{
      console.log(err);
    })

  // let dltBtn = document.createElement('button');
  // dltBtn.className = 'dltBtn';
  // dltBtn.appendChild(document.createTextNode('Delete'));
  // li.appendChild(dltBtn);

  // let editBtn = document.createElement('button');
  // editBtn.className = 'editBtn';
  // editBtn.appendChild(document.createTextNode('Edit'));
  // li.appendChild(editBtn);

  // let ul = document.querySelector('ul.this');
  // ul.appendChild(li);

  // let myobj = {amount: amount, desc:desc, category: category};
  // localStorage.setItem(key++, JSON.stringify(myobj));
}

function showNewUserOnScreen(item) {
  const parentNode = document.getElementById('items');
  const childHTML = `<li id=${item.id}> ${item.amount} - ${item.desc} - ${item.category}
         <button onclick=deleteUser('${item.id}')> Delete</button>
        <button onclick=editUserDetails('${item.id}')>Edit</button>
                         </li>`;

  parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

window.addEventListener("DOMContentLoaded", async() => {
  await axios
    .get("http://localhost:3000/get-expenses")
    .then((response) => {
      for (let i = 0; i < response.data.expenses.length; i++) {
        showNewUserOnScreen(response.data.expenses[i]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  })

async function deleteUser(id) {
  await axios.delete(`http://localhost:3000/delete-expense/${id}`)
  .then((response)=>{
   removeExpenseFromScreen(id);
  })
  .catch((err)=>{
    console.log(err);
  })
}

function removeExpenseFromScreen(id){
  const parentNode = document.getElementById('items');
  const childNodeToBeDeleted = document.getElementById(id); 

  parentNode.removeChild(childNodeToBeDeleted);
}

function editUserDetails(id) {
  axios.get(`http://localhost:3000/get-expense/${id}`)
  .then((response)=> {
    const expense = response.data.expense;
    document.getElementById("amount").value = expense.amount;
    document.getElementById("description").value = expense.desc;
    deleteUser(id);
  })
  .catch((err)=> {
    console.log(err);
  })
}

