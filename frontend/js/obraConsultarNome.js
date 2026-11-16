const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const res = document.getElementById('res')
const but = document.getElementById('but')

but.addEventListener('click', (e)=>{
    e.preventDefault()

    const nome = document.getElementById('nome').value

    fetch(`http://localhost:3000/obra/nome/${nome}`,{
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
            'Authorization': token
        }
    })
    .then(res => res.json())
    .then(dados =>{
        if(dados.message){
            res.innerHTML = ''
            res.innerHTML += dados.message
            return
        }
        res.innerHTML = ''
        res.innerHTML += `<table> ${criarThead() + criarTbody(dados)}</table>`
    })
})


function criarTbody(dados){
    let corpo = '<tbody>'
    dados.forEach(el => {
        corpo += '<tr>'
        corpo += `<td>${el.codObra}</td>`
        corpo += `<td>${el.nome}</td>`
        corpo += `<td>${el.CNPJ}</td>`
        corpo += '</tr>'
    })
    corpo += '</tbody>'
    return corpo
}

function criarThead(){
    return ` 
    <thead>
        <tr>
        <th>codObra</th>
        <th>Nome</th>
        <th>CNPJ</th>
        </tr>
    </thead>`
}