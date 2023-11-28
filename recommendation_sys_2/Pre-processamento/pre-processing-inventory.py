import os
import json




'''
['3', '7', '8', '13', '35', '40', '42', '43', '61', '69', '78', '82', '89', '92', '98', '107', '108', '110', '113', '114', '115', '122', '126', '130', '144', '147', '157', '158', '164', '182', '208', '225', '235', '251', '261', '272', '319', '352', '353', '397', '409', '458', '459', '489', '491', '492', '511', '523', '562', '355', '370', '401', '4', '533', '590', '580', '48', '49', '15', '18', '598']


'''
# caminho_arquivo_desorganizado = 'recommendation_sys/taco_data_test.json'

# with open(caminho_arquivo_desorganizado, 'r', encoding='utf-8') as file:
#     dados_desorganizados = json.load(file)

# novo_dados = []

# for idx, item in enumerate(dados_desorganizados, start=1):
#     novo_item = {
#         "id": idx,
#         "name": item["name"],
#         "foodCode": item["code"],
#         "amount": 10
#     }
#     novo_dados.append(novo_item)
# with open('recommendation_sys/inventory.json', 'w', encoding='utf-8') as json_file:
#     json.dump(novo_dados, json_file, indent=2, ensure_ascii=False)



import json

dados = ["3", "7", "8", "13", "35", "40", "42", "43", "61", "69", "78", "82", "89", "92", "98", "107", "108", "110", "113", "114", "115", "122", "126", "130", "144", "147", "157", "158", "164", "182", "208", "225", "235", "251", "261", "272", "319", "352", "353", "397", "409", "458", "459", "489", "491", "492", "511", "523", "562", "355", "370", "401", "4", "533", "590", "580", "48", "49", "15", "18", "598"]

caminho_arquivo_desorganizado = 'recommendation_sys/taco_data_test.json'

with open(caminho_arquivo_desorganizado, 'r', encoding='utf-8') as file:
    dados_desorganizados = json.load(file)

# Filtra os dados com base na lista 'dados'
dados_filtrados = [item for item in dados_desorganizados if item['code'] in dados]

novo_dados = []
print('dados_desorganizados', len(dados_desorganizados))
# Mostra os dados filtrados
for idx, item in enumerate(dados_filtrados, start=1):
    novo_item = {
        "id": idx,
        "name": item["name"],
        "foodCode": item["code"],
        "amount": 10
    }
    novo_dados.append(novo_item)

with open('recommendation_sys/inventory.json', 'w', encoding='utf-8') as json_file:
    json.dump(novo_dados, json_file, indent=2, ensure_ascii=False)
