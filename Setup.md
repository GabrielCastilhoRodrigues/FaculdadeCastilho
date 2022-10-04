Pré-Requisitos:
	* IDE a escolha para abrir o código-fonte.
	* SQL Server instalado na máquina.

Recomendações:
	* Utilizar de IDE o Visual Studio Code.

1 - Realize o clone do projeto para o repositório a sua escolha.

2 - Abra o CMD do windows no modo administrador e execute 'sqllocaldb version' para conferir as versões disponiveis para a máquina.

3 - Execute no CMD 'sqllocaldb "LocalDb" <numero_maior_versao>'.

4 - Acesse o servidor criado através do Management Studio da Microsoft e crie a databe Faculdade -> "CREATE DATABASE Faculdade"

5 - Execute no Management o comando USE Faculdade.

6 - Dentro do projeto, é possível localizar a pasta "/FaculdadeCastilho/Doc_Db/". Dentro dela, está o arquivo de scripts das tabelas, basta abrir e Executa-lo.

7 - Abra o terminal e acesse "/FaculdadeCastilho/BackEnd" e execute "dotnet ef migrations add criacaoDB".

8 - Ainda no caminho "/FaculdadeCastilho/BackEnd", execute "dotnet ef database update". Apenas para garantir que o DB está atualizado com os dados do projeto

7 - Abra o terminal e acesse "/FaculdadeCastilho/BackEnd" e execute "dotnet run".

8 - Apresentando que é permitido acessar ao localhost:7185, abra um novo terminal e acesse "/FaculdadeCastilho/FrontEnd", depois execute "ng serve".

9 - Agora será capaz de acessar http://localhost:4200

Considerações
	* Tive algumas pontualidades pessoais durante o andamento do projeto, então acabou faltando apenas o mapeamento nos locais que possuem relação de tabelas, como Disciplina, onde o campo referente ao professor apresenta sua chave ao invés do nome.
	* Qualquer pontualidade, favor informar através do email gabrielrcastilho@outlook.com, ou telefone (19)982373705.