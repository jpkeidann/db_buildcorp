const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const res = document.getElementById('res')
const but = document.getElementById('but')

but.addEventListener('click', (e)=>{
    e.preventDefault()

    const codObra = document.getElementById('codObra').value
    const nome = document.getElementById('nome').value
    const CNPJ = document.getElementById('CNPJ').value

    const valores = {
        nome: nome,
        CNPJ: CNPJ
    }

    fetch(`http://localhost:3000/obra/${codObra}`,{
        method: 'PUT',
        headers: {
            'Content-Type':'application/json',
            'Authorization': token
        },
        body: JSON.stringify(valores)
    })
    .then(res => res.json())
    .then(dados =>{
        res.innerHTML = ''
        res.innerHTML += dados.message
    })
})