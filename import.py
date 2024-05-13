import pandas as pd
import pymongo
import sys

arguements = sys.argv
 
def import_energy_data(owid_df, country_df):
    country_df = pd.read_csv('countries.csv')
    owid_df = pd.read_csv('owid-energy-data_A_S.csv')
    filtered_df = owid_df[owid_df['country'].isin(country_df['country'])]

    client = pymongo.MongoClient('mongodb+srv://joshlacroix:NByewvwMRgR8hM0C@movieappdata.dhsk4vr.mongodb.net/')

    db = client['energy_consumption']
    collection = db['country_energy']

    data = filtered_df.to_dict('records')

    collection.insert_many(data)

import_energy_data(arguements[1], arguements[2])