# Homologação de modelo de substituição de alimentos NHAM
[![python-version-3.8](https://badgen.net/badge/Python/3.8?color=green)](https://www.python.org/downloads/release/python-380/)
![angular](https://img.shields.io/badge/Angular-DD0031?logo=angular&logoColor=white)



O modelo definido nesse repositório se refere ao mapeamento de alimentos que possam ser substituidos na composição de refeições de um cardápio escolar.

## Requisitos recomendados:

- Docker [(Como instalar?)](https://docs.docker.com/engine/install/)

## Executando projeto

Execute o seguinte comando na pasta raiz desse projeto:

```
docker compose up -d
```

## Sobre o modelo

O sistema de recodemanção indica candidatos a ingredientes substitutos os itens que apresentem menor distância vetorial entre os pares. Entende-se que o vetor é composto por 4 campos representados pela calorias, proteínas, lipídios e carboidratos.

Atualmente o modelo possui como métricas de distância linear, quadrática e cosseno, sendo a linear o modelo padrão adotado. A métrica linear considera a como distância o somatório das diferenças normalizadas entre os macronutrientes. Adicionalmente existe um sistema de pesos que poderam cada macronutriente na hora de calcular as distâncias vetoriais. Atualmente o pesos são [3, 2, 1, 1], sendo 3 o peso para calorias, 2 para proteínas e 1 para os demais. Tais valores forçam a métrica de distância em priorizar por itens que possuam a relação distância*peso menor.


  ## ⚠️!!! AVISO !!!⚠️

Essa aplicação ainda não está pronta para produção as seguintes atividades ainda precisam ser realizadas:

- [ ] Conexão com base de dados do TAG (MySql) no lugar dos arquivos JSON;
- [ ] Criação de endpoints para consultar modelo
- [ ] Atualização automática do modelo de agrupamento
