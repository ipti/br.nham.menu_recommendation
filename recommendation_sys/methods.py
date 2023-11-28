"""--------------------------------------------------------------------------------------------
Implementação dos modelos responsáveis por gerar listas de substituições para cardápios
--------------------------------------------------------------------------------------------"""
import utils as utils
from sklearn.preprocessing import MinMaxScaler
from scipy.spatial.distance import pdist, squareform
import numpy as np
import pandas as pd
import json
import os

"""
Método utilizado para gerar a matriz de similaridade correspondente a um agrupamento
A matriz gerada está no formato: [ [ {food_i: x, food_j: y: score: z} ] ]

OBS.: Caso seja necessário, o código pode ser adaptado para reduzir o tamanho da matriz
levando apenas o id dos alimentos (em vez do objeto completo) e o score
"""
def generateSimilarityMatrix(config, group, foods):
    candidates = []
    for itemsGroup in group["items"]:
        food = utils.getFood(itemsGroup["code"], foods, group)
        if food == None:
            raise Exception("O alimento <" + str(itemsGroup["code"]) + "> não foi encontrado.")
        else:
            candidates.append(food)
    # Cria uma matriz apenas com as propriedades desejadas dos candidatos
    candidatesMatrix = []
    for candidate in candidates:
        candidatesMatrix.append([candidate["calorie"],candidate["protein"], candidate["lipid"], candidate["carbo"]])

    # Normaliza a matriz
    candidatesMatrixNorm = MinMaxScaler().fit_transform(candidatesMatrix)

    # Calcula a matriz de similaridade
    if (config["kernel"] == "linear"):
        kmodel = "cityblock"
    elif (config["kernel"] == "quadratico"):
        kmodel = "euclidean"
    elif (config["kernel"] == "cosseno"):
        kmodel = "cosine"
    else:
        kmodel = 'cityblock'
    similarityMatrix = squareform(
        pdist(candidatesMatrixNorm, 
            metric=kmodel, 
            w=np.array([
                config["weights"]["calorie"],
                config["weights"]["protein"],
                config["weights"]["lipid"],
                config["weights"]["carbo"]
            ])
        )
    )
    
    # Normaliza resultados para evitar distancias fora do intervalo [0,1]
    similarityMatrix = MinMaxScaler().fit_transform(similarityMatrix)
    
    # Leva os alimentos para dentro da matriz
    aux = []
    for i in range(len(candidates)):
        aux2 = []
        for j in range(len(candidates)):
            aux2.append({
                "food_i": candidates[i], 
                "food_j": candidates[j], 
                "score": similarityMatrix[i,j],
                "semaphore": utils.computeColors(config,[similarityMatrix[i][j]])[0]
            })
        aux.append(utils.sort(aux2, "score")[0:config["limit"]+1])

    return aux

"""
Obtém a lista de recomendações a partir das matrizes de similaridade geradas por agrupamento.
contexto == "food" refere-se a lista de substituições de um alimento, enquanto context == menu refere-se
a lista de substituições de um cardápio.

Obs.: Para o contexto de cardápio, o método retornará o resultado parcial com as recomendações para cada item
do cardápio. Para combinar as recomendações de itens e gerar cardápios alternativos completos, deve-se utilizar
na sequencia o método menuGenerator, informando o resultado parcial como parâmetro. 
"""
def getResults(context, similarityMatrix = None, refCode = None, menu = None, foods = None, grouping = None):
    if context == "menu":        
        # Obtém todos os alimentos do cardápio de entrada
        foodMenu = utils.getFoods(menu["items"], foods, replaceable = False, grouping = grouping)

        # Calcula as propriedades do cardápio de entrada
        properties = utils.calculateProperties(foodMenu)

        # Define variável que será utilizada para armazenar o resultado do método
        result = {
            "inputMenu": {
                "properties": {
                    "protein": properties["totalProtein"], 
                    "lipid": properties["totalLipid"], 
                    "carbo": properties["totalCarbo"],
                    "calorie": properties["totalCal"]
                },
                "foods": [food for food in foodMenu]
            },
            "itemReplacements": []
        }

        # Gera resultados para os itens do cardápio

        for item in menu["items"]:
            if item["replaceable"] == True:
                replacementFile = open(str(os.path.realpath(os.path.join(os.path.dirname(__file__), "output", "foods","replacements-food-"+item["code"]+".json"))) , encoding = 'utf-8')
                replacementList = json.load(replacementFile)
                
                # Inclui a porção de acordo com o cardápio
                for suggest in replacementList["replacements"]:
                    suggest["food"]["suggestedPortion"] = (item["gramsPortion"] * suggest["food"]["groupGramsPortion"]) /  replacementList["referenceFood"]["groupGramsPortion"]

                replacementFile.close()
                result["itemReplacements"].append({
                    "item": item["code"],
                    "replacements": replacementList["replacements"]
                })
            else:
                result["itemReplacements"].append({
                    "item": item["code"],
                    "replacements": []
                })

        return result
    else:
        return {}

"""
Método utilizado para gerar combinações com as substituições sugeridas para cada item de um
um cardápio de entrada.
"""
def menuGenerator(config, menu, partialResult, foods, grouping):

    from itertools import product

    # Obtém os candidatos
    candidates = []
    for candidate in partialResult["itemReplacements"]:
        if len(candidate["replacements"]) > 0:
            candidates.append(candidate["replacements"])

    # Obtém os alimentos não substituíveis
    nonReplaceableFood = utils.getNonReplaceableFood(menu["items"], foods, grouping)

    # Realiza a combinação entre os candidatos
    partialResult["menuReplacements"] = []
    for alternative in product(*candidates):
        alternative = list(alternative) + nonReplaceableFood
        # Calcula score do prato
        totalScore = 0
        for hit in alternative:
            totalScore += hit["score"]
        alternative = [x["food"] for x in alternative]
        # Calcula propriedades do prato
        properties = utils.calculateProperties(alternative)
        # Gera o resultado
        partialResult["menuReplacements"].append({"properties": properties, "menu": alternative, "totalScore": totalScore})
        partialResult["menuReplacements"] = utils.sort(partialResult["menuReplacements"], "totalScore")[0:config["limit"]]
    
    # Calcula o semáforo
    scoresVector = np.array([hit["totalScore"] for hit in partialResult["menuReplacements"]]).reshape([-1,1])
    scoresVector = MinMaxScaler().fit_transform(np.array(scoresVector)).tolist()
    scoresVector = [score[0] for score in scoresVector]
    colorsVector = utils.computeColors(config, scoresVector)
    for i in range(len(partialResult["menuReplacements"])):
        partialResult["menuReplacements"][i]["semaphore"] = colorsVector[i]
    
    return partialResult

"""
Método utilizado para gerar substituições para cada cardápio de acordo com cardápios pré-definidos
já existentes na lista de cardápios, considerando tipo de escola e horário
"""
def menuGenerator2(config, menuList, grouping, inventory, foods):
    
    # Calcular macro dos pratos
    mealMacros = utils.calculatePropertiesMeal(menuList, foods, grouping)
    
    # Remover pratos cujos itens não estão em estoque
    mealMacros = utils.inventorychecker(mealMacros, inventory)
    
    # Identifica se existe substitutos para viáveis para a lista de pratos
    if len(mealMacros) == 1 or len(mealMacros) == 0:
            raise Exception("Alimento substutitos no cardápio com indisponibilidade em estoque")
    # Transforma a lista de pratos em DataFrame
    mealMacros = pd.DataFrame(mealMacros)

    # Separa a comparação por tipo de escola e tipo de refeição
    result = []
    for (schooltype,mealtype),df in mealMacros.groupby(by=['schooltype', 'mealtype']):
        # Cria uma matriz com as propriedades desejadas dos candidatos
        mealList, candidatesMatrix, codes = utils.matrixMaker(df)
        
        # Normaliza a matriz
        candidatesMatrixNorm = MinMaxScaler().fit_transform(candidatesMatrix)
        
        # Calcula a matriz de similaridade
        if (config["kernel"] == "linemealsgroupar"):
            kmodel = "cityblock"
        elif (config["kernel"] == "quadratico"):
            kmodel = "euclidean"
        elif (config["kernel"] == "cosseno"):
            kmodel = "cosine"
        else:
            kmodel = 'cityblock'
        similarityMatrix = squareform(
            pdist(candidatesMatrixNorm, 
                metric=kmodel, 
                w=np.array([
                    config["weights"]["calorie"],
                    config["weights"]["protein"],
                    config["weights"]["lipid"],
                    config["weights"]["carbo"]
                ])
            )
        )
        similarityMatrix = MinMaxScaler().fit_transform(similarityMatrix)

        # Listagem e ordenação dos resultados
        for i in range(len(mealList)):
            # Enumera os pratos e ordena de forma crescente pelo score
            auxObj = list(enumerate(similarityMatrix[i]))
            auxObj = utils.sort(auxObj, 1)[1:config["limit"]+1]
            # Normalização dos scores
            # Função "computeLights" requer o recebimento de uma lista
            colors = utils.computeColors(config, similarityMatrix[i].tolist())
            suggestions = []
            for ii in auxObj:
                # Agrupa as listas de sugestões para os pratos 
                suggestions.append({
                    'description':mealList[ii[0]],
                    'code': codes[ii[0]],
                    'score':ii[1],
                    'semaphore':colors[ii[0]],
                    'properties': {
                        'protein': candidatesMatrix[ii[0]][1],
                        'calorie': candidatesMatrix[ii[0]][0],
                        'carbo': candidatesMatrix[ii[0]][3],
                        'lipid': candidatesMatrix[ii[0]][2]
                    }
                })
            # Agrupa as sugestões como função da Escola, tipo de refeição, prato e sugestões
            result.append({
                'inputMenu': {
                    'schooltype': schooltype,
                    'mealtype': mealtype,
                    'description':mealList[i],
                    'code': codes[i],
                    'properties': {
                        'protein': candidatesMatrix[i][1],
                        'calorie': candidatesMatrix[i][0],
                        'carbo': candidatesMatrix[i][3],
                        'lipid': candidatesMatrix[i][2]
                    }
                },
                'menuReplacements':suggestions
            })
    # print (result)
    return result

"""
Método utilizado para gerar substituições dado um cardápio de entrada.

Este método gera uma matriz de similaridade de acordo com uma métrica definida (por exemplo uma
norma envolvendo os macronutrientes e valor energético) e com isso ordena as sugestões de substituição
de acordo com um critério definido.

Os alimentos sugeridos levam em consideração a disponibilidade de estoque e alimentos pertencentes
a um mesmo agrupamento.
"""
def similarityMatrix(config, menu, grouping, inventory, foods):

    # teste = {}

    # Obtém os alimentos marcados como substituíveis do cardápio de entrada
    replaceableFoodMenu = utils.getFoods(menu["items"], foods, grouping, replaceable = True)
    # teste["replaceableFoodMenu"] = replaceableFoodMenu
    # print(replaceableFoodMenu)

    # Verifica disponibilidade de estoque
    for item in replaceableFoodMenu:
        if utils.findIndex(inventory, "foodCode", item["code"]) == -1:
            raise Exception("O alimento " + item["name"] + " não possui disponibilidade de estoque")

    # Obtém todos os alimentos do cardápio de entrada
    foodMenu = utils.getFoods(menu["items"], foods, grouping, replaceable = False)
    # teste["foodMenu"] = foodMenu

    # Obtém os agrupamentos dos alimentos substituíveis do cardápio de entrada
    groupingMenu = utils.getGroupingMenu(replaceableFoodMenu, grouping)
    if len(groupingMenu) != len(replaceableFoodMenu):
        raise Exception("Quantidade de agrupamentos divergente da quantidade de alimentos do cardápio")
    # teste["groupingMenu"] = groupingMenu

    # Calcula as propriedades do cardápio de entrada
    properties = utils.calculateProperties(foodMenu)
    # teste["properties"] = properties
    
    # Define variável que será utilizada para armazenar o resultado do método
    result = {
        "inputMenu": {
            "properties": {
                "protein": properties["totalProtein"], 
                "lipid": properties["totalLipid"], 
                "carbo": properties["totalCarbo"],
                "calorie": properties["totalCal"]
            },
            "foods": [food["code"] for food in foodMenu]
        },
        "itemReplacements": []
    }

    # Variável para armazenar a índice de itemReplacements
    auxItemReplacements = 0
    
    # Gera lista de candidatos por agrupamento
    # Loop sobre cada agrupamento oriundo dos alimentos substituíveis do cardápio
    for group in groupingMenu:
        candidates = []
        for itemsGroup in group["items"]:
            food = utils.getFood(itemsGroup["code"], foods, grouping)
            if food == None:
                raise Exception("O alimento <" + str(itemsGroup["code"]) + "> não foi encontrado")
            else:
                candidates.append(food)
        # teste["candidates"] = candidates

        # Cria uma matriz apenas com as propriedades desejadas dos candidatos
        candidatesMatrix = []
        for candidate in candidates:
            candidatesMatrix.append([candidate["calorie"],candidate["protein"], candidate["lipid"], candidate["carbo"]])
    
        # Normaliza a matriz
        candidatesMatrixNorm = MinMaxScaler().fit_transform(candidatesMatrix)

        # Calcula a matriz de similaridade
        if (config["kernel"] == "linear"):
            kmodel = "cityblock"
        elif (config["kernel"] == "quadratico"):
            kmodel = "euclidean"
        elif (config["kernel"] == "cosseno"):
            kmodel = "cosine"
        else:
            kmodel = 'cityblock'
        similarityMatrix = squareform(
            pdist(candidatesMatrixNorm, 
                metric=kmodel, 
                w=np.array([
                    config["weights"]["calorie"],
                    config["weights"]["protein"],
                    config["weights"]["lipid"],
                    config["weights"]["carbo"]
                ])
            )
        )

        # Tratamento do resultado
        indexResult = utils.findIndex(candidates, "code", group["referenceFood"]["code"])
        
        # Normaliza resultados para evitar distancias fora do intervalo [0,1]
        similarityMatrix = MinMaxScaler().fit_transform(similarityMatrix)

        if indexResult != -1:
            auxObj = []
            result["itemReplacements"].append({
                "item": group["referenceFood"],
                "replacements": []
            })
            for i in range(len(similarityMatrix[indexResult])):
                if candidates[i]["code"] != group["referenceFood"]["code"]:
                    auxObj.append({
                        "food": candidates[i], 
                        "score": similarityMatrix[indexResult][i],
                        "semaphore": utils.computeColors(config,[similarityMatrix[indexResult][i]])[0]
                    })
            result["itemReplacements"][auxItemReplacements]["replacements"] = utils.sort(auxObj, "score")[0:config["limit"]]
            auxItemReplacements = auxItemReplacements + 1
            # print (result)
        else:
            raise Exception("Alimento não encontrado na matriz de similaridade")
    
    # print(similarityMatrix)
    
    return result
