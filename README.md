# Netlify Link : https://terribly-tiny-tales.netlify.app/

Libraries Used : 
1. chart :  ^0.1.2
2. chart.js :  ^4.3.0
3. papaparse : ^5.4.1

# Component : [Graph.jsx]

* function fetchAndParseData(): This is a function which first call the API to get the data from it and store the data in the text variable , after that we will                              define the proerties  for the text i.e, converting them to lowecase, replacing the whitespaces, spliting all the words on the basis of                            space,and then storing all the words in the form of an array by using filter method . 

# A variable wordCounts is defined which is reducing the words by using the .reduce methos it iterates through all the words and stores it in the counts array through which we will find the number of occurance of the words.

# The variable topWords is defined which is sorting the word occurance array in decending order then slicing it to top 20 words.

# After reteriving the top 20 most occurance words we are converting it into CSV format by suing the Papa.unparse method.

# SetHistofranData : Now we will sepeate the 2D array into two different array as labels and data , which will be store in the histogram data.

# function handleExportClick() : First it will create a Blob of the csv data then it will create an object url for the csv data and thit will be downloaded in the                                    download folder when the function will be evoked.


#  The jsx part :-
# First of a a button is created in which an onclick calls the fetchAndParseData method to fetch the data into the front-end.
# After clicking the submit button the histogram will be shown with top 20 most occuring words .
# Also an another button is created in which under the onclick method handleExport is called through which we are giving the rights to download the csv file         through this button.





