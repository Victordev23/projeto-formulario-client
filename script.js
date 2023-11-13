function meuCallback(conteudo) {
    if (!("erro" in conteudo)) {
        document.getElementById('logradouro').value = (conteudo.logradouro);
        document.getElementById('bairro').value = (conteudo.bairro);
        document.getElementById('cidade').value = (conteudo.localidade);
        document.getElementById('uf').value = (conteudo.uf);
    }
    else {
        alert("CEP não encontrado.");
    }
}

function pesquisaCep(valor) {
    const cep = valor.replace(/[^\d]/g, '');
        const validacep = /^[0-9]{8}$/;

        if (cep !== "" && validacep.test(cep) ) {
            document.getElementById('logradouro').value = "...";
            document.getElementById('bairro').value = "...";
            document.getElementById('cidade').value = "...";
            document.getElementById('uf').value = "...";

            const script = document.createElement('script');

            // Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meuCallback';

            // Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);
        } else {
            alert("CEP inválido.");
        }
};


function validarForm() {
    const nome = document.getElementById('nome').value;
    const log = document.getElementById('logradouro').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const uf = document.getElementById('uf').value;

    // Expressão regular para verificar se há pelo menos um número em uma string
    const regexNumeros = /\d/;

    if (regexNumeros.test(log) || regexNumeros.test(bairro) || regexNumeros.test(cidade) || regexNumeros.test(uf) || regexNumeros.test(nome)) {
        alert('Insira números somente nos campos "Cep", "Número" e "Complemento".');
        return false;
    } else {
        return true;
    }
}