# Instruções para executar o projeto

##### Sobre a API:
É uma api que tem apenas uma rota com a finalidade de validar um boleto e retornar as informações de valor, data de vencimento e linha digitável do mesmo. Pra essa rota é passado apenas a linha digitável como parâmetro.

##### Siga esses passos para executar o projeto:

1. Clone esse repositório.
2. Execute o comando yarn / npm install para instalar as dependências.
3. Execute yarn dev para executar o projeto.
4. Use as collections do insomnia e do postman que estão localizadas na raiz do projeto, para testar as requisições, ou então entre no endereço http://localhost:8080/boleto/:linha_digitável pelo navegador.
5. Deverá ser usado o endpoint acima, passando o parametro da linha digitável como params, substituindo ':linha_digitável' pela linha digitável do boleto.

##### Problemas encontrados:

- Dificuldade para calcular o dígito verificador de boletos de convênio. Foi usado a base de cálculo da documentação mas o resultado desse cáculo nunca é igual ao dígito verificador. Obs: Erro acontece apenas em boletos de convênio que contém 48 dígitos, o outro tipo de boleto funciona perfeitamente.
