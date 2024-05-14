import matplotlib.pyplot as plt
import pymongo
import sys

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

    # Save the plot before displaying it
    plt.savefig(f'{country_name}_fossil_energy_consumption.png')

    # Show the plot
    plt.show()

arguments = sys.argv

plot_fossil_energy_consumption(arguments[1])
