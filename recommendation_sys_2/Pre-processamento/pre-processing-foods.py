import json
import os

# Abrir o arquivo JSON
# with open('recommendation_sys/taco_data_test.json', 'r', encoding='utf-8') as file:
#     data = json.load(file)

# Para a base foods
# for item in data:
#     del item["copper_mg"]
#     del item["zinc_mg"]
#     del item["retinol_mcg"]
#     del item["re_mcg"]
#     del item["rae_mcg"]
#     del item["thiamine_mg"]
#     del item["riboflavin_mg"]
#     del item["pyridoxine_mg"]
#     del item["niacin_mg"]
#     del item["vitaminC_mg"]
#     del item["saturated_g"]
#     del item["monounsaturated_g"]
#     del item["polyunsaturated_g"]
#     del item["12:0_g"]
#     del item["14:0_g"]
#     del item["16:0_g"]
#     del item["18:0_g"]
#     del item["20:0_g"]
#     del item["22:0_g"]
#     del item["24:0_g"]
#     del item["14:1_g"]
#     del item["16:1_g"]
#     del item["18:1_g"]
#     del item["20:1_g"]
#     del item["18:2 n-6_g"]
#     del item["18:3 n-3_g"]
#     del item["20:4_g"]
#     del item["20:5_g"]
#     del item["22:5_g"]
#     del item["22:6_g"]
#     del item["18:1t_g"]
#     del item["18:2t_g"]
#     del item["tryptophan_g"]
#     del item["threonine_g"]
#     del item["isoleucine_g"]
#     del item["leucine_g"]
#     del item["lysine_g"]
#     del item["methionine_g"]
#     del item["cystine_g"]
#     del item["phenylalanine_g"]
#     del item["tyrosine_g"]
#     del item["valine_g"]
#     del item["arginine_g"]
#     del item["histidine_g"]
#     del item["alanine_g"]
#     del item["aspartic_g"]
#     del item["glutamic_g"]
#     del item["glycine_g"]
#     del item["proline_g"]
#     del item["serine_g"]




'''****************************************************************************************'''

# # Para a base grouping
# for item in data:
#     del item["magnesium_mg"]
#     del item["manganese_mg"]
#     del item["fiber_g"]
#     del item["ashes_g"]
#     del item["humidity_percents"]

#     del item["calorie"]
#     del item["protein"]
#     del item["lipid"]
#     del item["carbo"]


#     del item["energy_kj"]
#     del item["calcium_mg"]
#     del item["phosphorus_mg"]
#     del item["iron_mg"]
#     del item["sodium_mg"]
#     del item["potassium_mg"]
#     del item["cholesterol_mg"]
#     del item["id"]


'''****************************************************************************************'''
# # ----------Add outros atributos como id na primeira posição e as gramas (100g)------------
#     item["code"] = str(item["code"] )
#     item["gramsPortion"] = 100
#     item["id"] = new_id
#     new_id += 1
#     new_dict = {"id": item["id"]}
#     for key, value in item.items():
#         if key != "id":
#             new_dict[key] = value
#     new_data.append(new_dict)
# data = new_data


# with open('recommendation_sys/taco_data_test.json', 'w', encoding='utf-8') as file:
#     json.dump(data, file, indent=2, ensure_ascii=False)


# # -------------Função para verificar se há dados faltantes em um objeto JSON-------------

# def conta_dados_faltantes(objeto):
#     contador = 0
#     for valor in objeto.values():
#         if valor is None:
#             contador += 1
#     return contador

# contador_total = 0

# for item in data:
#     contador_total += conta_dados_faltantes(item)

# print(f"Quantidade total de dados faltantes: {contador_total}")
