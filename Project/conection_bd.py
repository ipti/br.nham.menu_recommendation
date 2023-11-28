from pymongo import MongoClient
import json
import os

# Credenciais do banco
client = MongoClient('localhost', 27017, username='admin', password='root')
db = client["NHAN_TAG"]


def gravarJson(): # Ler os dados do json
    inputFile1 = open('recommendation_sys/inputs/config.json', encoding='utf-8')
    config_data = json.load(inputFile1)
    inputFile1.close()

    inputFile2 = open('recommendation_sys/inputs/foods.json', encoding='utf-8')
    food_data = json.load(inputFile2)
    inputFile2.close()

    inputFile3 = open('recommendation_sys/inputs/grouping.json', encoding='utf-8')
    grouping_data = json.load(inputFile3)
    inputFile3.close()

    # Coleções
    config_collection = db["config"]
    food_collection = db["food"]
    grouping_collection = db["grouping"]

    # Inserir dados nas coleções
    result_config = config_collection.insert_one(config_data)
    result_food = food_collection.insert_one(food_data)
    result_grouping = grouping_collection.insert_one(grouping_data)

    print(f"ID do documento inserido em config: {result_config.inserted_id}")
    print(f"ID do documento inserido em food: {result_food.inserted_id}")
    print(f"ID do documento inserido em grouping: {result_grouping.inserted_id}")

    client.close()

# def salvarInput(inventary):
#     print(inventary)
    # Coleções
    # inventary_collection = db["inventary"]
    # menu_collection = db["menu"]

    # # Inserir dados nas coleções
    # result_inventary = inventary_collection.insert_one(inventary)
    # result_menus = menu_collection.insert_one(menus)

    # print(f"ID do documento inserido em inventary: {result_inventary.inserted_id}")
    # print(f"ID do documento inserido em menus: {result_menus.inserted_id}")

    # client.close()
    


# gravarJson()

