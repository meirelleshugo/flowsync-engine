# ✅ Checklist – Projeto FlowSync

## 📌 1. Estrutura Inicial do Projeto

- [x] Criar repositório no GitHub
- [x] Inicializar projeto em Deno
- [x] Definir estrutura de pastas (controllers, services, routes, models, middlewares, config, tests)
- [x] Configurar ambiente base de execução
- [x] Criar arquivo .env
- [x] Configurar leitura de variáveis de ambiente

## 🗄️ 2. Banco de Dados (MongoDB)

- [x] Criar instância MongoDB
- [x] Configurar conexão com MongoDB no projeto
- [x] Tornar conexão parametrizável via .env
- [x] Criar camada de conexão reutilizável
- [x] Testar conexão com banco

## 🧩 3. Entidade CRUD (Domínio)

- [x] Definir entidade escolhida (ex: Usuários, Produtos, Tarefas, Planetas etc.)
- [x] Criar model/schema da entidade
- [x] Definir validações da entidade
- [x] Implementar Create (POST)
- [x] Implementar Read (GET all)
- [x] Implementar Read by ID (GET by id)
- [x] Implementar Update (PUT/PATCH)
- [x] Implementar Delete (DELETE)
- [ ] Validar entradas em todas as operações

## 🔐 4. Autenticação e Autorização (JWT)

- [x] Implementar autenticação com JWT
- [x] Criar endpoint de login
- [x] Gerar token JWT
- [x] Implementar middleware de autenticação (Bearer Token)
- [x] Proteger pelo menos 1 endpoint com autenticação
- [ ] Configurar token no Postman como variável reutilizável
- [ ] (Opcional) Implementar refresh token

## ⚙️ 5. Regras de Negócio e Transações

- [x] Implementar pelo menos 1 operação atômica com session/transaction no MongoDB
- [x] Criar cenário com dependência entre entidades (ex: criação dupla ou encadeada)
- [x] Garantir rollback em caso de falha

## 🧪 6. Testes Automatizados

- [ ] Configurar Deno.test
- [ ] Criar testes para todos os controllers
- [ ] Testes de sucesso (status 200/201)
- [ ] Testes de erro de validação
- [ ] Testes de autenticação (token inválido/ausente)
- [ ] Testes de autorização (acesso negado)
- [ ] Garantir cobertura de 100% dos endpoints
- [ ] Seguir padrões da documentação AGX

## 📦 7. Pacotes Obrigatórios

- [x] Integrar responser (padronização de respostas)
- [x] Integrar request-check (validação de payloads)
- [x] Integrar morgan (logs de requisições)
- [x] Integrar isness (comparações de valores)
- [x] Integrar throwlhos (tratamento padrão de erros)

## 🧾 8. Logs e Tratamento de Erros

- [x] Configurar logs globais com morgan
- [x] Padronizar respostas com responser
- [x] Padronizar erros com throwlhos
- [x] Garantir logs de todas as requisições
- [ ] Garantir consistência de erros na API

## 📚 9. Documentação

- [ ] Criar README.md completo
- [ ] Incluir passo a passo de instalação
- [ ] Incluir instruções de execução do projeto
- [x] Listar todos os endpoints
- [x] Incluir exemplos de request/response
- [ ] Incluir instruções para rodar testes
- [ ] Publicar documentação da API (Postman / Swagger / outro)
- [ ] Garantir acesso público à documentação

## 🧠 10. Boas Práticas (AGX)

- [x] Seguir padrões de código AGX
- [x] Organização clara de camadas (controller/service/repository)
- [x] Separação de responsabilidades
- [x] Código limpo e reutilizável
- [x] Evitar lógica no controller

## 🚀 11. Entrega Final

- [x] Código versionado no GitHub
- [ ] Projeto funcionando 100%
- [ ] CRUD completo da entidade
- [x] Autenticação JWT funcional
- [ ] Transação implementada
- [ ] Testes completos passando
- [ ] Documentação publicada
- [ ] README completo
- [ ] Preparar apresentação de 30 minutos

## 🎤 12. Apresentação

- [ ] Demonstrar API funcionando
- [ ] Mostrar autenticação JWT
- [ ] Demonstrar CRUD completo
- [ ] Demonstrar endpoint protegido
- [ ] Demonstrar transação no MongoDB
- [ ] Executar testes ao vivo
- [ ] Explicar estrutura do código
- [ ] Explicar decisões técnicas
