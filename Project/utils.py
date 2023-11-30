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
        totalProtein = totalLipid = totalCarbo = totalCal = 0
        for item in meal['items']:
            group = getGrouping(item['code'], grouping).copy()
            ingredient = getFood(item['code'], foods, group).copy()
            totalProtein += float(ingredient["protein"])
            totalLipid += float(ingredient["lipid"])
            totalCarbo += float(ingredient["carbo"])
            totalCal += float(ingredient["calorie"])

        mealmacro.append({'schooltype': meal['schooltype'],
                          'code': meal['code'],
                          'mealtype': meal['mealtype'],
                          'description': meal['description'],
                          'ingredients' : [ingredient['code'] for ingredient in meal['items']],
                          'macros':[{"totalProtein": totalProtein,
                                     "totalLipid": totalLipid,
                                     "totalCarbo": totalCarbo,
                                     "totalCal": totalCal}]})
        
    return mealmacro

# Podar os itens com o inventário
# Remove pratos sem itens em estoque
def inventorychecker(meals, inventory):
    acc=0
    inventoryList = [inv['foodCode'] for inv in inventory]
    for meal in meals:
        if set(meal['ingredients']).issubset(inventoryList):
            acc += 1
        else:
            meals.pop(acc)
            acc += 1
    return meals


# Método utilizado para ordenar a lista de substituições
def sort(array, key):
    return sorted(array, key=lambda x: x[key], reverse=False)


# Compara os itens e retorna o farol indicado, similarityList devem ser do tipo list
def computeColors(config, similarityList):
    dim = len(config['colors'])
    if dim == 0:
        colorsVector = ['NA']*len(similarityList)
    elif dim == 1:
        colorsVector = [config['colors'][0]]*len(similarityList)
    elif dim == 2:
        med = 1/dim
        colorsVector = [config['colors'][0] if score<=med else
                        config['colors'][1] for score in similarityList]
    elif dim == 3:
        lower = 1/dim
        upper = lower*2
        colorsVector = [config['colors'][0] if score<=lower else
                        config['colors'][1] if score<upper else
                        config['colors'][2] for score in similarityList]
    elif dim == 4:
        lower = 1/dim
        med = lower*2
        upper = lower*3
        colorsVector = [config['colors'][0] if score<=lower else
                        config['colors'][1] if score<=med else
                        config['colors'][2] if score<upper else
                        config['colors'][3] for score in similarityList]
    else:
        lower = 1/dim
        med = lower*2
        medupper = lower*3
        upper = lower*4
        colorsVector = [config['colors'][0] if score<=lower else
                        config['colors'][1] if score<=med else
                        config['colors'][2] if score<=medupper else
                        config['colors'][3] if score<upper else 
                        config['colors'][4] for score in similarityList]
    return colorsVector

# Cria a matrix para comparação e lista de pratos respectivos
def matrixMaker(mealsgroup):
    candidatesMatrix = []
    meals = []
    codes = []
    for meal,data in mealsgroup.groupby(by=['description']):
            macros = data['macros'].values[0][0]
            meals.append(meal)
            codes.append(data['code'].values[0])
            candidatesMatrix.append([macros["totalCal"],macros["totalProtein"], macros["totalLipid"], macros["totalCarbo"]])
    
    return meals, candidatesMatrix, codes