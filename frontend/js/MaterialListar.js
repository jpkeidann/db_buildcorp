const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const res = document.getElementById('res')
const but = document.getElementById('but')

but.addEventListener('click', (e)=>{
    e.preventDefault()

    fetch(`http://localhost:3000/materiais`,{
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
        corpo += `<td>${el.codMaterial}</td>`
        corpo += `<td>${el.idObra}</td>`
        corpo += `<td>${el.descricao}</td>`
        corpo += `<td>${el.categoria}</td>`
        corpo += `<td>${el.quantidade}</td>`
        corpo += `<td>${el.codLote}</td>`
        corpo += '</tr>'
    })
    corpo += '</tbody>'
    return corpo
}

function criarThead(){
    return ` 
    <thead>
        <tr>
        <th>codMaterial</th>
        <th>idObra</th>
        <th>descricao</th>
        <th>categoria</th>
        <th>quantidade</th>
        <th>codLote</th>
        </tr>
    </thead>`
}