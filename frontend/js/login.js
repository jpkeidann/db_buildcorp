const res = document.getElementById('res')
const but = document.getElementById('but')

but.addEventListener('click', (e)=>{
    e.preventDefault()

    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value

    const valores = {
        email: email,
        senha: senha
    }

    fetch('http://localhost:3000/login',{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(valores)
    })
    .then(res => res.json())
    .then(dados =>{
        if(dados.token){
            console.log(dados)
            localStorage.setItem('token',dados.token)
            localStorage.setItem('nome',dados.nome)
        }
        res.innerHTML = ''
        res.innerHTML += dados.message
    })
})