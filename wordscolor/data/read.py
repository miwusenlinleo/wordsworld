import pickle
import numpy
words, embeddings = pickle.load(open('./polyglot-en.pkl', 'rb'))
print("Emebddings shape is {}".format(embeddings.shape))


embeddings_file = open('embeddings','w')

embeddings_file.write("[[")
for y in range(0,64):
   embeddings_file.write("{0},".format(embeddings[0][y]))
embeddings_file.write("{0},".format(embeddings[0][3]))
embeddings_file.write("]")

for x in range(1,10000):
   embeddings_file.write(",[")
   for y in range(0,64):
      embeddings_file.write("{0},".format(embeddings[x][y]))
   embeddings_file.write("{0}".format(embeddings[x][3]))
   embeddings_file.write("]")

embeddings_file.write("]")



word_file = open('words','w')
for x in range(0,10000):
	word_file.write("{0} ".format(words[x].encode('utf-8').strip()))