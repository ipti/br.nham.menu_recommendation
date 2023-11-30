# Bibliotecas necessárias para rodar os dados de entrada
import json
import os
from pymongo import MongoClient
from flask import Flask, request, jsonify
from methods import menuGenerator



menuList_data=[]
inventory_data=[]



# Recuperar dados da entrada da API
def data_API(menu_data, invent_data):
    inventory_data.append(invent_data)
    menuList_data.append(menu_data)
    runRecommendationSystem()

# Iniciando o programa
def runRecommendationSystem():
    # ------------------ Acessando os dados do banco ---------------------

    # Credenciais do banco
    client = MongoClient('localhost', 27017, username='admin', password='root')
    db = client["NHAN_TAG"]

    # Coleções
    config_collection = db["config"]
    food_collection = db["food"]
    grouping_collection = db["grouping"]

    # Consulta para ler os dados
    config_data = config_collection.find_one()
    food_data = food_collection.find_one()
    grouping_data = grouping_collection.find_one()

    client.close() # final da conexão com o banco de dados


#   Principais variáveis
    config     = config_data['config']   # Configurações básicas para execução do método
    foods      = food_data['foods']     # Cadastro de alimentos
    grouping   = grouping_data['grouping']  # Agrupamento dos alimentos
    # inventory  = inventory_data # Disponibilidade de estoque


    for menu in menuList_data:
        menuList = menu
    
    for invent in inventory_data:
        inventory = invent


    # print('---------------------------------------------------------------------------------')
    # print(config)
    # print('---------------------------------------------------------------------------------')
    # print(foods)
    # print('---------------------------------------------------------------------------------')
    # print(grouping)
    # print('---------------------------------------------------------------------------------')
    # print(menuList)
    # print('---------------------------------------------------------------------------------')
    # print(inventory)


    if config["method"] == "similarityMatrix":
        # Executa uma carga completa e armazena todos os resultados
        if config["executionMode"] == "exec-full-save-all":       
            # Passo 0: Gerar e armazenar os resultados das recomendações para cada cardápio, de acordo com cardápios pré-definidos
            replacementPredefinedMenus = menuGenerator(config, menuList, grouping, inventory, foods)
            
    return


'''
    # leitura do arquivo de menuList
    inputFile5 = open('Project/menuList.json', encoding = 'utf-8')
    inputMenuList = json.load(inputFile5)
    inputFile5.close()


    # leitura do arquivo de menuList
    inputFile6 = open('Project/inventory.json', encoding = 'utf-8')
    inputInventory = json.load(inputFile6)
    inputFile6.close()


#   Principais variáveis
    config     = config_data['config']   # Configurações básicas para execução do método
    foods      = food_data['foods']     # Cadastro de alimentos
    grouping   = grouping_data['grouping']  # Agrupamento dos alimentos
    menuList   = inputMenuList['menuList'] # Cardápios de entrada
    inventory  = inputInventory['inventory'] # Disponibilidade de estoque
'''