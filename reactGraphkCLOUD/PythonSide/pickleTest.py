# Step 1
import pickle
 
# Step 2
with open('config.dictionary', 'rb') as config_dictionary_file:
 
    # Step 3
    config_dictionary = pickle.load(config_dictionary_file)
 
    # After config_dictionary is read from file
    print(config_dictionary)
