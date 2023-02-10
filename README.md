# Teste Técnico Copybase

Construir uma aplicação para listagem e busca de pokemons. É uma aplicação simples, onde iremos buscar por um determinado pokémon, pelo seu nome, para termos acesso às suas propriedades requisitadas através da [PokeAPI v2](https://pokeapi.co/docs/v2).

<br />

Ideia de interface é uma tela com apenas um campo de busca no centro da tela, que ao ser acionado com o nome do pokémon, irá submeter esta pesquisa para a [PokeAPI](https://pokeapi.co/), retornando as informações do pokémon buscado e de suas evoluções (Evolution Chains).

<br />

Para cada um dos pokémons listados (o pesquisado e suas evoluções), gostaríamos de ver seu nome e sua imagem.

<br />

Quando clicarmos em um pokémon listado, queremos listar suas principais características (hp, attack, defense, special attack, special defense e speed). Obviamente quanto mais informações você mostrar melhor (organizadas, usando princípios básicos de UI/UX).

<p align="center"><a href="https://teste-copybase.vercel.app/">Acesse aqui</a></p>

# O que foi feito?

- Evoluções do Pokemon: Usei um algoritmo semelhante a iteração sobre uma Lista Ligada. Funciona bem para a grande maioria dos Pokemons, mas se o Pokemon (no caso o Oddish) tenha sub-evoluções acaba não funcionando corretamente.
- Componentização.
- Separação de regras-de-negócio e serviços externos.
- Trabalhado com roteamento dinâmico e estático usando [Vue Router](https://router.vuejs.org/).
- Estilos criados com [Scss](https://sass-lang.com/install) usando o padrão [BEM](https://getbem.com/introduction/).
- HTML semântico e com atributos de acessiblidade.
- Para organizar o histórico de versionamento usei o Conventional Commits.

# Rodando o projeto

Você precisa ter o [Node](https://nodejs.org/en/), o [Git](https://git-scm.com/) e algum gerenciador de pacotes([NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/) || [Yarn](https://classic.yarnpkg.com/lang/en/docs/install)) instalados em sua máquina.

```bash
1. Clone o repositório:
$ git clone https://github.com/gabriellima2/teste-copybase.git

2. Acesse a pasta e instale as dependências via terminal:
$ yarn || npm i

3. Inicie a aplicação em modo de desenvolvimento:
$ yarn dev || npm run dev

O servidor será aberto em localhost:5173
```

<p align="center">Projeto feito com 💙 por <a href="https://www.linkedin.com/in/gabriel-lima-860612236">Gabriel Lima</a></p>
