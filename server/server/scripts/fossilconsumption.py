import matplotlib.pyplot as plt
import pymongo
import sys
import os

arguments = sys.argv

def plot_fossil_energy_consumption(country_name):
    client = pymongo.MongoClient('mongodb+srv://joshlacroix:NByewvwMRgR8hM0C@movieappdata.dhsk4vr.mongodb.net/')
    db = client['energy_consumption']
    collection = db['country_energy']

    country_data = collection.find({'country': country_name}).sort([('country', 1), ('year', 1)])

    years = []
    oil_consumption = []
    gas_consumption = []
    coal_consumption = []

    for data in country_data:
        years.append(data['year'])
        oil_consumption.append(data['oil_consumption'])
        gas_consumption.append(data['gas_consumption'])
        coal_consumption.append(data['coal_consumption'])

    plt.figure(figsize=(8, 6))
    plt.plot(years, oil_consumption, label='Oil Consumption')
    plt.plot(years, gas_consumption, label='Gas Consumption')
    plt.plot(years, coal_consumption, label='Coal Consumption')

    plt.xlabel('Year')
    plt.ylabel('Fossil Energy Consumption (terawatt-hours)')
    plt.title(f'Fossil Energy Consumption in {country_name}')
    plt.legend()
 
    save_directory = './image'
    file_name = 'fossilconsumption.png'
    save_path = os.path.join(save_directory, file_name)
    plt.savefig(save_path)
    
    # plt.show()

plot_fossil_energy_consumption(arguments[1])
# python fossilconsumption.py 'country_name'