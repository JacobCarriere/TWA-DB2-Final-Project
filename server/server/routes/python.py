# python.py

import matplotlib.pyplot as plt
import pandas as pd

# Function to generate the image
def generate_image(param1):
    # Read the CSV file
    df = pd.read_csv('sample_guides.planets.csv')

    # Sort the DF by 'orderFromSun'
    df.sort_values(by='orderFromSun', inplace=True)

    # Plot the data
    plt.figure(figsize=(10, 6))
    plt.plot(df['name'], df[param1], color='blue', label=param1)
    plt.xlabel('Planet')
    plt.ylabel(param1)
    plt.title(f'{param1} of Planets')
    plt.xticks(rotation=45)
    plt.legend()
    plt.grid(True)
    plt.tight_layout()
    
    # Save the plot as an image
    plt.savefig('generated_image.png')  # Save the result as PNG
    plt.close()  # Close the plot to avoid displaying it

# Call the function with the parameter provided by the command line
if __name__ == "__main__":
    import sys
    param1 = sys.argv[1]
    generate_image(param1)
