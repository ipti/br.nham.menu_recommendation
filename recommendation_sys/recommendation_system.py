#!/usr/bin/env python
# -*- coding: utf-8 -*-
#--------------------------------------- Imports --------------------------------------#
from methods import menuGenerator, generateSimilarityMatrix, menuGenerator2, getResults
import utils
import json
import os

def runRecommendationSystem():

    # leitura do arquivo de config
    inputFile2 = open(str(os.path.realpath(os.path.join(os.path.dirname(__file__),  '/inputs/config.json'))), encoding = 'utf-8')
    inputConfig = json.load(inputFile2)
    inputFile2.close()

    # leitura do arquivo de foods
    inputFile3 = open(str(os.path.realpath(os.path.join(os.path.dirname(__file__),  '/inputs/foods.json'))), encoding = 'utf-8')
    inputFoods = json.load(inputFile3)
    inputFile3.close()


    # leitura do arquivo de grouping
    inputFile4 = open(str(os.path.realpath(os.path.join(os.path.dirname(__file__),  '/inputs/grouping.json'))), encoding = 'utf-8')
    inputGrouping = json.load(inputFile4)
    inputFile4.close()


    # leitura do arquivo de menuList
    inputFile5 = open(str(os.path.realpath(os.path.join(os.path.dirname(__file__),  '/inputs/menuList.json'))), encoding = 'utf-8')
    inputMenuList = json.load(inputFile5)
    inputFile5.close()

    # leitura do arquivo de inventory
    inputFile6 = open(str(os.path.realpath(os.path.join(os.path.dirname(__file__),  '/inputs/inventory.json'))), encoding = 'utf-8')
    inputInventory = json.load(inputFile6)
    inputFile6.close()



#   Principais variáveis
    config     = inputConfig["config"]    # Configurações básicas para execução do método
    menuList   = inputMenuList["menuList"]  # Cardápios de entrada
    grouping   = inputGrouping["grouping"]  # Agrupamento dos alimentos
    inventory  = inputInventory["inventory"] # Disponibilidade de estoque
    foods      = inputFoods["foods"]     # Cadastro de alimentos
    
   

    if config["method"] == "similarityMatrix":

        # Executa uma carga completa e armazena todos os resultados
        if config["executionMode"] == "exec-full-save-all":
            
            # Passo 0: Gerar e armazenar os resultados das recomendações para cada cardápio, de acordo com cardápios pré-definidos
            replacementPredefinedMenus = menuGenerator2(config, menuList, grouping, inventory, foods)   
            # Passo 1: Gerar e armazenar a matriz de similaridade para todos os agrupamentos
            for group in grouping:
                similarityMatrix = generateSimilarityMatrix(config, group, foods)
                outputFile = open("output/similarityMatrices/sm-group-" + str(group["id"]) + ".json", "w", encoding = 'utf-8')
                outputFile = json.dump({"sm-group-" + str(group["id"]): similarityMatrix}, outputFile, ensure_ascii = False)            
                # Passo 2: Ler a matriz de similaridade para computar e armazenar os resultados das recomendações para cada alimento do agrupamento
                for food in group["items"]:
                    replacementList = getResults("food", similarityMatrix, food["code"])
                    outputFile = open("output/foods/replacements-food-" + str(replacementList["referenceFood"]["code"]) + ".json", "w", encoding = 'utf-8')
                    outputFile = json.dump(replacementList, outputFile, ensure_ascii = False)
            # Passo 3: Ler a matriz de similaridade para computar e armazenar os resultados das recomendações para cada cardápio, de acordo com combinações de seus itens
            for menu in menuList:
                partialReplacementList = getResults("menu", menu = menu, foods = foods, grouping = grouping)
                replacementList = menuGenerator(config, menu, partialReplacementList, foods, grouping)
                # Inclui as substituições considerando os pratos pré-definidos
                predefinedRepacements = next((rep["menuReplacements"] for rep in replacementPredefinedMenus if rep["inputMenu"]["code"] == menu["code"]), None)
                replacementList['predefinedMenuReplacements'] = predefinedRepacements
                
                outputFile = open("output/menus/replacements-menu-" + str(menu["code"]) + ".json", "w", encoding = 'utf-8')
                outputFile = json.dump(replacementList, outputFile, ensure_ascii = False)
        else :
            print("Modo de execução inválido ou ainda não foi implementado.")
    elif config["method"] == "exhaustiveSearch":
        print("exhaustiveSearch")
    else:
        print("Método inválido.")
    return


def getResult(params):
    
    resultFile = None
    if (params["context"] == "food"):
        resultFile = open("output/foods/replacements-food-" + params["foodCode"] + ".json", encoding = 'utf-8')
    elif (params["context"] == "menu"):
        resultFile = open("output/menus/replacements-menu-" + params["menuCode"] + ".json", encoding = 'utf-8')
    resultData = json.load(resultFile)
    resultFile.close()

    # Calcula porção recomendada
    if (params["context"] == "food" and params["inputGramsPortion"] > 0):
        for suggest in resultData["replacements"]:
            suggest["food"]["suggestedPortion"] = (params["inputGramsPortion"] * suggest["food"]["groupGramsPortion"]) /  resultData["referenceFood"]["groupGramsPortion"]

    return resultData


# runRecommendationSystem()