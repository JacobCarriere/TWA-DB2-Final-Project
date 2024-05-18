import os
import sys
import pymongo
import matplotlib.pyplot as plt
import pandas as pd

client = pymongo.MongoClient('mongodb+srv://joshlacroix:NByewvwMRgR8hM0C@movieappdata.dhsk4vr.mongodb.net/')
db = client['energy_consumption']
collection = db['country_energy']

stat = sys.argv[1]
yr = sys.argv[2]
yr_min = int(yr) - 10

top_countries = list(collection.find({"year": int(yr)}, {"country": 1, stat: 1}).sort(stat, -1).limit(5))

year_range = range(yr_min, int(yr))
data = []
for year in year_range:
    temp_data = []
    for country in top_countries:
        if stat == 'greenhouse_gas_emissions':
            temp_data.append(collection.find_one({"year": year, "country": country["country"]})["greenhouse_gas_emissions"])
        elif stat == 'population':
            temp_data.append(collection.find_one({"year": year, "country": country["country"]})["population"])
        elif stat == 'gdp':
            temp_data.append(collection.find_one({"year": year, "country": country["country"]})["gdp"])
    temp_data.append(collection.find_one({"year": year, "country": "Canada"})[stat])
    data.append(temp_data)

df = pd.DataFrame(data, index=year_range, columns=[country["country"] for country in top_countries] + ["Canada"])

ax = df.plot(kind='bar', figsize=(12, 6))
ax.set_xlabel('Year')
ax.set_ylabel(stat)
ax.set_title(f'{stat} Over Last 10 Years (Top 5 Countries in {yr} + Canada)')
ax.legend(loc='upper left')

save_directory = './image'
file_name = 'emissionperiod.png'
save_path = os.path.join(save_directory, file_name)
plt.savefig(save_path)


plt.show()
# python emissionperiod.py 'greenhouse_gas_emission/population/gdp' 'year'