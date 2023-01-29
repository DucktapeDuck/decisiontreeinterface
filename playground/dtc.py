from sklearn.datasets import load_iris
# from sklearn.model_selection import cross_val_score
from sklearn.tree import DecisionTreeClassifier
import time

clf = DecisionTreeClassifier()
iris = load_iris()

before = time.time()
clf = clf.fit(iris.data, iris.target)
after = time.time()

print("Training Time:", (after-before))

print(list(cross_val_score(clf, iris.data, iris.target, cv=10)))

 