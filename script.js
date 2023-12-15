//Buscar cep
function meuCallback(conteudo) {
    if (("erro" in conteudo)) {
        setError(4);  // Usando o índice correto para o campo CEP
    } else {
        removeError(4);
        document.getElementById('logradouro').value = (conteudo.logradouro);
        document.getElementById('bairro').value = (conteudo.bairro);
        document.getElementById('cidade').value = (conteudo.localidade);
        document.getElementById('uf').value = (conteudo.uf);
    }
}

function pesquisaCep(valor) {
    const cep = valor.replace(/[^\d]/g, '');
    const validacep = /^[0-9]{8}$/;

    if (cep !== "" && validacep.test(cep)) {
        const script = document.createElement('script');

        // Sincroniza com o callback.
        script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meuCallback';

        // Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);
    } else {
        setError(4);  // Usando o índice correto para o campo CEP
    }
}


//imagem css
const img = document.getElementById('imgForm')
let input = document.getElementById('formFile')

input.addEventListener('change', () => {
    img.src = URL.createObjectURL(input.files[0])
})

//validações

const form = document.getElementById('form')
const campos = document.querySelectorAll('.required')
const divError = document.querySelectorAll('.divError')

function setError(index) {
    campos[index].style.border = '1px solid #e63636';
    divError[index].style.display = 'block';
}

function removeError(index) {
    campos[index].style.border = '';
    divError[index].style.display = 'none';
}

//validação nome
function validarNome() {
    const nome = document.getElementById('nome').value
    const regexNumeros = /\d/
    const regexRepetidas = /(.)\1{2}/

    if (nome.length < 2 || nome == '' || regexNumeros.test(nome) || regexRepetidas.test(nome)) {
        setError(0)
    } else {
        removeError(0)
    }
}

//validação email
function validarEmail() {
    const email = document.getElementById('email').value
    const regexEmail = /\S+@\S+\.\S+/

    if (!regexEmail.test(email) || email == '' || email.length < 10) {
        setError(2)
    } else {
        removeError(2)
    }
}

//validação cep
const meuInput = document.getElementById('cep');

meuInput.addEventListener('input', handleZipCode);

function handleZipCode(event) {
    let input = event.target;
    input.value = zipCodeMask(input.value);
}

function zipCodeMask(value) {
    if (!value) return "";
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
    return value;
}
