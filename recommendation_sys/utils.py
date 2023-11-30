"""--------------------------------------------------------------------------------------------
Implementação de métodos auxiliares
--------------------------------------------------------------------------------------------"""

#--------------------------------------- Imports --------------------------------------#
from copy import deepcopy

#--------------------------------------- Function -------------------------------------#


# Retorna um array com os dados dos alimentos a partir de um array dos códigos
def getFoods(items, foods, replaceable = False, grouping = None):
    foodMenu = []
    for foodCode in items:
        if (replaceable == True and foodCode["replaceable"] == True) or replaceable == False:
            if grouping != None:
                group = getGrouping(foodCode["code"], grouping)
                food = getFood(foodCode["code"], foods, group).copy()
            else:
                food = getFood(foodCode["code"], foods).copy()
            food["inputGramsPortion"] = foodCode["gramsPortion"]
            if food == None:
                raise Exception("O alimento <" + str(foodCode["code"]) + "> não foi encontrado")
            else:
                foodMenu.append(food)
    return foodMenu

# Retorna um array com os alimentos não substituíveis do cardápio de entrada
def getNonReplaceableFood(items, foods, grouping = None):
    result = []
    for hit in items:
        if (hit["replaceable"] == False):
            if grouping != None:
                group = getGrouping(hit["code"], grouping)
                food = getFood(hit["code"], foods, group).copy()
                food["suggestedPortion"] = hit["gramsPortion"]
            if food == None:
                raise Exception("O alimento <" + str(hit["code"]) + "> não foi encontrado")
            else:
                result.append({"food": food, "score": 0})
    return result


# Retorna um array com os agrupamentos que contém os alimentos do cardápio de entrada
# Premissa: Agrupamentos não possuem alimentos repetidos e um alimento está contido em 
# apenas 1 agrupamento 
def getGroupingMenu(items, grouping):
    groupingMenu = []
    for foodCode in items:
        group = getGrouping(foodCode["code"], grouping).copy()
        group["referenceFood"] = foodCode
        if group == None:
            raise Exception("O alimento <" + str(foodCode["code"]) + "> não possui agrupamento")
        else:
            groupingMenu.append(group)
    return groupingMenu
    
# Calcula as propriedades de um conjunto de alimentos
def calculateProperties(items):
    totalProtein = totalLipid = totalCarbo = totalCal = 0
    for food in items:
        totalProtein += float(food["protein"])
        totalLipid += float(food["lipid"])
        totalCarbo += float(food["carbo"])
        totalCal += float(food["calorie"])
    return {"totalProtein": totalProtein, "totalLipid": totalLipid, "totalCarbo": totalCarbo, "totalCal": totalCal}


# Retorna o índice do array da primeira ocorrência do elemento e -1 caso não exista
def findIndex(array, key, value):
    result = -1
    cont = 0
    for i in array:
        if i[key] == value:
            result = cont
            break
        cont = cont + 1 
    return result




# Adapta as porções de 100g (TACO/POF) para novos valores, modifica as propriedades no campo foods
# Não funcional caso haja ingredientres com mais de um agrupamento
# def portionModifier(foods, grouping):
#     foodsCopy = deepcopy(foods)
#     for food in foodsCopy:
#         portion = next((elemts['gramsPortion'] for group in grouping for elemts in group['items'] if elemts['code'] == food['code']), None)
#         if portion == None:
#             raise Exception("Ingrediente não encontrado! COD do alimento: {}".format(food['code']))
#         food['protein'] = food['protein']*(portion/100)
#         food['lipid'] = food['lipid']*(portion/100)
#         food['carbo'] = food['carbo']*(portion/100)
#         food['calorie'] = food['calorie']*(portion/100) 
#     return foodsCopy

