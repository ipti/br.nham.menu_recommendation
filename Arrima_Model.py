import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
from matplotlib import pyplot as plt

# Carregue seus dados temporais
# Exemplo fictício:
# data = pd.read_csv('dados_TAG.csv')




model = ARIMA(data, order=(p, d, q)) 

model_fit = model.fit()

predictions = model_fit.predict(start=..., end=..., typ='levels')

plt.plot(data)
plt.plot(predictions, color='red')
plt.show()
