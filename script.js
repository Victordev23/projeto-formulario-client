//pesquisar cep
function pesquisaCep(valor) {
    const cep = valor.replace(/[^\d]/g, '');
    const validacep = /^[0-9]{8}$/;

    if (cep !== "" && validacep.test(cep)) {
        const script = document.createElement('script');
        document.getElementById('logradouro').disabled = true
        document.getElementById('bairro').disabled = true
        document.getElementById('cidade').disabled = true
        document.getElementById('uf').disabled = true

        // Sincroniza com o callback.
        script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meuCallback';

        // Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);
    } else {
        document.getElementById('logradouro').disabled = false
        document.getElementById('bairro').disabled = false
        document.getElementById('cidade').disabled = false
        document.getElementById('uf').disabled = false
        setError(4)
    }
}

function meuCallback(conteudo) {
    if (("erro" in conteudo)) {
        document.getElementById('logradouro').disabled = false
        document.getElementById('bairro').disabled = false
        document.getElementById('cidade').disabled = false
        document.getElementById('uf').disabled = false

        setError(4)
    } else {

        document.getElementById('logradouro').disabled = false
        document.getElementById('bairro').disabled = false
        document.getElementById('cidade').disabled = false
        document.getElementById('uf').disabled = false

        removeError(4)

        document.getElementById('logradouro').value = (conteudo.logradouro);
        document.getElementById('bairro').value = (conteudo.bairro);
        document.getElementById('cidade').value = (conteudo.localidade);
        document.getElementById('uf').value = (conteudo.uf);
    }
}

//imagem css
const img = document.getElementById('imgForm')
let input = document.getElementById('formFile')
let files = input.files;

input.addEventListener('change', () => {
    img.src = URL.createObjectURL(input.files[0])

})

//validações

const campos = document.querySelectorAll('.required')
const divError = document.querySelectorAll('.divError')

function setError(index) {
    campos[index].style.border = '1px solid #e63636';
    divError[index].style.display = 'block';
    errorOccurred = true;
}

function removeError(index) {
    campos[index].style.border = '';
    divError[index].style.display = 'none';
    errorOccurred = false;

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

//validação genero
function validarGenero() {
    const genero = document.getElementById('genero').value
    const errorGenero = document.getElementById('errorGenero')

    if (genero == '' || genero == null) {
        errorGenero.style.display = 'block'

        return false
    } else {
        errorGenero.style.display = 'none'

        return true
    }
}

//mask e validação data de nascimento 


let inputNascimento = document.getElementById('nascimento')

const dateInputMask = function dateInputMask(inputNascimento) {
    inputNascimento.addEventListener('keypress', function (e) {
        if (e.keyCode < 47 || e.keyCode > 57) {
            e.preventDefault();
        }

        const length = inputNascimento.value.length;

        if (length !== 1 && length !== 3) {
            if (e.keyCode == 47) {
                e.preventDefault();
            }
        }

        if (length === 2) {
            inputNascimento.value += '/';
        }

        if (length === 5) {
            inputNascimento.value += '/';
        }

        inputNascimento.addEventListener('blur', function () {
            inputSair();
        });
    });
};

function inputSair() {
    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear()
    const diaAtual = dataAtual.getDate()
    const mesAtual = dataAtual.getMonth()

    const input = document.getElementById('nascimento').value

    const data = input.split('/')

    if (data[0] > 31 || data[1] > 12 || data[2] > anoAtual || data[2] < 1907 || input.length !== 10) {

        setError(1)

        return false
    } else if (data[2] == anoAtual && data[1] > mesAtual + 1) {
        setError(1)

        return false
    } else if (data[2] == anoAtual && data[0] > diaAtual) {
        setError(1)

        return false
    } else {
        removeError(1)
    }
}
dateInputMask(inputNascimento);

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

//documento cpf/cnpj

const inputDoc = document.getElementById('documento')

inputDoc.addEventListener("blur", () => {
    let docId = document.getElementById('documento').value

    const docFormatado = docId.replace(/\D/g, '')

    const cpfRegex = /(\d)\1{10}/
    const cnpjRegex = /(\d)\1{13}/


    if (docFormatado.length === 11 && !cpfRegex.test(docFormatado)) {
        //calculo o primeiro digito
        let peso = 10
        let soma = 0

        for (let i = 0; i <= 8; i++) {
            let element = parseInt(docFormatado[i])

            element *= peso

            peso--

            soma += element
        }

        const digito1 = soma % 11 < 2 ? 0 : 11 - (soma % 11)

        //calculo segundo digito
        let peso2 = 11
        let soma2 = 0

        for (let i = 0; i <= 9; i++) {
            let element = parseInt(docFormatado[i])

            element *= peso2

            peso2--

            soma2 += element
        }

        const digito2 = soma2 % 11 < 2 ? 0 : 11 - (soma2 % 11)

        if (digito1 == docFormatado[9] && digito2 == docFormatado[10]) {

            removeError(3)

            const cpfMask = docFormatado.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4")
            inputDoc.value = cpfMask
        } else {
            setError(3)
        }
    } else if (docFormatado.length == 14 && !cnpjRegex.test(docFormatado)) {
        //cnpj
        let peso = 5
        let soma = 0

        for (let i = 0; i < 12; i++) {
            const element = docFormatado[i]

            soma += element * peso

            peso = peso - 1 == 1 ? 9 : peso - 1
        }

        const digito1 = soma % 11 < 2 ? 0 : 11 - (soma % 11)

        let peso2 = 6
        let soma2 = 0

        for (let i = 0; i < 13; i++) {
            const element = docFormatado[i];

            soma2 += element * peso2

            peso2 = peso2 - 1 == 1 ? 9 : peso2 - 1
        }

        const digito2 = soma2 % 11 < 2 ? 0 : 11 - (soma2 % 11)

        if (digito1 == docFormatado[12] && digito2 == docFormatado[13]) {
            removeError(3)

            const maskCnpj = docFormatado.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5")

            inputDoc.value = maskCnpj

        } else {
            setError(3)
        }
    } else {
        setError(3)
    }
})

//validação bairro
function validarBairro() {
    const bairro = document.getElementById('bairro').value
    const regexNumeros = /\d/
    const regexRepetidas = /(.)\1{2}/

    if (bairro == '' || regexNumeros.test(bairro) || regexRepetidas.test(bairro)) {
        setError(7)
    } else {
        removeError(7)
    }
}

//validar cidade
function validarCidade() {
    const cidade = document.getElementById('cidade').value
    const regexNumeros = /\d/
    const regexRepetidas = /(.)\1{2}/

    if (cidade == '' || regexNumeros.test(cidade) || regexRepetidas.test(cidade)) {
        setError(8)
    } else {
        removeError(8)
    }
}

//validação uf
function validarUf() {
    const uf = document.getElementById('uf').value
    const regexNumeros = /\d/
    const regexRepetidas = /(.)\1{2}/

    if (uf > 2 || uf == '' || regexNumeros.test(uf) || regexRepetidas.test(uf)) {
        setError(9)
    } else {
        removeError(9)
    }
}

//validação logradouro
function validarLog() {
    const log = document.getElementById('logradouro').value
    const regexNumeros = /\d/
    const regexRepetidas = /(.)\1{2}/

    if (log == '' || regexNumeros.test(log) || regexRepetidas.test(log)) {
        setError(5)
    } else {
        removeError(5)
    }
}

//validação numero
function validarNum() {
    const numero = document.getElementById('numero').value
    const regexNumeros = /^\d+$/

    if (numero == '' || !regexNumeros.test(numero)) {
        setError(6)
    } else {
        removeError(6)
    }
}


const form = document.getElementById('form')

form.addEventListener('submit', function (event) {

    const nome = document.getElementById('nome').value
    const log = document.getElementById('logradouro').value
    const bairro = document.getElementById('bairro').value
    const cidade = document.getElementById('cidade').value
    const uf = document.getElementById('uf').value
    const nascimento = document.getElementById('nascimento').value
    const email = document.getElementById('email').value
    const documento = document.getElementById('documento').value
    const cep = document.getElementById('cep').value
    const numero = document.getElementById('numero').value
    let imgFile = document.getElementById('errorImg')

    if (nome == '' || errorOccurred) {
        validarNome()

        event.preventDefault()
    } else if (nascimento == '' || errorOccurred) {
        setError(1)

        event.preventDefault()
    } else if (log == '' || errorOccurred) {
        validarLog()

        event.preventDefault()
    } else if (bairro == '' || errorOccurred) {
        validarBairro()

        event.preventDefault()
    } else if (cidade == '' || errorOccurred) {
        validarCidade()

        event.preventDefault()
    } else if (uf == '' || errorOccurred) {
        validarUf()

        event.preventDefault()
    } else if (email == '' || errorOccurred) {
        validarEmail()

        event.preventDefault()
    } else if (documento == '' || errorOccurred) {
        setError(3)

        event.preventDefault()
    } else if (cep == '' || errorOccurred) {
        setError(4)

        event.preventDefault()
    } else if (numero == '' || errorOccurred) {
        validarNum()

        event.preventDefault()
    } else if (document.getElementById("formFile").files.length == 0) {
        imgFile.style.display = 'block'

        event.preventDefault()
    }
});