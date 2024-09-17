# HoriBank  

## 🌟 Descrição
O **HoriBank** é uma aplicação bancária desenvolvida em Java com Spring Boot e MVC. Ele inclui uma camada de serviço robusta e recursos estáticos como HTML, CSS e JS. A comunicação com o servidor é feita através de requisições AJAX.

## 🚀 Como Usar
1. **Instale uma IDE**:
   - Certifique-se de ter uma IDE compatível com Java para rodar o projeto (como IntelliJ IDEA, Eclipse ou VSCODE).

2. **Configure o Ambiente**:
   - **Java 21**: Você precisará ter o Java 21 instalado em sua máquina.

3. **Configuração do Banco de Dados**:
   - Crie um arquivo `.env` na raiz do projeto com as credenciais do banco de dados. O arquivo `application.properties` conte as variaveis de ambientes que devem ser definidas nesse arquivo `.env`.

4. **Comandos do Maven**:
   - Antes de rodar o projeto executar o maven clean install, caso tenha o maven na sua máquina: `mvn clean install`. Se não  basta usar o mvnm que esta no projeto, executando o mesmo comando por `./mvmn clean install`.
     - Esse comando vai baixar as dependências do projeto.
       
   - Já para rodar o projeto caso tenha o maven na sua máquina basta: `mvn spring-boot:run`, se não usar o `./mvmn spring-boot:run`.
     - Já esse comando vai executar a aplicação web.
     

