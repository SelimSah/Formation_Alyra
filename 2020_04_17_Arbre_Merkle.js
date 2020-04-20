// Exercice 1.2.8 : Créer un arbre de Merkle
//Écrire un programme qui étant donné des chaînes de caractères (A, B, C, D)
//crée l'arbre de merkle correspondant et l’affiche.
const crypto = require('crypto');

//Adapter le programme pour pouvoir prendre n’importe quel nombre de paramètres.

function arrayOfArrays(inputNumbers) {
  array = [];
  for (var i = 0; i < inputNumbers; i++) {
    array[i] = [];
  }
  return array;
}

function hashInputs(stringInputValue) {
  let hash = crypto.createHash('sha256').update(stringInputValue).digest('hex');
  return hash;
}

function merkleTreeArray(inputNumbers, inputValueArray) {
  let merkleTree = arrayOfArrays(inputNumbers);

  for (i = 0; i < inputNumbers; i++) {
    merkleTree[0].push(inputValueArray[i]);
    merkleTree[1].push(hashInputs(merkleTree[0][i]));
  }

  for (j = 2; merkleTree[j - 1].length > 1; j++) {
    for (l = 1; l < merkleTree[j - 1].length; ) {
      merkleTree[j].push(
        hashInputs(merkleTree[j - 1][l - 1].concat(merkleTree[j - 1][l]))
      );
      l = l + 2;
    }
    if (merkleTree[j - 1].length % 2 == 1) {
      merkleTree[j].push(merkleTree[j - 1][merkleTree[j - 1].length - 1]);
    }
  }
  return merkleTree;
}

//Ajouter une méthode .preuve() qui prend en paramètre une chaîne de caractère,
//vérifie qu’elle fait partie des données de l’arbre et retourne  les
//condensats nécessaires pour reconstituer la partie de l’arbre pour trouver la racine.

function Tree() {
  this.merkleTree = [];
  RECHERCHE = "La chaîne de caractère recherchée n'a pas été trouvée";
  this.preuve = function (strValue) {
    const rowNumbers = this.merkleTree[0].length;
    for (i = 0; i < rowNumbers; i++) {
      if (strValue === this.merkleTree[0][i]) {
        RECHERCHE = 'La chaîne de caractère recherchée a été trouvée';
        var positionStrValue = i;
        for (l = 1; l < rowNumbers; l++) {
          console.log(
            'Hash à la Hauteur ' +
              l +
              ' : ' +
              this.merkleTree[l][positionStrValue]
          );
          if (positionStrValue !== 0) {
            positionStrValue =
              Math.round(positionStrValue / 2) -
              Math.round(positionStrValue % 2);
          }
        }
      }
    }
    console.log(RECHERCHE);
  };
}

const MTree = new Tree();
MTree.merkleTree = merkleTreeArray(5, ['A', 'B', 'C', 'D', 'E']);
console.log(MTree.merkleTree);
console.log(MTree.preuve('E'));
