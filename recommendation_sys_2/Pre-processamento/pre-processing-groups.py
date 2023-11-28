# import json



# # numero_aleatorio = random.uniform(10, 193.3)


# # caminho_arquivo_desorganizado = 'recommendation_sys/taco_data_test.json'
# # caminho_arquivo_organizado = 'recommendation_sys/grupos.json'


# # # Leitura dos dados desorganizados do arquivo JSON
# # with open(caminho_arquivo_desorganizado, 'r', encoding='utf-8') as file:
# #     dados_desorganizados = json.load(file)



# # # Add random que vai aleatóriamente acessar os valores de gramas por porção de um determinado alimento


# # # Organização dos dados por grupo
# # dados_organizados = {}
# # id_counter = 1 
# # for item in dados_desorganizados:
# #     grupo = item['grupo']
# #     if grupo not in dados_organizados:
# #         dados_organizados[grupo] = {
# #             'id': id_counter,
# #             'name': grupo,
# #             'items': []
# #         }
# #         id_counter += 1

#     dados_organizados[grupo]['items'].append({
#         'code': item['code'],
#         'name': item['name'],
#         "homemadePortion": "1, Unidade",
#         if(dados_organizados[grupos]=='')
#         'gramsPortion': random.uniform(10, 120)
#     })




# # import json



# # # Maior e menor valor de um determinado alimento:
# # caminho_arquivo_desorganizado = 'recommendation_sys/grouping.json'

# # with open(caminho_arquivo_desorganizado, 'r', encoding='utf-8') as file:
# #     data = json.load(file)



# # max_grams = float('-inf')
# # min_grams = float('inf')

# # for group in data["grouping"]:
# #     for item in group["items"]:
# #         grams_portion = item["gramsPortion"]
# #         max_grams = max(max_grams, grams_portion)
# #         min_grams = min(min_grams, grams_portion)

# # print("Maior valor de gramsPortion:", max_grams)
# # print("Menor valor de gramsPortion:", min_grams)


# # buscar maiores e menores valores de gramPortion por grupo:
# # Maior e menor valor de um determinado alimento:
# caminho_arquivo_desorganizado = 'recommendation_sys/grouping.json'

# with open(caminho_arquivo_desorganizado, 'r', encoding='utf-8') as file:
#     data = json.load(file)
# max_grams = float('-inf')
# min_grams = float('inf')

# grupos_maiores_valores = []

# # Itere sobre os grupos
# for group in data["grouping"]:
#     max_grams_grupo = float('-inf')

#     for item in group["items"]:
#         grams_portion = item["gramsPortion"]
#         max_grams_grupo = max(max_grams_grupo, grams_portion)
#         max_grams = max(max_grams, grams_portion)
#         min_grams = min(min_grams, grams_portion)

#     if max_grams_grupo == max_grams:
#         grupos_maiores_valores.append(group["name"])

# # Imprima os resultados
# print("Maior valor de gramsPortion:", max_grams)
# print("Menor valor de gramsPortion:", min_grams)
# print("Grupos com os maiores valores de gramsPortion:", grupos_maiores_valores)



# adicionar os 

import json
import random

caminho_arquivo_desorganizado = 'recommendation_sys/taco_data_test.json'
caminho_arquivo_organizado = 'recommendation_sys/grupos.json'

# Leitura dos dados desorganizados do arquivo JSON
with open(caminho_arquivo_desorganizado, 'r', encoding='utf-8') as file:
    dados_desorganizados = json.load(file)

# Organização dos dados por grupo
dados_organizados = {}
id_counter = 1

# Defina os grupos específicos para os quais você quer gerar valores aleatórios
grupos_especificos = ['BEBIDAS', 'CARBO1', 'CARBO2', 'FRUTAS']

for item in dados_desorganizados:
    grupo = item['grupo']
    
    if grupo not in dados_organizados:
        dados_organizados[grupo] = {
            'id': id_counter,
            'name': grupo,
            'items': []
        }
        id_counter += 1

    # Adiciona random apenas para os grupos especificados
    if grupo in grupos_especificos:
        dados_organizados[grupo]['items'].append({
            'code': item['code'],
            'name': item['name'],
            'homemadePortion': "1, Unidade",
            'gramsPortion': round(random.uniform(5, 193.3), 2)
        })
    else:
        # Para os grupos não especificados, atribui o valor original de gramsPortion
        dados_organizados[grupo]['items'].append({
            'code': item['code'],
            'name': item['name'],
            'homemadePortion': "1, Unidade",
            'gramsPortion': round(random.uniform(5, 70), 2)
        })

# Salva os dados organizados em um novo arquivo JSON
with open(caminho_arquivo_organizado, 'w', encoding='utf-8') as file:
    json.dump(list(dados_organizados.values()), file, ensure_ascii=False, indent=2)
