import utils
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from scipy.spatial.distance import pdist, squareform
import numpy as np


"""
Método utilizado para gerar substituições para cada cardápio de acordo com cardápios pré-definidos
já existentes na lista de cardápios, considerando tipo de escola e horário
"""
def menuGenerator(config, menuList, grouping, inventory, foods):
    
    # Calcular macro dos pratos
    mealMacros = utils.calculatePropertiesMeal(menuList, foods, grouping)
    
    # Remover pratos cujos itens não estão em estoque
    mealMacros = utils.inventorychecker(mealMacros, inventory)

    # Identifica se existe substitutos viáveis para a lista de pratos
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


    return result