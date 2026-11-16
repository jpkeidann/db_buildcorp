const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const res = document.getElementById('res')
const but = document.getElementById('but')

but.addEventListener('click', (e)=>{
    e.preventDefault()

    const codObra = document.getElementById('codObra').value

    fetch(`http://localhost:3000/obra/${codObra}`,{
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json',
            'Authorization': token
        }
    })
    .then(res => res.json())
    .then(dados =>{
        res.innerHTML = ''
        res.innerHTML += dados.message
    })
})
