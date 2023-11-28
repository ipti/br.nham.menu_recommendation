"""--------------------------------------------------------------------------------------------
Implementação de métodos auxiliares
--------------------------------------------------------------------------------------------"""

#--------------------------------------- Imports --------------------------------------#
from copy import deepcopy

#--------------------------------------- Function -------------------------------------#
# Retorna o agrupamento de um alimento
def getGrouping(foodCode, grouping):
    result = None
    for group in grouping:
        result = next((group for x in group["items"] if x["code"] == foodCode), None)
        if result != None:
            break
    return result


# Adapta as porções de 100g (TACO/POF) para novos valores, modifica as propriedades no campo foods
# Não funcional caso haja ingredientres com mais de um agrupamento
def portionModifier(food, group):
    food = deepcopy(food)
    foodGroup = next( (foodGroup for foodGroup in group['items'] if foodGroup['code'] == food['code']), None )
    portion = foodGroup['gramsPortion']
    food['protein'] = food['protein']*(portion/100)
    food['lipid'] = food['lipid']*(portion/100)
    food['carbo'] = food['carbo']*(portion/100)
    food['calorie'] = food['calorie']*(portion/100) 
    food['groupGramsPortion'] = portion
    return food

# Retorna os dados de um alimento cadastrado
def getFood(foodCode, foods, group = None):
    ingredient = deepcopy(next((food for food in foods if food["code"] == foodCode), None))
    if ingredient == None:
                raise Exception("O alimento <" + str(foodCode) + "> não foi encontrado! \nRevise o item na Tabela de Alimentos.")
    if group != None:
        ingredient = portionModifier(ingredient, group)
    return ingredient


# Calcula as propriedades de um conjunto de alimentos
def calculatePropertiesMeal(items, foods, grouping):
    mealmacro = []
    for meal in items:
        print(meal['items'])
        # totalProtein = totalLipid = totalCarbo = totalCal = 0
        # for item in meal['items']:
    #         group = getGrouping(item['code'], grouping).copy()
    #         ingredient = getFood(item['code'], foods, group).copy()
    #         totalProtein += float(ingredient["protein"])
    #         totalLipid += float(ingredient["lipid"])
    #         totalCarbo += float(ingredient["carbo"])
    #         totalCal += float(ingredient["calorie"])
    #     mealmacro.append({'schooltype': meal['schooltype'],
    #                       'code': meal['code'],
    #                       'mealtype': meal['mealtype'],
    #                       'description': meal['description'],
    #                       'ingredients' : [ingredient['code'] for ingredient in meal['items']],
    #                       'macros':[{"totalProtein": totalProtein,
    #                                  "totalLipid": totalLipid,
    #                                  "totalCarbo": totalCarbo,
    #                                  "totalCal": totalCal}]})
    # return mealmacro
