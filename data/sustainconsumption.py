import matplotlib.pyplot as plt
import pymongo
import sys

def plot_sustainable_energy_consumption(year, country_names):
    client = pymongo.MongoClient('mongodb+srv://joshlacroix:NByewvwMRgR8hM0C@movieappdata.dhsk4vr.mongodb.net/')
    db = client['energy_consumption']
    collection = db['country_energy']

    energies = ['biofuel_consumption', 'solar_consumption', 'hydro_consumption', 'wind_consumption']

    num_countries = len(country_names)
    if num_countries == 0:
        print("Please provide at least one country.")
        return
    
    fig, axs = plt.subplots(nrows=2, ncols=2, figsize=(12, 6))
    plt.suptitle(f"Sustainable Energy Consumption Distribution by Country ({year})", fontsize=20)

    countries_with_data = []
    for country_name in country_names:
        country_data = collection.find_one({'country': country_name, 'year': int(year)})
        if country_data:
            consumptions = [country_data[energy] for energy in energies if energy in country_data]
            if len(consumptions) == 4:
                countries_with_data.append((country_name, consumptions))

    axs[0,0].axis('off')
    axs[-1,0].axis('off')
    axs[0,-1].axis('off')
    axs[-1,-1].axis('off')
    
    for i, (country_name, consumptions) in enumerate(countries_with_data):
       
        ax = axs[i//2, i%2]
        ax.pie(consumptions, autopct='%1.1f%%')
        ax.set_title(f'{country_name}')

    fig.legend(energies, loc='upper right')
    plt.tight_layout()
    plt.show()

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print('Usage: python sustainconsumption.py [year] [country1] [country2]...')
        sys.exit(1)

    year = sys.argv[1]
    country_names = sys.argv[2:]
    country_names = country_names[:4]

    plot_sustainable_energy_consumption(year, country_names)