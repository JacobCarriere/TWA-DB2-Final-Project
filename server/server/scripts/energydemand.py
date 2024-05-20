import os
import sys
import pymongo
import matplotlib.pyplot as plt
import pandas as pd

client = pymongo.MongoClient('mongodb+srv://joshlacroix:NByewvwMRgR8hM0C@movieappdata.dhsk4vr.mongodb.net/')
db = client['energy_consumption']
collection = db['country_energy']

country = sys.argv[1]
yr = sys.argv[2]
yr_min = int(yr) - 10

electricity_demand = []
electricity_generation = []
year_range = range(yr_min, int(yr))

for year in year_range:
    data = collection.find_one({'country': country, 'year': year})
    if data:
        electricity_demand.append(data['electricity_demand'])
        electricity_generation.append(data['electricity_generation'])
    else:
        electricity_demand.append(None)
        electricity_generation.append(None)

df = pd.DataFrame({
    'year': year_range,
    'electricity_demand': electricity_demand,
    'electricity_generation': electricity_generation
})

plt.figure(figsize=(10, 6))
plt.plot(df['year'], df['electricity_demand'], label='Electricity Demand')
plt.plot(df['year'], df['electricity_generation'], label='Electricity Generation')

plt.title(f'Energy Supply and Demand Over Time in {country}')
plt.xlabel('Year')
plt.xticks(df['year'])
plt.ylabel('Energy')
plt.legend()

save_directory = './image'
file_name = 'energydemand.png'
save_path = os.path.join(save_directory, file_name)
plt.savefig(save_path)
