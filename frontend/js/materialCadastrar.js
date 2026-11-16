const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const res = document.getElementById('res')
const but = document.getElementById('but')

but.addEventListener('click', (e)=>{
    e.preventDefault()

    const idObra = document.getElementById('idObra').value
    const descricao = document.getElementById('descricao').value
    const categoria = document.getElementById('categoria').value
    const quantidade = document.getElementById('quantidade').value
    const codLote = document.getElementById('codLote').value

    const valores = {
        idObra: idObra,
        descricao: descricao,
        categoria: categoria,
        quantidade: quantidade,
        codLote: codLote
    }

    fetch(`http://localhost:3000/material`,{
        method: 'POST',
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